import vueRouter from "vue-router";
import template from "../components/template.vue";
import vfor from "../components/v-for.vue";

let routes = [];
let vms = [];

let base = {
  'title': '基础',
  list: [{
    path: '/template',
    name: 'template',
    component: template,
    msg: '模板语法'
  }, {
    path: '/vfor',
    name: 'vfor',
    component: vfor,
    msg: 'v-for'
  }]
}

let up = {
  'title': '进阶',
  list: [{
    path: '/template',
    name: 'template',
    component: template,
    msg: '模板语法'
  }, {
    path: '/vfor',
    name: 'vfor',
    component: vfor,
    msg: 'v-for'
  }]
}


routes = routes.concat(routes, base['list'], up['list']);
vms.push(base,up);

let routeVo = {
  'routes': routes,
  'vms': vms
};
export default routeVo;