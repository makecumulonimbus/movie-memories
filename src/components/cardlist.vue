<template>
  <div class="card-item col-lg-2 col-md-3 col-sm-4 col-6">
    <div class="item" :class="checkPath($route.name)">
      <div class="dropdown-option">
      <b-dropdown
        id="dropdown-1"
        class="m-md-2"
        no-caret
        toggle-class="text-decoration-none"
      >
        <template #button-content>
          <b-icon icon="three-dots-vertical"></b-icon>
        </template>
        <b-dropdown-item @click="editData"
          ><i class="icon-filter fas fa-edit" /><span class="text-option-edit"
            >Edit</span
          ></b-dropdown-item
        >
        <b-dropdown-item @click="deleteData"
          ><i class="icon-filter fas fa-trash" /><span class="text-option-del">
            Delete</span
          ></b-dropdown-item
        >
      </b-dropdown>
    </div>
      <div class="status" v-if="datas.status == 'watched'">
        <span>WATCHED</span>
      </div>
      <div class="rating" v-if="datas.rating >= 1">
        <b-icon icon="star-fill"></b-icon
        ><span class="pl-1">{{ datas.rating }}</span>
      </div>
      
      <img
        class="image-poster"
        @click="toDetailPage"
        loading="lazy"
        :src="datas.imageURL ? datas.imageURL : require('@/assets/NoImage.png')"
        :alt="datas.title"
      />
      <div class="title">
        <p>
          {{ datas.title }} {{ datas.sequel ? datas.sequel : "" }}
          {{ datas.season ? "SS" + datas.season : "" }}
          {{ datas.year ? "(" + datas.year + ")" : "" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/style.scss";

export default {
  name: "CardList",
  props: ["datas"],
  methods: {
    checkPath(pathName) {
      if (pathName == "Movie") {
        return "bg-movie";
      } else if (pathName == "Series") {
        return "bg-series";
      } else if (pathName == "Anime") {
        return "bg-anime";
      } else {
        return "bg-advanced";
      }
    },
    editData() {
      this.$emit("editData", this.datas);
    },
    deleteData() {
      this.$emit("deleteData", this.datas);
    },
    toDetailPage() {
      this.$emit("toDetailPage", this.datas);
    },
  },
};
</script>

<style scoped>
.card-item {
  margin: 0.6rem 0rem;
}
.item {
  border-radius: 10px !important;

  background: #222;
  padding: 5px;
  height: 100%;
  transition: 0.25s;
}
.item:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
  transition: 0.25s;
}
.item:hover .title p {
  color: black;
}
.card-item .dropdown-option {
  display: none;
}
.card-item:hover .dropdown-option {
  display: block;
}


img {
  vertical-align: middle;
  border-style: none;
}
.title p {
  text-transform: capitalize;
  font-size: 14px;
  text-align: center;
  padding: 1px;
  margin: 0;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dropdown-option {
  position: absolute;
}
::v-deep .dropdown-option .dropdown-menu {
  min-width: 0rem !important;
  left: 2px !important;
}
::v-deep .dropdown-item:active {
  background-color: #7d68ff !important;
}
::v-deep .dropdown-item:hover {
  background-color: #7d68ff !important;
  color: white;
}
::v-deep .dropdown-option .b-dropdown {
  margin-left: 0.3rem !important;
  margin-top: 0.3rem !important;
  margin-bottom: 0rem !important;
  margin-right: 0rem !important;
}
::v-deep .dropdown-option .b-dropdown .btn {
  background-color: unset !important;
  border-color: unset !important;
  border: 0px !important;
  padding: 0px 5px 0px 0px !important;
}
.image-poster {
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  min-height: 260px;
  height: calc(100% - 45px);
  object-fit: cover;
}

@media screen and (min-width: 992px) {
  .card-item.col-lg-2 {
    flex: 0 0 20% !important;
    max-width: 20% !important;
  }
}
@media screen and (min-width: 1250px) {
  .card-item.col-lg-2 {
    flex: 0 0 16.667% !important;
    max-width: 16.667% !important;
  }
}

.text-option-edit {
  margin-left: 7px;
}
.text-option-del {
  margin-left: 7px;
}
::v-deep .dropdown-option .dropdown .dropdown-menu {
  border-radius: 10px !important;
}
::v-deep .dropdown-item:active {
  background-image: linear-gradient(255deg, #4457ff -1.09%, #5cc4ff 100%);
}
::v-deep .dropdown-item:hover {
  background-image: linear-gradient(255deg, #4457ff -1.09%, #5cc4ff 100%);
  color: white;
}
</style>