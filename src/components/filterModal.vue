<template>
  <b-modal id="modal-filter" hide-footer size="md">
    <template #modal-header>
      <span class="modal-header-text"><i class="fas fa-filter" /> FILTER </span>
      <span class="close-icon" @click="toggleModal"><i class="fas fa-times" /> </span>
    </template>
    <template>
      <b-form @submit.prevent="submit" class="form-data">
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="FilterMode :" class="">
              <b-form-select
                id="mode"
                placeholder="Filter"
                size="sm"
                v-model="form.filterMode"
                :options="form.mode"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-md-6">
           <b-form-group label="Mode : " class="" v-if="form.filterMode == ''">
              <b-form-input
                id="selectMode"
                placeholder="Select Mode"
                size="sm"
                disabled
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

             <b-form-group label="Director :" class="" v-if="form.filterMode == 'director'">
              <b-form-input
                id="director"
                placeholder="Enter Director"
                size="sm"
                v-model="form.directorSelect"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

             <b-form-group label="Actor :" class="" v-if="form.filterMode == 'actor'">
              <b-form-input
                id="actor"
                placeholder="Enter full name"
                size="sm"
                v-model="form.actorSelect"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

           <b-form-group label="Year :" class="" v-if="form.filterMode == 'year'">
              <b-form-input
                id="year"
                type="number"
                placeholder="Enter Year"
                size="sm"
                min="0"
                v-model="form.yearSelected"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Rating :" class="" v-if="form.filterMode == 'rating'">
              <b-form-select
                id="rating"
                placeholder="Enter Rating"
                size="sm"
                v-model="form.ratingSelect"
                :options="form.rating"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>

           <b-form-group label="Studio :" class="" v-if="form.filterMode == 'studio'">
              <b-form-select
                id="studio"
                placeholder="Enter Studio"
                size="sm"
                v-model="form.studioSelect"
                :options="form.studios.length != 0 ? form.studios : this.$store.getters.getStudioData"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Genre :" class="" v-if="form.filterMode == 'genre'">
              <b-form-select
                id="genre"
                placeholder="Enter Genre"
                size="sm"
                v-model="form.genreSelect"
                :options="form.genres.length != 0 ? form.genres : this.$store.getters.getGenreData"
                autocomplete="off"
              ></b-form-select>
            </b-form-group>

             <b-form-group label="Search :" class="" v-if="form.filterMode == 'search'">
              <b-form-input
                id="searchValue"
                placeholder="Search..."
                size="sm"
                v-model="form.searchValue"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </div>


        </div>
        <div class="btn-save">
          <b-button type="submit" class="btn-confirm"
            ><span class="pl-2 pr-2">SAVE</span></b-button
          >
          <b-button @click="clearFilter" class="btn-cancle">RESET</b-button>
        </div>
      </b-form>
    </template>
  </b-modal>
</template>

<script>
import "@/assets/scss/style.scss";

export default {
  name: "FilterModal",
  props: ["form"],
  data() {
    return {};
  },
  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
    submit() {
      this.$emit("submit");
    },
    clearFilter(){
      this.$emit("clearFilter");
    }
  },
};
</script>

<style scoped></style>
