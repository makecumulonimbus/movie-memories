<template>
  <div>
    <LoadingComponent v-if="loading" />
    <div class="div-nav-bar">
      <b-navbar
        toggleable="lg"
        type="dark"
        class="bg-navbar"
        :class="checkPath($route.name)"
      >
        <b-navbar-brand @click="changePath('/movie')" class="name-navbar">
          <img src="../assets/logo.png" alt="logo" class="logo-baner" />
          <span class="text-logo-nav">MOVIE MEMORIES</span>
        </b-navbar-brand>
        <b-navbar-toggle target="sidebar-right"></b-navbar-toggle>

        <b-sidebar
          id="sidebar-right"
          title="MENU"
          right
          shadow
          backdrop-variant="dark"
          backdrop
        >
          <div class="px-3 py-2">
            <div class="menu-main text-center">
              <div
                class="p-2 movie list-menu"
                @click="changePath('/movie')"
                v-bind:class="{
                  active: $route.name == 'Movie',
                  'none-active': $route.name != 'Movie',
                }"
              >
                <i class="fas fa-film" /><span class="pl-2">MOVIE</span>
              </div>
              <div
                class="p-2 series list-menu"
                @click="changePath('/series')"
                v-bind:class="{
                  active: $route.name == 'Series',
                  'none-active': $route.name != 'Series',
                }"
              >
                <i class="fas fa-play-circle" /><span class="pl-2">SERIES</span>
              </div>
              <div
                class="p-2 anime list-menu"
                @click="changePath('/anime')"
                v-bind:class="{
                  active: $route.name == 'Anime',
                  'none-active': $route.name != 'Anime',
                }"
              >
                <i class="fas fa-video" /><span class="pl-2">ANIME</span>
              </div>
            </div>
            <hr />
            <div class="menu-advanced" v-b-toggle.collapse-1>
              <div>ADVANCED</div>
              <div><i class="fas fa-caret-up" /></div>
            </div>
            <b-collapse id="collapse-1" class="mt-2">
              <div class="list-advanced">
                <div
                  class="p-2 advanced list-menu"
                  @click="changePath('/dashboard')"
                  v-bind:class="{
                    active: $route.name == 'Dashboard',
                    'none-active': $route.name != 'Dashboard',
                  }"
                >
                  <i class="fas fa-chart-bar" /><span class="pl-2">Dashboard</span>
                </div>
                <div
                  class="p-2 advanced list-menu"
                  @click="changePath('/favorite/director')"
                  v-bind:class="{
                    active: $route.name == 'Favorite',
                    'none-active': $route.name != 'Favorite',
                  }"
                >
                  <i class="fas fa-bookmark" /><span class="pl-2">Favorite</span>
                </div>

                <div
                  class="p-2 advanced list-menu"
                  @click="changePath('/changelog')"
                  v-bind:class="{
                    active: $route.name == 'Changelog',
                    'none-active': $route.name != 'Changelog',
                  }"
                >
                  <i class="fas fa-info-circle" /><span class="pl-2">Change log</span>
                </div>
              </div>
            </b-collapse>
          </div>
          <template #footer>
            <div class="img-sidebar-menu text-center mb-3">
              <img src="../assets/sidebar_undrow.svg" width="120px" />
            </div>
            <div
              class="bg-dark text-light align-items-center px-3 py-2 text-center pointer menu-footer"
              @click="openModal"
            >
              <i class="fas fa-sign-out-alt" />
              <span class="pl-1">LOGOUT</span>
            </div>
          </template>
        </b-sidebar>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <ul class="navbar-nav bd-navbar-nav flex-row">
              <li class="nav-item nav-center">
                <b-button
                  class="linkURL"
                  @click="changePath('/movie')"
                  v-bind:class="{
                    active: $route.name == 'Movie',
                    'none-active': $route.name != 'Movie',
                  }"
                >
                  <span class="text-listMenu">MOVIE</span>
                </b-button>
              </li>
              <li class="nav-item nav-center">
                <b-button
                  class="linkURL"
                  @click="changePath('/series')"
                  v-bind:class="{
                    active: $route.name == 'Series',
                    'none-active': $route.name != 'Series',
                  }"
                >
                  <span class="text-listMenu">SERIES</span>
                </b-button>
              </li>
              <li class="nav-item nav-center">
                <b-button
                  class="linkURL"
                  @click="changePath('/anime')"
                  v-bind:class="{
                    active: $route.name == 'Anime',
                    'none-active': $route.name != 'Anime',
                  }"
                >
                  <span class="text-listMenu">ANIME</span>
                </b-button>
              </li>
            </ul>

            <b-nav-item-dropdown
              right
              class="menu-right"
              :class="checkPath($route.name)"
              no-caret
            >
              <template #button-content>
                <i class="fa fa-ellipsis-v" />
              </template>

              <b-dropdown-item to="/dashboard">
                <i class="fas fa-chart-bar" />
                <span>Dashboard</span></b-dropdown-item
              >
              <b-dropdown-item to="/favorite/director">
                <i class="fas fa-bookmark" />
                <span>Favorite</span></b-dropdown-item
              >
              <b-dropdown-item to="/changelog">
                <i class="fas fa-info-circle" />
                <span>Change log</span></b-dropdown-item
              >
              <b-dropdown-item href="#" @click="openModal">
                <i class="fas fa-sign-out-alt" />
                <span>Logout</span>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-modal id="modal-exit" title="LOGOUT" hide-footer>
        <template #modal-header>
          <span class="modal-header-text"><i class="fas fa-sign-out-alt" /> LOGOUT</span>
          <span class="close-icon" @click="toggleModal"><i class="fas fa-times" /> </span>
        </template>
        <template>
          <div class="text-center">
            <img src="../assets/exit.svg" width="200px" />
          </div>
          <div class="text-center text-alart-modal">
            Are you sure you want to logout ?
          </div>
          <div class="btn-delete">
            <b-button @click="logout" class="btn-confirm">LOGOUT</b-button>
            <b-button @click="toggleModal" class="btn-cancle">CANCLE</b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/style.scss";
