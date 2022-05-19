<template>
  <b-modal id="modal-detail" hide-footer size="lg">
    <template #modal-header>
      <span class="modal-header-text"
        ><i class="fas fa-film mr-2" v-if="headName == 'movie'" />
        <i class="fas fa-play-circle mr-2" v-if="headName == 'series'" />
        <i class="fas fa-video mr-2" v-if="headName == 'anime'" />
        <span class="capital-text"
          >{{ form.title }} {{ form.sequel ? form.sequel : "" }}
          {{ form.season ? "SS" + form.season : "" }}
          {{ form.year ? "(" + form.year + ")" : "" }}</span
        >
      </span>
      <span class="close-icon" @click="toggleModal"><i class="fas fa-times" /> </span>
    </template>
    <template class="detail-body row">
      <div class="video col-12 text-center">
        <b-embed
          type="iframe"
          aspect="16by9"
          :src="'https://www.youtube.com/embed/' + form.trailerURL"
          allowfullscreen
        ></b-embed>
      </div>

      <div class="">
        <div class="row detail">
          <div class="dataDetail col-12">
            <div class="row">
              <div class="col-lg-12 pb-1">
                <b>Detail : </b>
                <span class="text-detail">{{ form.detail ? form.detail : "" }}</span>
              </div>
            </div>

            <div class="row" v-if="headName != 'movie'">
              <div class="col-lg-6 pb-1">
                <b>Season : </b>
                <span>{{ form.season ? form.season : "" }}</span>
              </div>
              <div class="col-lg-6 pb-1">
                <b>Episode : </b>
                <span>{{ form.episode ? form.episode : "" }}</span>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 pb-1">
                <b>Genre : </b>
                <span>{{ form.genre ? form.genre : "" }}</span>
              </div>
              <div class="col-lg-6 pb-1">
                <b>Studio : </b>
                <span>{{ form.studio ? form.studio : "" }}</span>
              </div>
            </div>

            <div class="row" v-if="headName != 'anime'">
              <div class="col-lg-6 pb-1">
                <b>Director : </b>
                <span>{{ form.director ? form.director : "" }}</span>
              </div>
              <div class="col-lg-6 pb-1">
                <b>Actors : </b>
                <span v-for="(act, index) in form.actor" :key="index"
                  >{{ act }}{{ index != form.actor.length - 1 ? "," : "" }}
                </span>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 pb-1">
                <b>Rating : </b>
                <span
                  >{{ form.rating ? form.rating : "-" }}
                  <i class="fas fa-star yellow" v-if="form.rating != ''"
                /></span>
              </div>
              <div class="col-lg-6 pb-1">
                <b>CreateAt : </b>
                <span v-if="form.createAt">{{ this.formatDate(form.createAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import "../assets/scss/style.scss";
import moment from "moment";

export default {
  name: "DetailModal",
  props: ["headName", "form"],
  data() {
    return {};
  },
  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
    formatDate(date) {
      var time = date.toDate();
      var formatTimeShow = moment(time).format("DD-MM-YYYY HH:mm");
      return formatTimeShow;
    },
  },
};
</script>

<style>
.yellow {
  color: #ffcf22;
}
</style>
