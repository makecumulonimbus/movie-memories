<template>
  <div class="movie-page">
    <FilterMenu
      @filterStatus="filterStatus"
      @searchValue="searchValue"
      @filterData="filterData"
    />

    <div v-if="loading">
      <LoadingData />
    </div>
    <div v-if="!loading">
      <div class="hasData">
        <div class="addData pl-3 pr-3 pt-1 pb-1">
          <div>
            <div v-if="movieList.length != 0">
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
            v-for="(movie, index) in movieList"
            :key="index"
            :datas="movie"
            @deleteData="deleteItemModal"
            @editData="editItemModal"
            @toDetailPage="detailPage"
          />
        </div>
        <div class="pagi" v-if="movieList.length != 0">
          <Pagination
            @selectedPage="loadMoreMovie"
            :currentPage="this.$store.state.currentP + 1"
            :totalItem="totalDatas"
            :itemPerPage="itemPerPage"
            :start="itemStart"
            :end="itemEnd"
          />
        </div>
      </div>
      <div class="noData" v-if="movieList.length == 0">
        Movie not found !
        <div class="img-nodata">
          <img src="../assets/nodata.svg" alt="" />
        </div>
      </div>
    </div>

    <ModalAddEdit
      :formMode="this.formMode"
      :headName="`movie`"
      :form="this.form"
      @toggleModal="toggleModal"
      @submit="submit"
    />
    <ModalDelete
      :headName="`movie`"
      :imageURL="this.movieSelect.imageURL"
      @toggleModal="toggleModal"
      @deleteData="deleteMovie"
    />
    <DetailModal :headName="`movie`" @toggleModal="toggleModal" :form="this.form" />
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
  name: "MoviePage",
  computed: {
    currentP() {
      return this.$store.state.currentP;
    },
  },
  components: {
    CardList,
    FilterMenu,
    Pagination,
    LoadingData,
    ModalDelete,
    ModalAddEdit,
    DetailModal,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      movieList: [],
      movieSelect: {},
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

      statusMovie: "all",
      search: "",
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    // this.loadGenre();
    // this.loadStudio();
    this.loadMovies();
  },
  methods: {
    // loadGenre() {
    //   const genreRef = firebaseApp.firestore().collection("genre");
    //   return genreRef.get().then((document) => {
    //     document.forEach((doc) => {
    //       const dataGenres = doc.data().genre;
    //       var newGenre = [];
    //       dataGenres.map((ele) => {
    //         var elementData = {
    //           value: ele,
    //           text: ele,
    //         };
    //         newGenre.push(elementData);
    //       });
    //       this.genres = newGenre;
    //     });
    //   });
    // },
    // loadStudio() {
    //   const studioRef = firebaseApp.firestore().collection("studio");
    //   return studioRef.get().then((document) => {
    //     document.forEach((doc) => {
    //       const dataStudio = doc.data().studio;
    //       var newStudio = [];
    //       dataStudio.map((ele) => {
    //         var elementData = {
    //           value: ele,
    //           text: ele,
    //         };
    //         newStudio.push(elementData);
    //       });
    //       this.studios = newStudio;
    //     });
    //   });
    // },
    filterStatus(filter) {
      this.statusMovie = filter;
      this.filterMode = ''
      this.filterValue = ''
      this.$store.dispatch("changePage", 0);
      this.loadMovies();
    },
    searchValue(value) {
      this.filterMode = ''
      this.filterValue = ''
      this.search = value;
      this.loadMovies();
    },
    loadMovies() {
      this.loading = true;
      let indexOf = this.itemPerPage * this.$store.state.currentP; //itemperPage = totalitem/limit
      const movieRef = firebaseApp.firestore().collection("movie");
      if (this.statusMovie == "all" && this.search != "") {
        var filterRef = movieRef
          .where("title", ">=", this.search)
          .where("title", "<=", this.search + "\uf8ff");
      } else if (this.statusMovie != "all" && this.search != "") {
        filterRef = movieRef
          .where("status", "==", this.statusMovie)
          .where("title", ">=", this.search)
          .where("title", "<=", this.search + "\uf8ff");
      } else if (this.statusMovie != "all" && this.search == "") {
          filterRef = movieRef
            .where("status", "==", this.statusMovie)
            .orderBy("createAt", "desc");
      } else {
        if(this.filterMode != '' && this.filterValue != '' && this.filterMode != 'actor'){
          filterRef =  movieRef.where(this.filterMode, "==", this.filterValue)
          .orderBy("createAt", "desc");
        }else if(this.filterMode == 'actor'){
          filterRef =  movieRef.where(this.filterMode, "array-contains", this.filterValue)
          .orderBy("createAt", "desc");
        }else{
          filterRef = movieRef.orderBy("createAt", "desc");
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
              const movies = [];
              querySnapshot.forEach((doc) => {
                const dataElement = {
                  id: doc.id,
                  title: this.capitalText(doc.data().title),
                  sequel: doc.data().sequel,
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
                movies.push(dataElement);
              });
              this.movieList = movies;
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.notifyAlert("error", "Load movie unsuccess");
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Load movie unsuccess");
          console.log(err);
        });
    },
    loadMoreMovie(page) {
      this.$store.dispatch("changePage", page);
      // this.currentPage = page;
      this.loadMovies();
    },
    capitalText(text) {
      return text[0].toUpperCase() + text.slice(1);
    },
    addItemModal() {
      this.formMode = "Add";
      this.form = {
        title: "",
        sequel: "",
        year: "",
        genre: "",
        studio: "",
        status: "",
        director: "",
        actor: [],
        imageURL: "",
        trailerURL: "",
        detail: "",
        rating: 0,
      };
      this.$bvModal.show("modal-add-edit");
    },
    editItemModal(data) {
      this.formMode = "Edit";
      this.movieSelect = data;
      this.form = {
        title: this.movieSelect.title,
        sequel: this.movieSelect.sequel,
        year: this.movieSelect.year,
        genre: this.movieSelect.genre,
        studio: this.movieSelect.studio,
        status: this.movieSelect.status,
        director: this.movieSelect.director,
        actor: this.movieSelect.actor,
        imageURL: this.movieSelect.imageURL,
        trailerURL: this.movieSelect.trailerURL,
        detail: this.movieSelect.detail,
        rating: this.movieSelect.rating,
      };
      this.$bvModal.show("modal-add-edit");
    },
    deleteItemModal(data) {
      this.formMode = "Delete";
      this.movieSelect = data;
      this.$bvModal.show("modal-delete");
    },
    filterData(data) {
      this.statusMovie = 'all'
      if(data.mode == 'search'){
        this.search = data.value
      }else{
          this.search = ''
      }
      this.filterMode = data.mode
      this.filterValue = data.value
      this.loadMovies();
    },
    submit() {
      if (this.formMode == "Add") {
        var setData = {
          title: this.form.title.trim().toLowerCase(),
          sequel: this.form.sequel,
          year: this.form.year,
          genre: this.form.genre,
          studio: this.form.studio,
          status: this.form.status,
          director: this.form.director.trim().toLowerCase(),
          actor: this.form.actor,
          imageURL: this.form.imageURL,
          trailerURL: this.form.trailerURL,
          detail: this.form.detail,
          rating: this.form.rating,
          createAt: new Date(),
          updateAt: new Date(),
        };
        this.addMovie(setData);
      } else {
        setData = {
          title: this.form.title.trim().toLowerCase(),
          sequel: this.form.sequel,
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
        this.editMovie(setData);
      }
      this.$bvModal.hide("modal-add-edit");
    },
    addMovie(data) {
      this.loading = true;
      const movieRef = firebaseApp.firestore().collection("movie");
      return movieRef
        .add(data)
        .then((res) => {
          this.movieList.splice(-1)
          data.id = res.id
          this.movieList.unshift(data)
          this.totalDatas = this.totalDatas + 1
          this.loading = false;

          this.notifyAlert("success", "Add movie");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Add movie unsuccess");
          console.log(err);
        });
    },
    editMovie(data) {
      this.loading = true;
      const id = this.movieSelect.id;
      const movieRef = firebaseApp.firestore().doc("movie/" + id);
      return movieRef
        .update(data)
        .then(() => {
          
          if(this.statusMovie != 'all' & this.filterMode != ''){
             this.loadMovies();
          }else{
            data.id = id
            this.movieList = this.movieList.map(u => u.id !== data.id ? u : data);
            this.loading = false;
          }

          this.notifyAlert("success", "Edit movie");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Edit movie unsuccess");
          console.log(err);
        });
    },
    deleteMovie() {
      this.loading = true;
      const id = this.movieSelect.id;
      this.$bvModal.hide("modal-delete");
      const movieRef = firebaseApp.firestore().doc("movie/" + id);
      return movieRef
        .delete()
        .then(() => {
          this.loadMovies();
          this.notifyAlert("success", "Delete movie");
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Delete movie unsuccess");
          console.log(err);
        });
    },
    toggleModal() {
      this.$bvModal.hide("modal-add-edit");
      this.$bvModal.hide("modal-delete");
      this.$bvModal.hide("modal-detail");
    },
    detailPage(data) {
      this.movieSelect = data;
      this.form = {
        title: this.movieSelect.title,
        sequel: this.movieSelect.sequel,
        year: this.movieSelect.year,
        genre: this.movieSelect.genre,
        studio: this.movieSelect.studio,
        status: this.movieSelect.status,
        director: this.movieSelect.director,
        actor: this.movieSelect.actor,
        imageURL: this.movieSelect.imageURL,
        trailerURL: this.movieSelect.trailerURL,
        detail: this.movieSelect.detail,
        rating: this.movieSelect.rating,
        createAt: this.movieSelect.createAt,
      };
      this.$bvModal.show("modal-detail");
      // this.$router.push("/movie/" + data.id);
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

.group-form {
  display: flex;
}

.noData {
  font-size: 22px;
  padding: 20px;
}

.loading {
  position: fixed;
  top: 50%;
  left: calc(50% - 15px);
  display: block;
}
.vue-notification-wrapper {
  margin-top: 10px !important;
}
@media only screen and (max-width: 992px) {
  .rate .bv-no-focus-ring {
    margin-right: -70px;
  }
}
@media only screen and (max-width: 495px) {
  .rate .bv-no-focus-ring {
    margin-right: -130px;
  }
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
.custom-text {
  font-weight: bold;
  font-size: 1em;
  margin-bottom: -5px;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}
button:focus {
  outline: unset !important;
  outline: unset !important;
}

.b-form-tags.focus {
  border-color: #7d68ff !important;
  box-shadow: unset !important;
}
.badge-secondary {
  color: white !important;
  background-color: #7d68ff !important;
}
.vue-notification.success {
  background: #baffb1 !important;
  border-left: 5px solid #1dce63 !important;
}
.vue-notification {
  color: black !important;
}
.vue-notification.error {
  background: #fa8686;
  border-left-color: 5px solid #ce0e00;
}
.vue-notification.error .notification-title {
  color: white !important;
}
.vue-notification.error .notification-content {
  color: white !important;
}
</style>
