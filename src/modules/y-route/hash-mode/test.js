import Vue from "vue";
import App from "./index.vue";

import VueRouter from "vue-router";

import Home from "./home.vue";
import Foo from "./foo.vue";
import Bar from "./bar.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    { path: "/", component: Home },
    { path: "/foo", component: Foo },
    { path: "/bar", component: Bar }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to);
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
