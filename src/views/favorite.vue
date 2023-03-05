<template>
  <div class="manage-container">
    <div class="menu-filter">
      <div class="left-manage d-flex">
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="director"
            @click="tabsActive('director')"
            v-bind:class="{
              'btn-confirm': tabActive == 'director',
              'btn-cancle': tabActive != 'director',
            }"
            ><i class="icon-filter fas fa-user-tie" /><span> DIRECTOR</span></b-button
          >
          <b-tooltip
            v-if="windowWidth < 701"
            target="director"
            title="DIRECTOR"
            placement="bottom"
            class="tooltip-icon"
          ></b-tooltip>
        </div>
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="actors"
            @click="tabsActive('actors')"
            v-bind:class="{
              'btn-confirm': tabActive == 'actors',
              'btn-cancle': tabActive != 'actors',
            }"
            ><i class="icon-filter fas fa-user-friends" /><span> ACTORS</span></b-button
          >
          <b-tooltip
            v-if="windowWidth < 701"
            target="actors"
            title="ACTORS"
            placement="bottom"
            class="tooltip-icon"
          ></b-tooltip>
        </div>
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="genre"
            @click="tabsActive('genre')"
            v-bind:class="{
              'btn-confirm': tabActive == 'genre',
              'btn-cancle': tabActive != 'genre',
            }"
            ><i class="icon-filter fas fa-film" /><span> GENRE</span></b-button
          >
          <b-tooltip
            v-if="windowWidth < 701"
            target="genre"
            title="GENRE"
            placement="bottom"
            class="tooltip-icon"
          ></b-tooltip>
        </div>
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="studio"
            @click="tabsActive('studio')"
            v-bind:class="{
              'btn-confirm': tabActive == 'studio',
              'btn-cancle': tabActive != 'studio',
            }"
            ><i class="icon-filter fas fa-building" /><span> STUDIO</span></b-button
          >
          <b-tooltip
            v-if="windowWidth < 701"
            target="studio"
            title="STUDIO"
            placement="bottom"
            class="tooltip-icon"
          ></b-tooltip>
        </div>
      </div>
      <div class="btn-addDataManage search-container">
        <b-form @submit.prevent="searchData">
          <b-input-group>
            <b-form-input
              id="search"
              v-model="searchValue"
              placeholder="Search..."
              size="sm"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-button class="btn-search" size="sm" @click="searchData"
                ><i class="fas fa-search"
              /></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </div>
      <div class="btn-manage search-container-mini pr-3">
        <b-button variant="primary" id="search-mini" class="btn-cancle"
          ><i class="icon-filter fas fa-search"
        /></b-button>
        <b-tooltip
          v-if="windowWidth < 701"
          target="search-mini"
          title="SEARCH"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <LoadingData />
    </div>

    <div v-if="!loading">
      <div class="hasData">
        <div class="addData pl-3 pr-3 pt-1 pb-1">
          <div>
            <div v-if="datas.length != 0">
              <div class="numItem" v-if="itemStart != totalDatas">
                {{ itemStart }} - {{ itemEnd }} of {{ totalDatas }}
              </div>
              <div class="numItem" v-if="itemStart == totalDatas">
                {{ itemStart }} of {{ totalDatas }}
              </div>
            </div>
          </div>
          <div class="btn-addData">
            <b-button @click="addItemModal" id="add" class="btn-confirm"
              ><i class="fas fa-plus" /><span class="pl-1 text-add">ADD</span></b-button
            >
            <b-tooltip
              v-if="windowWidth < 701"
              target="add"
              title="ADD"
              placement="bottom"
              class="tooltip-icon"
            ></b-tooltip>
          </div>
        </div>
        <div class="row pt-2">
          <CardManage
            v-for="(data, index) in datas"
            :key="index"
            :datas="data"
            @deleteData="deleteItemModal"
            @editData="editItemModal"
            @toDetailPage="detailPage"
          />
        </div>
        <div class="pagi" v-if="datas.length != 0">
          <Pagination
            @selectedPage="loadMore"
            :currentPage="this.$store.state.currentP + 1"
            :totalItem="totalDatas"
            :itemPerPage="itemPerPage"
            :start="itemStart"
            :end="itemEnd"
          />
        </div>
      </div>

      <div class="noData" v-if="datas.length == 0">
        <span class="first-cap">{{ tabActive }}</span> not found !
        <div class="img-nodata">
          <img src="../assets/nodata.svg" alt="" loading="lazy"/>
        </div>
      </div>
    </div>

    <b-modal id="modal-data" hide-footer size="md">
      <template #modal-header>
        <span class="modal-header-text" v-if="formMode == 'Add'"
          ><i class="fas fa-plus" /> ADD
          <span class="capital-text">{{ tabActive }}</span></span
        >
        <span class="modal-header-text" v-if="formMode == 'Edit'"
          ><i class="fas fa-edit" /> EDIT
          <span class="capital-text">{{ tabActive }}</span></span
        >
        <span class="close-icon" @click="toggleModal"><i class="fas fa-times" /> </span>
      </template>
      <template>
        <b-form @submit.prevent="submit" class="form-data">
          <div class="row">
            <div class="col-md-12">
              <b-form-group label="Name :" class="">
                <b-form-input
                  id="title"
                  v-model="form.name"
                  required
                  placeholder="Enter name"
                  size="sm"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group label="ImageURL :" class="">
                <b-form-input
                  id="season"
                  v-model="form.imageURL"
                  placeholder="Enter imageURL"
                  min="0"
                  size="sm"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="btn-save">
            <b-button type="submit" class="btn-confirm"
              ><span class="pl-2 pr-2">SAVE</span></b-button
            >
            <b-button @click="toggleModal" class="btn-cancle">CANCLE</b-button>
          </div>
        </b-form>
      </template>
    </b-modal>

    <ModalDelete
      :headName="this.tabActive"
      :imageURL="this.dataSelect.image"
      @toggleModal="toggleModal"
      @deleteData="deleteData"
    />
  </div>
