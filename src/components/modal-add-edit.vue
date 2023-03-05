<template>
  <b-modal id="modal-add-edit" hide-footer size="lg">
    <template #modal-header>
      <span class="modal-header-text" v-if="formMode == 'Add'"
        ><i class="fas fa-plus" /> ADD
        <span class="capital-text">{{ headName }}</span></span
      >
      <span class="modal-header-text" v-if="formMode == 'Edit'"
        ><i class="fas fa-edit" /> EDIT
        <span class="capital-text">{{ headName }}</span></span
      >
      <span class="close-icon" @click="toggleModal"
        ><i class="fas fa-times" />
      </span>
    </template>
    <template>
      <b-form @submit.prevent="submit" class="form-data">
        <div class="row">
          <div :class="classCheck(headName)">
            <b-form-group label="Title :" class="">
              <b-form-input
                id="title"
                v-model="form.title"
                required
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-3 col-md-6" v-if="headName == 'movie'">
            <b-form-group label="Sequel :" class="">
              <b-form-input
                id="sequel"
                v-model="form.sequel"
                type="number"
                min="0"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-3 col-md-6" v-if="headName != 'movie'">
            <b-form-group label="Season :" class="">
              <b-form-input
                id="season"
                v-model="form.season"
                type="number"
                min="0"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-3 col-md-6" v-if="headName != 'movie'">
            <b-form-group label="Episode :" class="">
              <b-form-input
                id="episode"
                v-model="form.episode"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6">
            <b-form-group label="Year :" class="">
              <b-form-input
                id="year"
                v-model="form.year"
                type="number"
                min="0"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-3 col-md-6">
            <b-form-group label="Genre :" class="">
              <b-form-select
                id="genre"
                v-model="form.genre"
                :options="genres"
                size="sm"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-lg-3 col-md-6">
            <b-form-group label="Studio :" class="">
              <b-form-select
                id="studio"
                v-model="form.studio"
                :options="studios"
                size="sm"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-lg-3 col-md-6">
            <b-form-group label="Status :" class="">
              <b-form-select
                id="status"
                v-model="form.status"
                :options="status"
                required
                size="sm"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>
          </div>
        </div>

        <div class="row" v-if="headName != 'anime'">
          <div class="col-lg-6 col-md-6">
            <b-form-group label="Director :" class="">
              <b-form-input
                id="director"
                v-model="form.director"
                size="sm"
                autocomplete="off"
              ></b-form-input>
              <!-- <vue-bootstrap-typeahead
                :data="directors"
                v-model="form.director"
                size="sm"
                
                @hit="selectedAddress = $event"
              /> -->
            </b-form-group>
          </div>
          <div class="col-lg-6 col-md-6">
            <b-form-group label="Actors :" class="">
              <b-form-tags
                id="actot"
                v-model="form.actor"
                size="sm"
                autocomplete="off"
                placeholder=""
              ></b-form-tags>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6 col-md-6">
            <b-form-group label="Image :" class="">
              <b-form-input
                id="input-3"
                v-model="form.imageURL"
                placeholder="Image URL"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-6 col-md-6">
            <b-form-group label="Trailer :" class="">
              <b-form-input
                id="trailerURL"
                v-model="form.trailerURL"
                placeholder="Youtube ID"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6 col-md-12">
            <b-form-group label="Detail :" class="">
              <b-form-textarea
                id="detail"
                v-model="form.detail"
                rows="3"
                max-rows="6"
                autocomplete="off"
              ></b-form-textarea>
            </b-form-group>
          </div>
          <div class="col-lg-6 col-md-12">
            <b-form-group label="Rating :" class="rate">
              <star-rating
                v-model="form.rating"
                :max-rating="10"
                :star-size="30"
                text-class="custom-text"
                clearable
              />
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
</template>

<script>
import firebaseApp from "@/firebase/firebase_app";
import setupData from "@/firebase/setup-data";
import StarRating from "vue-star-rating";
// import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
// import _ from "underscore";

export default {
  name: "ModalAddEdit",
  created() {
    this.loadSetupData();
  },
  data() {
    return {
      directors: [],
      selectedDirec: null,
      status: [
        { value: "", text: "" },
        { value: "watched", text: "Watched" },
        { value: "wanted", text: "Wanted" },
      ],
      studios: [],
      genres: [],
    };
  },
  components: {
    StarRating,
    // VueBootstrapTypeahead,
  },
  props: ["formMode", "headName", "form"],
  // watch: {
  //   form: _.debounce(function (direc) {
  //     console.log(direc)

  //     this.getDirector(direc);
  //   }, 500),
  // },
  methods: {
    async loadSetupData() {
      //GENRE
      var genreStore = this.$store.getters.getGenreData;
      if (genreStore.length == 0) {
        this.genres = await setupData.getGenreData();
        this.$store.dispatch("setGenre", this.genres);
      } else {
        this.genres = genreStore;
      }

      //STUDIO
      var studioStore = this.$store.getters.getStudioData;
      if (studioStore.length == 0) {
        this.studios = await setupData.getStudioData();
        this.$store.dispatch("setStudio", this.studios);
      } else {
        this.studios = studioStore;
      }
    },
    async getDirector(query) {
      if (query != "") {
        const directorRef = firebaseApp.firestore().collection("director");
        var filterRef = directorRef
          .where("name", ">=", query)
          .where("name", "<=", query + "\uf8ff");
        await filterRef.get().then((querySnapshot) => {
          const direc = [];
          querySnapshot.forEach((doc) => {
            direc.push(doc.data().name);
          });
          this.directors = direc;
        });
      }
    },
    classCheck(headName) {
      if (headName == "movie") {
        return "col-lg-9 col-md-12";
      } else {
        return "col-lg-6 col-md-12";
      }
    },
    toggleModal() {
      this.$emit("toggleModal");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
