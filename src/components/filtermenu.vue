<template>
  <div class="top-menu">
    <div class="pl-3 pr-3 btn-status menu-filter">
      <div class="left-filter d-flex">
        <div class="btn-filter mr-2">
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
        <div class="btn-filter mr-2">
          <b-button
            variant="primary"
            id="watched"
            @click="filterStatus('watched')"
            v-bind:class="{
              'btn-confirm': statusActive == 'watched',
              'btn-cancle': statusActive != 'watched',
            }"
            ><i class="icon-filter fas fa-eye" /><span> WATCHED</span></b-button
          >
        </div>
        <b-tooltip
          v-if="windowWidth < 701"
          target="watched"
          title="WATCHED"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
        <div class="btn-filter mr-2">
          <b-button
            variant="primary"
            id="wanted"
            @click="filterStatus('wanted')"
            v-bind:class="{
              'btn-confirm': statusActive == 'wanted',
              'btn-cancle': statusActive != 'wanted',
            }"
            ><i class="icon-filter fas fa-eye-slash" /><span> WANTED</span></b-button
          >
        </div>
        <b-tooltip
          v-if="windowWidth < 701"
          target="wanted"
          title="WANTED"
          placement="bottom"
          class="tooltip-icon"
        ></b-tooltip>
      </div>

      <div class="right-filter-main d-flex">
        <div class="btn-filter">
          <b-button variant="primary" id="filter" @click="filterAll"  
          v-bind:class="{
              'btn-confirm': form.filterMode != '',
              'btn-cancle': form.filterMode == '' && form.filterData == '',
            }"
            ><i class="fas fa-filter"
          /></b-button>
        </div>
        <!-- <b-tooltip target="filter" title="FILTER" placement="bottom"></b-tooltip> -->
        <div class="search-container ml-2">
          <b-form @submit.prevent="searchValue">
            <b-input-group>
              <b-form-input
                id="search"
                v-model="search"
                placeholder="Search..."
                size="sm"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-button class="btn-search" size="sm" @click="searchValue"
                  ><i class="fas fa-search"
                /></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </div>
      </div>
    </div>
    <FilterModal @toggleModal="toggleModal" @submit="submit" :form="form"  @clearFilter="clearFilter"/>
  </div>
</template>

<script>
import "../assets/scss/style.scss";
import FilterModal from "../components/filterModal.vue";

export default {
  name: "FilterMenu",

  data() {
    return {
      windowWidth: window.innerWidth,
      statusActive: "all",
      search: "",
      form: {
        searchValue : "",
        filterMode: "",
        mode: [
          { value: "", text: "" },
          { value: "genre", text: "Genre" },
          { value: "year", text: "Year" },
          { value: "rating", text: "Rating" },
          { value: "studio", text: "Studio" },
          { value: "director", text: "Director" },
          { value: "actor", text: "Actor" },
          { value: "search", text: "Search" },

        ],
        filterData: "",
        ratingSelect: "",
        yearSelected: "",
        genreSelect: "",
        studioSelect: "",
        directorSelect: "",
        actorSelect: "",
        status: [
          { value: "all", text: "All" },
          { value: "watched", text: "Watched" },
          { value: "wanted", text: "Wanted" },
        ],
        rating: [
          { value: "", text: "" },
          { value: "10", text: "10" },
          { value: "9", text: "9" },
          { value: "8", text: "8" },
          { value: "7", text: "7" },
          { value: "6", text: "6" },
          { value: "5", text: "5" },
          { value: "4", text: "4" },
          { value: "3", text: "3" },
          { value: "2", text: "2" },
          { value: "1", text: "1" },
        ],
        genre: [],
        studio: [],
      },
    };
  },
  components: {
    FilterModal,
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },

  methods: {
    filterStatus(status) {
      this.statusActive = status;
      this.$emit("filterStatus", this.statusActive);
    },
    filterAll() {
      this.form.searchFil = this.search;
      this.form.statusSelect = this.statusActive;
      this.$bvModal.show("modal-filter");
    },
    toggleModal() {
      this.$bvModal.hide("modal-filter");
    },
    submit() {
    
        if (this.form.filterMode == "genre") {
          this.form.filterData = this.form.genreSelect;
        } else if (this.form.filterMode == "year") {
          this.form.filterData = this.form.yearSelected;
        } else if (this.form.filterMode == "rating") {
          this.form.filterData = parseInt(this.form.ratingSelect);
        } else if (this.form.filterMode == "studio") {
          this.form.filterData = this.form.studioSelect;
        } else if (this.form.filterMode == "director") {
          this.form.filterData = this.form.directorSelect;
        } else if (this.form.filterMode == "actor") {
          this.form.filterData = this.form.actorSelect;
        }else if(this.form.filterMode == "search"){
          this.form.filterData = this.form.searchValue.trim().toLowerCase();
        }else {
          this.form.filterData = '';
        }
      
      var filter = {
        mode : this.form.filterMode,
        value : this.form.filterData,
      }

      this.$emit("filterData", filter);
      this.$bvModal.hide("modal-filter");
    },
    searchValue() {
      this.$emit("searchValue", this.search.trim().toLowerCase());
    },
    clearFilter(){
      this.form.searchValue = ''
      this.form.filterMode = ''
      this.form.filterData = ''
      
      this.form.genreSelect = ''
      this.form.yearSelected = ''
      this.form.ratingSelect = ''
      this.form.studioSelect = ''
      this.form.directorSelect = ''
      this.form.actorSelect = ''

      var filter = {
        mode : '',
        value : ''
      }
      this.$emit("filterData", filter);
      this.$bvModal.hide("modal-filter");
    }
  },
};
</script>

<style scoped>
/* #search {
  border-color: #7d68ff;
} */

.btn-filter .btn-confirm {
  font-size: 15px;
}
.btn-filter .btn-cancle {
  font-size: 15px;
}
/* .icon-filter {
  display: none;
} */
.tooltip-icon {
  display: none;
}

@media screen and (max-width: 700px) {
  .tooltip-icon {
    display: initial;
  }
  .btn-filter .icon-filter {
    display: initial;
  }
  .btn-filter span {
    display: none;
  }
}

@media screen and (max-width: 575px) {
  .search-container {
    display: none;
  }
}
</style>
