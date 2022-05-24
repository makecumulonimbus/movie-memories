<template>
  <div>
    <FilterMenu @filterStatus="filterStatus" @searchValue="searchValue" @filterData="filterData"/>

    <div v-if="loading" class="loading">
      <LoadingData />
    </div>

    <div v-if="!loading">
      <div class="hasData" >
        <div class="addData pl-3 pr-3 pt-1 pb-1">
          <div>
          <div v-if="seriesList.length != 0">
            <div class="numItem" v-if="itemStart != totalDatas">
              {{ itemStart }} - {{ itemEnd }} of {{ totalDatas }}
            </div>
            <div class="numItem" v-if="itemStart == totalDatas">
              {{ itemStart }} of {{ totalDatas }}
            </div>
          </div>
          </div>
          <div class="filterNameSelect" v-if="filterMode != ''">
          <i class="fas fa-star" v-if="filterMode == 'rating'"/>
          <i class="fas fa-calendar" v-if="filterMode == 'year'"/>
          <i class="fas fa-building" v-if="filterMode == 'studio'"/>
          <i class="fas fa-film" v-if="filterMode == 'genre'"/>
          <i class="fas fa-user" v-if="filterMode == 'director'"/>
          <i class="fas fa-users" v-if="filterMode == 'actor'"/>
          <i class="fas fa-search" v-if="filterMode == 'search'"/>
          {{filterMode}} : {{filterValue ? filterValue : '-'}}</div>
          <div class="btn-addData">
            <b-button @click="addItemModal" id="add" class="btn-confirm"
              ><i class="fas fa-plus" /><span class="pl-1 text-add"
                >ADD</span
              ></b-button
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
            v-for="(series, index) in seriesList"
            :key="index"
            :datas="series"
            @deleteData="deleteItemModal"
            @editData="editItemModal"
            @toDetailPage="detailPage"
          />
        </div>
        <div class="pagi" v-if="seriesList.length != 0">
          <Pagination
            @selectedPage="loadMoreSeries"
            :currentPage="this.$store.state.currentP + 1"
            :totalItem="totalDatas"
            :itemPerPage="itemPerPage"
            :start="itemStart"
            :end="itemEnd"
          />
        </div>
      </div>

      <div class="noData" v-if="seriesList.length == 0">
        Series not found !
        <div class="img-nodata">
          <img src="../assets/nodata.svg" alt="" />
        </div>
      </div>
    </div>

    <ModalAddEdit :formMode="this.formMode" :headName="`series`" :form="this.form" @toggleModal="toggleModal" @submit="submit"/>
    <ModalDelete :headName="`series`" :imageURL="this.seriesSelect.imageURL" @toggleModal="toggleModal" @deleteData="deleteSeries"/>
     <DetailModal :headName="`series`" @toggleModal="toggleModal" :form="this.form"/>
  </div>
</template>

<script>
import CardList from "../components/cardlist.vue";
import FilterMenu from "../components/filtermenu.vue";
import Pagination from "../components/pagination.vue";
import firebaseApp from "../firebase/firebase_app";
import LoadingData from "../components/loadingData.vue";
import "../assets/scss/style.scss";
import ModalDelete from '../components/modal-delete.vue'
import ModalAddEdit from '../components/modal-add-edit.vue'
import DetailModal from '../components/detailModal.vue'

