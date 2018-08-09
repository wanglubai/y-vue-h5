import Vue from 'vue';
import App from './index.vue';

import vueRouter from "vue-router";
import router from "./router";

Vue.use(vueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")