</template>

<script>
import "@/assets/scss/style.scss";
import CardManage from "@/components/cardManage";
import firebaseApp from "@/firebase/firebase_app";
import LoadingData from "@/components/loadingData";
import ModalDelete from "@/components/modal-delete";
import Pagination from "@/components/pagination";
import setupData from "@/firebase/setup-data";
import updateDashboard from "@/firebase/firebase_function";

export default {
  name: "Advanced",
  data() {
    return {
      windowWidth: window.innerWidth,
      tabActive: "director",
      search: "",
      searchValue: "",
      dataSelect: {},
      totalDatas: null,
      itemPerPage: 30,
      itemStart: null,
      itemEnd: null,
      loading: false,
      datas: [],
      formMode: "",
      form: {},
    };
  },
  components: {
    CardManage,
    LoadingData,
    Pagination,
    ModalDelete,
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    var tab = this.$route.params.tab;
    this.tabActive = tab
    this.loadData(tab);
  },

  methods: {
    async loadSetupData() {
      if (this.tabActive == "genre") {
        this.genres = await setupData.getGenreData();
        this.$store.dispatch("setGenre", this.genres);
      } else if (this.tabActive == "studio") {
        this.studios = await setupData.getStudioData();
        this.$store.dispatch("setStudio", this.studios);
      }
    },

    tabsActive(tab) {
      if (this.tabActive != tab) {
        this.tabActive = tab;
        this.$router.replace("/favorite/" + tab);
        this.loadData(tab);
      }
    },

    loadData(tab) {
      this.loading = true;
      let indexOf = this.itemPerPage * this.$store.state.currentP; //itemperPage = totalitem/limit
      if (tab == "director") {
        var dataRef = firebaseApp.firestore().collection("director");
      } else if (tab == "actors") {
        dataRef = firebaseApp.firestore().collection("actors");
      } else if (tab == "genre") {
        dataRef = firebaseApp.firestore().collection("genre");
      } else if (tab == "studio") {
        dataRef = firebaseApp.firestore().collection("studio");
      }
      if (this.search != "") {
        var filterRef = dataRef
          .where("name", ">=", this.search)
          .where("name", "<=", this.search + "\uf8ff");
      } else {
        filterRef = dataRef.orderBy("name", "asc");
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
              const datalist = [];
              querySnapshot.forEach((doc) => {
                const dataElement = {
                  id: doc.id,
                  name: doc.data().name,
                  image: doc.data().image,
                };
                datalist.push(dataElement);
              });
              this.datas = datalist;
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.notifyAlert("error", "Load " + this.tabActive + " unsuccess");
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Load " + this.tabActive + " unsuccess");
          console.log(err);
        });
    },

    searchData() {
      this.search = this.searchValue.trim().toLowerCase();
      this.loadData(this.tabActive);
    },

    loadMore() {
      this.loadData(this.tabActive);
    },

    toggleModal() {
      this.$bvModal.hide("modal-data");
      this.$bvModal.hide("modal-delete");
    },

    submit() {
      if (this.formMode == "Add") {
        var setData = {
          name: this.form.name.trim().toLowerCase(),
          image: this.form.imageURL,
        };
        this.addData(setData);
      } else if (this.formMode == "Edit") {
        setData = {
          name: this.form.name.trim().toLowerCase(),
          image: this.form.imageURL,
        };
        this.editData(setData);
      }
      this.$bvModal.hide("modal-data");
    },

    addData(data) {
      this.loading = true;
      const dataRef = firebaseApp.firestore().collection(this.tabActive);
      return dataRef
        .add(data)
        .then((res) => {
          if (this.datas.length >= 30) {
            this.datas.splice(-1);
          }
          data.id = res.id;
          this.datas.unshift(data);
          this.totalDatas = this.totalDatas + 1;
          this.loading = false;

          this.loadSetupData() // load new genre or studio
          updateDashboard.addFavoriteData(this.tabActive);
          this.notifyAlert("success", "Add " + this.tabActive);
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Add " + this.tabActive + " unsuccess");
          console.log(err);
        });
    },

    editData(data) {
      this.loading = true;
      const id = this.dataSelect.id;
      const dataRef = firebaseApp.firestore().doc(this.tabActive + "/" + id);
      return dataRef
        .update(data)
        .then(() => {
          data.id = id;
          this.datas = this.datas.map((u) => (u.id !== data.id ? u : data));
          console.log(this.datas);
          this.loading = false;

          this.loadSetupData() // load new genre or studio
          this.notifyAlert("success", "Edit " + this.tabActive);
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Edit " + this.tabActive + " unsuccess");
          console.log(err);
        });
    },
    
    addItemModal() {
      this.formMode = "Add";
      this.form = {
        name: "",
        imageURL: "",
      };
      this.$bvModal.show("modal-data");
    },

    deleteData() {
      this.loading = true;
      const id = this.dataSelect.id;
      this.$bvModal.hide("modal-delete");
      const dataRef = firebaseApp.firestore().doc(this.tabActive + "/" + id);
      return dataRef
        .delete()
        .then(() => {
          updateDashboard.deleteFavoriteData(this.tabActive);
          this.loadData(this.tabActive);
          this.notifyAlert("success", "Delete " + this.tabActive);
        })
        .catch((err) => {
          this.loading = false;
          this.notifyAlert("error", "Delete " + this.tabActive + " unsuccess");
          console.log(err);
        });
    },

    deleteItemModal(data) {
      this.formMode = "Delete";
      this.dataSelect = data;
      this.$bvModal.show("modal-delete");
    },

    editItemModal(data) {
      this.formMode = "Edit";
      this.dataSelect = data;
      this.form = {
        name: this.dataSelect.name,
        imageURL: this.dataSelect.image,
      };
      this.$bvModal.show("modal-data");
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

<style scoped>
.left-manage {
  margin-left: 1rem;
}
.btn-addDataManage {
  margin-right: 1rem;
}
.btn-manage button {
  transition: 0.3s;
  font-size: 15px;
}

.btn-manage span {
  display: initial;
}
/* .icon-filter {
  display: none;
} */
.tooltip-icon {
  display: none;
}

.search-container-mini {
  display: none;
}
@media screen and (max-width: 850px) {
  .btn-manage button {
    transition: 0.3s;
  }
  .tooltip-icon {
    display: initial;
  }
  .btn-manage .icon-filter {
    display: initial;
  }
  .btn-manage span {
    display: none;
  }
}

@media screen and (max-width: 575px) {
  .search-container {
    display: none;
  }

  .search-container-mini {
    display: inline-flex;
  }
}
</style>