import firebaseApp from "@/firebase/firebase_app";
import LoadingComponent from "@/components/loading";

export default {
  name: "Navbar",
  components: { LoadingComponent },
  data() {
    return {
      // docID: "Sm7iATIN2RGYdCL7WYle",
      loading: false,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {},
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
    changePath(path) {
      this.$store.dispatch("changePage", 0);
      this.$router.push(path);
    },
    openModal() {
      this.$bvModal.show("modal-exit");
    },
    toggleModal() {
      this.$bvModal.hide("modal-exit");
    },
    logout() {
      this.toggleModal();
      this.loading = true;
      setTimeout(() => {
        firebaseApp
          .auth()
          .signOut()
          .then(() => {
            this.loading = false;
            this.notifyAlert("success", "Logout");
            this.$router.replace("login");
          }).catch(err=>{
            console.log(err);
            this.notifyAlert("error", "Logout unsuccess");
          })
      }, 1000);
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

<style scoped lang="scss">
.navbar-brand {
  padding-top: 8px;
  margin-right: 0rem !important;
}
.bg-navbar {
  box-shadow: 0px 3px 10px #00000040;
}

.bg-navbar.bg-movie {
  background-image: linear-gradient(213.65deg, #41ff8d 11.52%, #42f4ff 105.45%);
}
.bg-navbar.bg-series {
  background-image: linear-gradient(269.56deg, #ff6262 0%, #ffdb5b 100.7%);
}
.bg-navbar.bg-anime {
  background-image: linear-gradient(269.56deg, #6675ff 0%, #fc53ff 100.7%);
}
.bg-navbar.bg-advanced {
  background-image: linear-gradient(269.56deg, #fbfe7e 0.01%, #22da77 100.7%);
}
.name-navbar {
  font-weight: 500;
  cursor: pointer;
}
.nav-item {
  color: black;
}
.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.linkURL {
  margin: 0rem 0.5rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  transition: color 0.3s;
}
.linkURL.active {
  color: white;
  border: 2px solid white !important;
  background-color: unset !important;
  border-radius: 8px;
}
.linkURL.none-active {
  color: black;
  border: 0px solid white !important;
  background-color: unset !important;
}
.linkURL:hover {
  color: white;
  transition: color 0.3s;
}
::v-deep .navbar-dark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='28' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

//left Nav
.logo-baner {
  margin-top: -7px;
  width: 45px;
  margin-left: 0.5rem;
  margin-right: 1rem;
  transition: 0.3s;
}
.text-logo-nav {
  color: white;
  font-size: 23px;
  padding-left: 0rem;
  transition: 0.3s;
}
.name-navbar:hover {
  .text-logo-nav {
    padding-left: 0.5rem;
    transition: 0.3s;
  }
}
.text-listMenu {
  font-size: 17px;
}
.menu-right {
  padding: 0rem 0.2rem;
}
::v-deep .navbar-dark .navbar-nav .nav-link {
  transition: color 0.3s;
  color: black;
}
::v-deep .navbar-dark .navbar-nav .nav-link:hover {
  transition: color 0.3s;
  color: white;
}
::v-deep .navbar-dark .navbar-nav .nav-link:focus {
  color: black;
}
.menu-right.bg-advanced {
  border: 2px solid white;
  border-radius: 8px;
}

//menu dropdown
::v-deep .dropdown-menu.dropdown-menu-right {
  border-radius: 10px;
}
::v-deep .dropdown-item:active {
  background-image: linear-gradient(255deg, #4457ff -1.09%, #5cc4ff 100%);
}
::v-deep .dropdown-item:hover {
  background-image: linear-gradient(255deg, #4457ff -1.09%, #5cc4ff 100%);
  color: white;
}
.dropdown-menu span {
  margin-left: 28px;
}
::v-deep .dropdown-item {
  padding: 0.3rem 1.5rem !important;
}
.dropdown-item svg {
  position: absolute;
  margin-top: 4px;
}
.menu-footer {
  background-image: linear-gradient(255deg, #4457ff -1.09%, #5cc4ff 100%);
  background-size: 150% !important;
  transition: 0.3s !important;
}
.menu-footer:hover {
  transition: 0.3s !important;
  background-position: right !important;
}
.list-menu {
  cursor: pointer;
  border-radius: 8px;
}

.movie.list-menu.active {
  background-image: linear-gradient(213.65deg, #41ff8d 11.52%, #42f4ff 105.45%);
  color: white;
}
.series.list-menu.active {
  background-image: linear-gradient(269.56deg, #ff6262 0%, #ffdb5b 100.7%);
  color: white;
}
.anime.list-menu.active {
  background-image: linear-gradient(269.56deg, #6675ff 0%, #fc53ff 100.7%);
  color: white;
}
.advanced.list-menu.active {
  background-image: linear-gradient(269.56deg, #fbfe7e 0.01%, #22da77 100.7%);
  color: black;
}

.list-menu.none-active:hover {
  background: #ebebeb;
  color: black;
}

.menu-advanced {
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
}
.menu-advanced:hover {
  color: #5399ff;
}
.menu-advanced.collapsed svg {
  transition: transform 0.3s;
}
.menu-advanced.not-collapsed svg {
  transition: transform 0.3s;
  transform: rotate(180deg);
}
.list-advanced {
  text-align: center;
}
</style>