export default {
  name: "SeriesPage",
  computed: {
    currentP() {
      return this.$store.state.currentP;
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      seriesList: [],
      seriesSelect: {},
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
      // genres: [],
      // studios: [],
      statusSeries: "all",
      search: "",
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    this.loadSeries();
  },
  components: {
    CardList,
    FilterMenu,
    Pagination,
    LoadingData,
    ModalDelete,
    ModalAddEdit,
    DetailModal
  },
  methods: {
    filterStatus(filter) {
      this.statusSeries = filter;
      this.filterMode = ''
      this.filterValue = ''
      this.$store.dispatch("changePage", 0);
      this.loadSeries();
    },
    searchValue(value) {
      this.filterMode = ''
      this.filterValue = ''
      this.search = value;
      this.loadSeries();
    },
    loadSeries() {
      this.loading = true;
      let indexOf = this.itemPerPage * this.$store.state.currentP; //itemperPage = totalitem/limit
      const seriesRef = firebaseApp.firestore().collection("series");
      if (this.statusSeries == "all" && this.search != "") {
        var filterRef = seriesRef
          .where("title", ">=", this.search)
          .where("title", "<=", this.search + "\uf8ff");
      } else if (this.statusSeries != "all" && this.search != "") {
        filterRef = seriesRef
          .where("status", "==", this.statusSeries)
          .where("title", ">=", this.search)
          .where("title", "<=", this.search + "\uf8ff");
      } else if (this.statusSeries != "all" && this.search == "") {
        filterRef = seriesRef
          .where("status", "==", this.statusSeries)
          .orderBy("createAt", "desc");
      } else {
        if(this.filterMode != '' && this.filterValue != '' && this.filterMode != 'actor'){
          filterRef =  seriesRef.where(this.filterMode, "==", this.filterValue)
          .orderBy("createAt", "desc");
        }else if(this.filterMode == 'actor'){
          filterRef =  seriesRef.where(this.filterMode, "array-contains", this.filterValue)
          .orderBy("createAt", "desc");
        }else{
          filterRef = seriesRef.orderBy("createAt", "desc");
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
              const series = [];
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
                  director: doc.data().director,
                  actor: doc.data().actor,
                  imageURL: doc.data().imageURL,
                  trailerURL: doc.data().trailerURL,
                  detail: doc.data().detail,
                  rating: doc.data().rating,
                  createAt: doc.data().createAt,
                };
                series.push(dataElement);
              });
              this.seriesList = series;
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.notifyAlert("error", "Load series unsuccess");
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Load series unsuccess");
          console.log(err);
        });
    },
    loadMoreSeries(page) {
      this.$store.dispatch("changePage", page);
      // this.currentPage = page;
      this.loadSeries();
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
        director: "",
        actor: [],
        imageURL: "",
        trailerURL: "",
        detail: "",
        rating: "",
      };
      this.$bvModal.show("modal-add-edit");
    },
    editItemModal(data) {
      this.formMode = "Edit";
      this.seriesSelect = data;
      this.form = {
        title: this.seriesSelect.title,
        season: this.seriesSelect.season,
        episode: this.seriesSelect.episode,
        year: this.seriesSelect.year,
        genre: this.seriesSelect.genre,
        studio: this.seriesSelect.studio,
        status: this.seriesSelect.status,
        director: this.seriesSelect.director,
        actor: this.seriesSelect.actor,
        imageURL: this.seriesSelect.imageURL,
        trailerURL: this.seriesSelect.trailerURL,
        detail: this.seriesSelect.detail,
        rating: this.seriesSelect.rating,
      };
      this.$bvModal.show("modal-add-edit");
    },
    deleteItemModal(data) {
      this.formMode = "Delete";
      this.seriesSelect = data;
      this.$bvModal.show("modal-delete");
    },
     filterData(data) {
      this.statusSeries = 'all'
      this.search = ""
      this.filterMode = data.mode
      this.filterValue = data.value
      this.loadSeries();
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
          director: this.form.director,
          actor: this.form.actor,
          imageURL: this.form.imageURL,
          trailerURL: this.form.trailerURL,
          detail: this.form.detail,
          rating: this.form.rating,
          createAt: new Date(),
          updateAt: new Date(),
        };
        this.addSeries(setData);
      } else {
        setData = {
          title: this.form.title.trim().toLowerCase(),
          season: this.form.season,
          episode: this.form.episode,
          year: this.form.year,
          genre: this.form.genre,
          studio: this.form.studio,
          status: this.form.status,
          director: this.form.director,
          actor: this.form.actor,
          imageURL: this.form.imageURL,
          trailerURL: this.form.trailerURL,
          detail: this.form.detail,
          rating: this.form.rating,
          updateAt: new Date(),
        };

        this.editSeries(setData);
      }
      this.$bvModal.hide("modal-add-edit");
    },
    addSeries(data) {
      this.loading = true;
      const seriesRef = firebaseApp.firestore().collection("series");
      return seriesRef
        .add(data)
        .then((res) => {
          this.seriesList.splice(-1)
          data.id = res.id
          this.seriesList.unshift(data)
          this.totalDatas = this.totalDatas + 1
          this.loading = false;
          this.notifyAlert("success", "Add series");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Add series unsuccess");
          console.log(err);
        });
    },
    editSeries(data) {
      this.loading = true;
      const id = this.seriesSelect.id;
      const seriesRef = firebaseApp.firestore().doc("series/" + id);
      return seriesRef
        .update(data)
        .then(() => {

          if(this.statusSeries != 'all' & this.filterMode != ''){
             this.loadSeries();
          }else{
            data.id = id
            data.createAt = this.seriesSelect.createAt
            this.seriesList = this.seriesList.map(u => u.id !== data.id ? u : data);
            this.loading = false;
          }

          this.notifyAlert("success", "Edit series");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Edit series unsuccess");
          console.log(err);
        });
    },
    deleteSeries() {
      this.loading = true;
      const id = this.seriesSelect.id;
      this.$bvModal.hide("modal-delete");
      const seriesRef = firebaseApp.firestore().doc("series/" + id);
      return seriesRef
        .delete()
        .then(() => {
          this.loadSeries();
          this.notifyAlert("success", "Delete series");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Delete series unsuccess");
          console.log(err);
        });
    },
    toggleModal() {
      this.$bvModal.hide("modal-add-edit");
      this.$bvModal.hide("modal-delete");
      this.$bvModal.hide("modal-detail");
    },
    detailPage(data) {
      this.seriesSelect = data;
      this.form = {
        title: this.seriesSelect.title,
        season: this.seriesSelect.season,
        episode: this.seriesSelect.episode,
        year: this.seriesSelect.year,
        genre: this.seriesSelect.genre,
        studio: this.seriesSelect.studio,
        status: this.seriesSelect.status,
        director: this.seriesSelect.director,
        actor: this.seriesSelect.actor,
        imageURL: this.seriesSelect.imageURL,
        trailerURL: this.seriesSelect.trailerURL,
        detail: this.seriesSelect.detail,
        rating: this.seriesSelect.rating,
        createAt : this.seriesSelect.createAt,
      };
      this.$bvModal.show("modal-detail");
      // this.$router.push("/series/" + data.id);
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