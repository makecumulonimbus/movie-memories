import Vue from 'vue'
import firebaseApp from './firebase/firebase_app';
import App from './App.vue';
import router from './router/index';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import DrVueEcharts from 'dr-vue-echarts';
import store from './vuex/store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(DrVueEcharts);
const options_toast = {
  transition: "Vue-Toastification__fade"
};
Vue.use(Toast, options_toast);

let app = '';
firebaseApp.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});