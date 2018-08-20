import Vue from 'vue';
import App from './index.vue';

import vueRouter from "vue-router";
import routeVo from "./router";

import Vuex from 'vuex';

Vue.use(vueRouter);
Vue.use(Vuex);

const routes = routeVo['routes'];
const router = new vueRouter({
  mode: 'history',
  routes
});

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state,obj) {
      state.count+=obj.val
    }
  },
  getters:{
    getTodoById:function (state){
      return state.count+1;
    }
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")