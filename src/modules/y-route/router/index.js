import c1 from '../components/c1.vue';
import c2 from '../components/c2.vue';
import c3 from '../components/c3.vue';
import vueRouter from "vue-router";

const routes = [{
    path: '/c1',
    name: 'c1',
    component: c1
  },
  {
    path: '/c2',
    name: 'c2',
    component: c2
  },
  {
    path: '/c3',
    name: 'c3',
    component: c3
  }
]

const router = new vueRouter({
  mode: 'history',
  routes
});

export default router;