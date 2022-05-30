import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import "vue-toastification/dist/index.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Apps from './App.vue';
import DrVueEcharts from 'dr-vue-echarts';
import firebaseApp from './firebase/firebase_app';
import router from './router/index';
import store from './vuex/store'
import Toast from "vue-toastification";
import Vue from 'vue'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(DrVueEcharts);
const options_toast = {
  transition: "Vue-Toastification__fade"
};
Vue.use(Toast, options_toast);

var app;
firebaseApp.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      store,
      router,
      render: h => h(Apps)
    }).$mount('#app');
  }
});