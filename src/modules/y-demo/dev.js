import Vue from 'vue';
import App from './index.vue';

import vueRouter from "vue-router";
import routeVo from "./router";

Vue.use(vueRouter);

const routes = routeVo['routes'];
const router = new vueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")