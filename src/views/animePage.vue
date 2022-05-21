<template>
  <div>
    <FilterMenu @filterStatus="filterStatus" @searchValue="searchValue" @filterData="filterData"/>

    <div v-if="loading" class="loading">
      <LoadingData />
    </div>

    <div v-if="!loading">
      <div class="hasData">
        <div class="addData pl-3 pr-3 pt-1 pb-1">
          <div>
            <div v-if="animeList.length != 0">
              <div class="numItem" v-if="itemStart != totalDatas">
                {{ itemStart }} - {{ itemEnd }} of {{ totalDatas }}
              </div>
              <div class="numItem" v-if="itemStart == totalDatas">
                {{ itemStart }} of {{ totalDatas }}
              </div>
            </div>
          </div>
          <div class="filterNameSelect" v-if="filterMode != '' && filterMode != 'director' && filterMode != 'actor'">
          <i class="fas fa-star" v-if="filterMode == 'rating'"/>
          <i class="fas fa-calendar" v-if="filterMode == 'year'"/>
          <i class="fas fa-building" v-if="filterMode == 'studio'"/>
          <i class="fas fa-film" v-if="filterMode == 'genre'"/>
          <i class="fas fa-search" v-if="filterMode == 'search'"/>
          {{filterMode}} : {{filterValue ? filterValue : '-'}}
          </div>
          <div class="btn-addData">
            <b-button @click="addItemModal" id="add" class="btn-confirm"
              ><i class="fas fa-plus" /><span class="pl-1 text-add">ADD</span></b-button
            >
            <!-- <b-tooltip
              v-if="windowWidth < 701"
              target="add"
              title="ADD"
              placement="bottom"
              class="tooltip-icon"
            ></b-tooltip> -->
          </div>
        </div>
        <div class="row pt-2">
          <CardList
            v-for="(anime, index) in animeList"
            :key="index"
            :datas="anime"
            @deleteData="deleteItemModal"
            @editData="editItemModal"
            @toDetailPage="detailPage"
          />
        </div>
        <div class="pagi" v-if="animeList.length != 0">
          <Pagination
            @selectedPage="loadMoreAnime"
            :currentPage="this.$store.state.currentP + 1"
            :totalItem="totalDatas"
            :itemPerPage="itemPerPage"
            :start="itemStart"
            :end="itemEnd"
          />
        </div>
      </div>

      <div class="noData" v-if="animeList.length == 0">
        Anime not found !
        <div class="img-nodata">
          <img src="../assets/nodata.svg" alt="" />
        </div>
      </div>
    </div>

    <ModalAddEdit
      :formMode="this.formMode"
      :headName="`anime`"
      :form="this.form"
      @toggleModal="toggleModal"
      @submit="submit"
    />
    <ModalDelete
      :headName="`anime`"
      :imageURL="this.animeSelect.imageURL"
      @toggleModal="toggleModal"
      @deleteData="deleteAnime"
    />
    <DetailModal :headName="`anime`" @toggleModal="toggleModal" :form="this.form" />
  </div>
</template>

<script>
import CardList from "../components/cardlist.vue";
import FilterMenu from "../components/filtermenu.vue";
import Pagination from "../components/pagination.vue";
import firebaseApp from "../firebase/firebase_app";
import LoadingData from "../components/loadingData.vue";
import "../assets/scss/style.scss";
import ModalDelete from "../components/modal-delete.vue";
import ModalAddEdit from "../components/modal-add-edit.vue";
import DetailModal from "../components/detailModal.vue";

