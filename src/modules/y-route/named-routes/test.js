import Vue from "vue";
import App from "./index.vue";

import VueRouter from "vue-router";

import Home from "./home.vue";
import Foo from "./foo.vue";
import Bar from "./bar.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
