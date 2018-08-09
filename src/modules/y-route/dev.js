import Vue from 'vue';
import Index from './index.vue';
import c1 from './components/c1.vue';
import c2 from './components/c2.vue';
import vueRouter from "vue-router";

Vue.use(vueRouter);

const router = new vueRouter({
  routes: [{
    path: '/c1',
    component: c1
  }, {
    path: '/c2',
    component: c2
  }]
});

new Vue({
  router,
  render: h => h(Index)
}).$mount("#app")