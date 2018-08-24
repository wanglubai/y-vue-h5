import Vue from "vue";
import App from "./index.vue";

import vueRouter from "vue-router";
import vuex from "vuex";

Vue.use(vueRouter);
Vue.use(vuex);

const store = new vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state,n) {
      state.count+=n;
    }
  },
  getters: {
    getconut(state) {
      return state.count + "-as";
    },
    getconuts(state, getters) {
      return getters.getconut + "-getconuts";
    },
    getcall(state) {
      return function a(i) {
        state.count + "-" + i;
      };
    }
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