export default {
  name: "AnimePage",
  computed: {
    currentP() {
      return this.$store.state.currentP;
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      animeList: [],
      animeSelect: {},
      totalDatas: null,
      // currentPage: 0,
      itemPerPage: 30,
      itemStart: null,
      itemEnd: null,
      loading: false,
      formMode: "",
      form: {},
      filterMode: "",
      filterValue : "",
      statusAnime: "all",
      search: "",
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    this.loadAnimes();
  },
  components: {
    CardList,
    FilterMenu,
    Pagination,
    LoadingData,
    ModalAddEdit,
    ModalDelete,
    DetailModal,
  },
  methods: {
    filterStatus(filter) {
      this.statusAnime = filter;
      this.filterMode = ''
      this.filterValue = ''
      this.$store.dispatch("changePage", 0);
      this.loadAnimes();
    },
    searchValue(value) {
      this.filterMode = ''
      this.filterValue = ''
      this.search = value;
      this.loadAnimes();
    },
    loadAnimes() {
      this.loading = true;
      let indexOf = this.itemPerPage * this.$store.state.currentP; //itemperPage = totalitem/limit

      const animeRef = firebaseApp.firestore().collection("anime");
      if (this.statusAnime == "all" && this.search != "") {
        var filterRef = animeRef
          .where("title", ">=", this.search)
          .where("title", "<=", this.search + "\uf8ff");
      } else if (this.statusAnime != "all" && this.search != "") {
        filterRef = animeRef
          .where("status", "==", this.statusAnime)
          .where("title", ">=", this.search)
          .where("title", "<=", this.search + "\uf8ff");
      } else if (this.statusAnime != "all" && this.search == "") {
        filterRef = animeRef
          .where("status", "==", this.statusAnime)
          .orderBy("createAt", "desc");
      } else {
         if(this.filterMode != '' && this.filterValue != '' && this.filterMode != 'director' && this.filterMode != 'actor'){
          filterRef =  animeRef.where(this.filterMode, "==", this.filterValue)
          .orderBy("createAt", "desc");
        }else{
          filterRef = animeRef.orderBy("createAt", "desc");
        }
      }
      return filterRef
        .get()
        .then((document) => {
          let last = document.docs[indexOf];
          var itemCount = document.docs.length;
          var page = this.$store.state.currentP + 1;
          var start = page * this.itemPerPage - (this.itemPerPage - 1);
          var end = Math.min(start + this.itemPerPage - 1, itemCount);
          this.itemStart = start;
          this.itemEnd = end;
          this.totalDatas = itemCount;

          if (last) {
            var queryRef = filterRef.startAt(last).limit(this.itemPerPage);
          } else {
            queryRef = filterRef.limit(this.itemPerPage);
          }
          queryRef
            .get()
            .then((querySnapshot) => {
              const animes = [];
              querySnapshot.forEach((doc) => {
                const dataElement = {
                  id: doc.id,
                  title: this.capitalText(doc.data().title),
                  season: doc.data().season,
                  episode: doc.data().episode,
                  year: doc.data().year,
                  genre: doc.data().genre,
                  studio: doc.data().studio,
                  status: doc.data().status,
                  imageURL: doc.data().imageURL,
                  trailerURL: doc.data().trailerURL,
                  detail: doc.data().detail,
                  rating: doc.data().rating,
                  createAt: doc.data().createAt,
                };
                animes.push(dataElement);
              });
              this.animeList = animes;
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.notifyAlert("error", "Load anime unsuccess");
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Load anime unsuccess");
          console.log(err);
        });
    },
    loadMoreAnime(page) {
      this.$store.dispatch("changePage", page);
      // this.currentPage = page;
      this.loadAnimes();
    },
    capitalText(text) {
      return text[0].toUpperCase() + text.slice(1);
    },
    addItemModal() {
      this.formMode = "Add";
      this.form = {
        title: "",
        season: "",
        episode: "",
        year: "",
        genre: "",
        studio: "",
        status: "",
        imageURL: "",
        trailerURL: "",
        detail: "",
        rating: "",
      };
      this.$bvModal.show("modal-add-edit");
    },
    editItemModal(data) {
      this.formMode = "Edit";
      this.animeSelect = data;
      this.form = {
        title: this.animeSelect.title,
        season: this.animeSelect.season,
        episode: this.animeSelect.episode,
        year: this.animeSelect.year,
        genre: this.animeSelect.genre,
        studio: this.animeSelect.studio,
        status: this.animeSelect.status,
        imageURL: this.animeSelect.imageURL,
        trailerURL: this.animeSelect.trailerURL,
        detail: this.animeSelect.detail,
        rating: this.animeSelect.rating,
      };
      this.$bvModal.show("modal-add-edit");
    },
    deleteItemModal(data) {
      this.formMode = "Delete";
      this.animeSelect = data;
      this.$bvModal.show("modal-delete");
    },
    filterData(data) {
      this.statusAnime = 'all'
      this.search = ""
      this.filterMode = data.mode
      this.filterValue = data.value
      this.loadAnimes();
    },
    submit() {
      if (this.formMode == "Add") {
        var setData = {
          title: this.form.title.trim().toLowerCase(),
          season: this.form.season,
          episode: this.form.episode,
          year: this.form.year,
          genre: this.form.genre,
          studio: this.form.studio,
          status: this.form.status,
          imageURL: this.form.imageURL,
          trailerURL: this.form.trailerURL,
          detail: this.form.detail,
          rating: this.form.rating,
          createAt: new Date(),
          updateAt: new Date(),
        };
        this.addAnime(setData);
      } else {
        setData = {
          title: this.form.title.trim().toLowerCase(),
          season: this.form.season,
          episode: this.form.episode,
          year: this.form.year,
          genre: this.form.genre,
          studio: this.form.studio,
          status: this.form.status,
          imageURL: this.form.imageURL,
          trailerURL: this.form.trailerURL,
          detail: this.form.detail,
          rating: this.form.rating,
          updateAt: new Date(),
        };
        this.editAnime(setData);
      }
      this.$bvModal.hide("modal-add-edit");
    },
    addAnime(data) {
      this.loading = true;
      const animeRef = firebaseApp.firestore().collection("anime");
      return animeRef
        .add(data)
        .then((res) => {
          this.animeList.splice(-1)
          data.id = res.id
          this.animeList.unshift(data)
          this.totalDatas = this.totalDatas + 1
          this.loading = false;
          this.notifyAlert("success", "Add anime");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Add anime unsuccess");
          console.log(err);
        });
    },
    editAnime(data) {
      this.loading = true;
      const id = this.animeSelect.id;
      const animeRef = firebaseApp.firestore().doc("anime/" + id);
      return animeRef
        .update(data)
        .then(() => {
          
          if(this.statusAnime != 'all' & this.filterMode != ''){
             this.loadAnimes();
          }else{
            data.id = id
            this.animeList = this.animeList.map(u => u.id !== data.id ? u : data);
            this.loading = false;
          }

          this.notifyAlert("success", "Edit anime");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Edit anime unsuccess");
          console.log(err);
        });
    },
    deleteAnime() {
      this.loading = true;
      const id = this.animeSelect.id;
      this.$bvModal.hide("modal-delete");
      const animeRef = firebaseApp.firestore().doc("anime/" + id);
      return animeRef
        .delete()
        .then(() => {
          this.loadAnimes();
          this.notifyAlert("success", "Delete anime");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Delete anime unsuccess");
          console.log(err);
        });
    },
    toggleModal() {
      this.$bvModal.hide("modal-add-edit");
      this.$bvModal.hide("modal-delete");
      this.$bvModal.hide("modal-detail");
    },
    detailPage(data) {
      this.animeSelect = data;
      this.form = {
        title: this.animeSelect.title,
        season: this.animeSelect.season,
        episode: this.animeSelect.episode,
        year: this.animeSelect.year,
        genre: this.animeSelect.genre,
        studio: this.animeSelect.studio,
        status: this.animeSelect.status,
        imageURL: this.animeSelect.imageURL,
        trailerURL: this.animeSelect.trailerURL,
        detail: this.animeSelect.detail,
        rating: this.animeSelect.rating,
        createAt : this.animeSelect.createAt,
      };
      this.$bvModal.show("modal-detail");
      // this.$router.push("/anime/" + data.id);
    },
    notifyAlert(type, text) {
      if (type == "success") {
        this.$toast.success(text, {
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: true,
          timeout: 3000,
          icon: "fa fa-check",
        });
      } else if (type == "error") {
        this.$toast.error(text, {
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: true,
          timeout: 3000,
          icon: "fa fa-exclamation-triangle",
        });
      }
    },
  },
};
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.btn-outline-dark {
  color: #fff !important;
  background-color: #7d68ff !important;
  border-color: #7d68ff !important;
}
.btn-outline-dark:hover {
  box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.2) !important;
}
.btn-outline-light {
  color: #7d68ff !important;
  background-color: #fff !important;
  border-color: #7d68ff !important;
}
.btn-outline-light:hover {
  box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.2) !important;
}
</style>
