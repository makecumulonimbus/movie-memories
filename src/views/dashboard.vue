<template>
  <div class="dashboard">
    <div class="menu-filter">
      <div class="left-manage d-flex">
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="all"
            @click="filterStatus('all')"
            v-bind:class="{
              'btn-confirm': statusActive == 'all',
              'btn-cancle': statusActive != 'all',
            }"
            ><i class="icon-filter fas fa-th-large" /><span> ALL</span></b-button
          >
        </div>
        <b-tooltip
          v-if="windowWidth < 701"
          target="all"
          title="ALL"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="movie"
            @click="filterStatus('movie')"
            v-bind:class="{
              'btn-confirm': statusActive == 'movie',
              'btn-cancle': statusActive != 'movie',
            }"
            ><i class="icon-filter fas fa-film" /><span> MOVIE</span></b-button
          >
        </div>
        <b-tooltip
          v-if="windowWidth < 701"
          target="movie"
          title="MOVIE"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="series"
            @click="filterStatus('series')"
            v-bind:class="{
              'btn-confirm': statusActive == 'series',
              'btn-cancle': statusActive != 'series',
            }"
            ><i class="icon-filter fas fa-play-circle" /><span> SERIES</span></b-button
          >
        </div>
        <b-tooltip
          v-if="windowWidth < 701"
          target="series"
          title="SERIES"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
        <div class="btn-manage mr-2">
          <b-button
            variant="primary"
            id="anime"
            @click="filterStatus('anime')"
            v-bind:class="{
              'btn-confirm': statusActive == 'anime',
              'btn-cancle': statusActive != 'anime',
            }"
            ><i class="icon-filter fas fa-video" /><span> ANIME</span></b-button
          >
        </div>
        <b-tooltip
          v-if="windowWidth < 701"
          target="anime"
          title="ANIME"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
      </div>
    </div>

    <div class="row status-chart">
      <div class="col-sm-12 col-md-6 status-count">
        <div class="title-dashboard">Status :</div>
        <div class="row countData">
          <div class="col-lg-4 col-md-6 col-sm-4 col pb-4 bg-all">
            <div class="cardcontent">
              <div class="status-title">ALL</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countStatusNumber">
                {{ showStatus.watched + showStatus.wanted }}
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-4 col pb-4 bg-watched">
            <div class="cardcontent">
              <div class="status-title">WATCHED</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countStatusNumber">
                {{ showStatus.watched }}
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-sm-4 col pb-4 bg-wanted">
            <div class="cardcontent">
              <div class="status-title">WANTED</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countStatusNumber">
                {{ showStatus.wanted }}
              </div>
            </div>
          </div>
        </div>
        <div class="title-dashboard">Advanced :</div>
        <div class="row bg-advance">
          <div class="col-lg-3 col-md-6 col-sm-3 col pt-2 pb-2 border-1">
            <div class="cardcontent">
              <div class="advance-title">DIRECTOR</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countAdvanceNumber">
                {{ advanceData.director }}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-3 col pt-2 pb-2 border-2">
            <div class="cardcontent">
              <div class="advance-title">ACTORS</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countAdvanceNumber">
                {{ advanceData.actors }}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-3 col pt-2 pb-2 border-3">
            <div class="cardcontent">
              <div class="advance-title">GENRE</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countAdvanceNumber">
                {{ advanceData.genre }}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-3 col pt-2 pb-2">
            <div class="cardcontent">
              <div class="advance-title">STUDIO</div>
              <div v-if="loading" class="loading-status-count">
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <div v-if="!loading" class="countAdvanceNumber">
                {{ advanceData.studio }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 status-count">
        <div class="chart" v-if="!loadingPieChart">
          <pie-chart :data="dataPie" :colors="pieColors"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import "@/assets/scss/style.scss";
import firebaseApp from "@/firebase/firebase_app";

export default {
  name: "Dashboard",
  data() {
    return {
      loading: false,
      loadingPieChart : false,
      windowWidth: window.innerWidth,
      staticData : {},
      statusActive: "all",
      showStatus: {
        watched: 0,
        wanted: 0,
      },
      allStatusCount : {
        watched: 0,
        wanted: 0,
      },
      movieStatusCount: {
        watched: 0,
        wanted: 0,
      },
      seriesStatusCount: {
        watched: 0,
        wanted: 0,
      },
      animeStatusCount: {
        watched: 0,
        wanted: 0,
      },
      advanceData : {
        actors : 0,
        director : 0,
        studio : 0,
        genre : 0
      },
      dataPie: [
        {
          name: "Movie",
          value: 0,
        },
        {
          name: "Series",
          value: 0,
        },
        {
          name: "Anime",
          value: 0,
        },
      ],
      pieColors : ['#41fcab','#ff8f5f' ,'#9b69ff'],
    };
  },
  created() {
    this.loadStaticData()
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },

  methods: {
    loadStaticData(){
      this.loading = true;
      this.loadingPieChart = true
      const dataRef = firebaseApp.firestore().doc("dashboard/tD4U01fWZfmfrh4eSFIv");
      dataRef
        .get()
        .then((document) => {
            this.loading = false;
            this.staticData = document.data()
            var statusWatched = this.staticData.movie.movie_watched + this.staticData.series.series_watched + this.staticData.anime.anime_watched 
            var statusWanted = this.staticData.movie.movie_wanted + this.staticData.series.series_wanted + this.staticData.anime.anime_wanted
            this.showStatus.watched = statusWatched
            this.showStatus.wanted = statusWanted

            //all
            this.allStatusCount.watched = statusWatched
            this.allStatusCount.wanted = statusWanted

            //movie
            this.movieStatusCount.watched = this.staticData.movie.movie_watched
            this.movieStatusCount.wanted =  this.staticData.movie.movie_wanted

            //series
            this.seriesStatusCount.watched = this.staticData.series.series_watched
            this.seriesStatusCount.wanted = this.staticData.series.series_wanted

            //anime
            this.animeStatusCount.watched = this.staticData.anime.anime_watched
            this.animeStatusCount.wanted = this.staticData.anime.anime_wanted

            //advance
            this.advanceData.actors = this.staticData.advance.actors
            this.advanceData.genre = this.staticData.advance.genre
            this.advanceData.director = this.staticData.advance.director
            this.advanceData.studio = this.staticData.advance.studio

            //piechart
            this.piechartData()
        })
        .catch((err) => {
          this.loading = false;
          this.loadingPieChart = false
          console.log(err);
        });
    },

    filterStatus(status) {
      this.statusActive = status;
      if(this.statusActive == 'movie'){
        this.showStatus.watched = this.movieStatusCount.watched
        this.showStatus.wanted = this.movieStatusCount.wanted
      }else if (this.statusActive == 'series'){
        this.showStatus.watched = this.seriesStatusCount.watched
        this.showStatus.wanted = this.seriesStatusCount.wanted
      }else if (this.statusActive == 'anime'){
        this.showStatus.watched = this.animeStatusCount.watched
        this.showStatus.wanted = this.animeStatusCount.wanted
      }else{
        this.showStatus.watched = this.allStatusCount.watched 
        this.showStatus.wanted = this.allStatusCount.wanted
      }
    },
    
    piechartData(){
      this.dataPie.map((data) =>{
        if(data.name == 'Movie'){
            return data.value = this.movieStatusCount.watched + this.movieStatusCount.wanted
        }else if(data.name == 'Series'){
            return data.value = this.seriesStatusCount.watched + this.seriesStatusCount.wanted
        }
        else if(data.name == 'Anime'){
            return data.value = this.animeStatusCount.watched + this.animeStatusCount.wanted
        }
      })
      this.loadingPieChart = false
    },

  },
};
</script>

<style scoped>
.cardcontent {
  border-radius: 10px;
}
.bg-all .cardcontent {
  padding: 20px;
  background: linear-gradient(62.6deg, #87f8ff 0%, #2fa8ff 100%);
}
.bg-watched .cardcontent {
  padding: 20px;
  background: linear-gradient(62.6deg, #b3fcad 0%, #52ff97 100%);
}
.bg-wanted .cardcontent {
  padding: 20px;
  background: linear-gradient(62.6deg, #ffd597 0%, #ff9797 100%);
}
.bg-advance {
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(62.6deg, #efff69 0%, #ff76f4 100%)
}
.countStatusNumber {
  font-size: 25px;
  color: black;
}
.countAdvanceNumber{
  font-size: 22px;
  color: black;
}
.status-title {
  padding-bottom: 7px;
  font-size: 18px;
  color: black;
}
.advance-title {
  padding-bottom: 7px;
  font-size: 16px;
  color: black;
}
.status-count {
  margin: 15px 0;
}
.title-dashboard {
  text-align: left;
  font-size: 20px;
}
.countData {
  margin: 0px -15px !important;
}
.chart {
  height: 300px;
}

.loading-status-count span {
  color: black;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 22px;
  height: 22px;
}

.left-manage {
  margin-left: 1rem;
}


.tooltip-icon {
  display: none;
}
.btn-manage button {
  transition: 0.3s;
  font-size: 15px;
}

.btn-manage span {
  display: initial;
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
  .col.bg-all {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }
  .col.bg-watched {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }
  .col.bg-wanted {
    flex: 0 0 100% !important;
    max-width: 1000% !important;
  }
}
@media screen and (max-width: 374px) {
  .col.bg-all {
    flex: 0 0 100% !important;
    max-width: 1000% !important;
  }
  .col.bg-watched {
    flex: 0 0 100% !important;
    max-width: 1000% !important;
  }
  .col.bg-wanted {
    flex: 0 0 100% !important;
    max-width: 1000% !important;
  }
}

.border-1{
  border-right : 2px solid white;
}
.border-2{
  border-right : 2px solid white;
}
.border-3{
  border-right : 2px solid white;
}

@media screen and (max-width: 991px) {
  .border-1{
    border-right : 2px solid white;
    border-bottom : 2px solid white;
  }
  .border-2{
    border-right : 0px solid white;
    border-bottom : 2px solid white;
  }
  .border-3{
    border-right : 2px solid white;
  }
}
@media screen and (max-width: 767px) {
  
.border-1{
  border-right : 2px solid white;
   border-bottom : 0px solid white;
}
.border-2{
  border-right : 2px solid white;
   border-bottom : 0px solid white;
}
.border-3{
  border-right : 2px solid white;
}
}
@media screen and (max-width: 468px) {
  
.border-1{
  border-right : 2px solid white;
     border-bottom : 2px solid white;
}
.border-2{
  border-right : 2px solid white;
     border-bottom : 2px solid white;
}
.border-3{
  border-right : 0px solid white;
    border-bottom : 2px solid white;
}
}
@media screen and (max-width: 374px) {
  
.border-1{
  border-right : 2px solid white;
     border-bottom : 2px solid white;
}
.border-2{
  border-right : 0px solid white;
     border-bottom : 2px solid white;
}
.border-3{
  border-right : 2px solid white;
    border-bottom : 0px solid white;
}
}
@media screen and (max-width: 300px) {
  
.border-1{
  border-right : 0px solid white;
     border-bottom : 0px solid white;
}
.border-2{
  border-right : 0px solid white;
     border-bottom : 0px solid white;
}
.border-3{
  border-right : 0px solid white;
    border-bottom : 0px solid white;
}
}
</style>
