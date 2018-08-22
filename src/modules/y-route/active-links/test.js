import Vue from 'vue';
import App from './index.vue';

import VueRouter from "vue-router";

import home from "./home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: home },
    { path: '/about', component: home },
    { path: '/users', component: home,
      children: [
        { path: ':username', name: 'user', component: home }
      ]
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")