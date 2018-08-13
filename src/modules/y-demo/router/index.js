import vueRouter from "vue-router";

import cMvvm from "../components/c-mvvm.vue";

import btemplate from "../components/b-template.vue";
import bclass from "../components/b-class.vue";
import bif from "../components/b-if.vue";
import bfor from "../components/b-for.vue";
import bevent from "../components/b-event.vue";

let routes = [];
let vms = [];

let core = {
  'title': '核心',
  list: [{
    path: '/cMvvm',
    name: 'cMvvm',
    component: cMvvm,
    msg: 'MVVM'
  }, ]
}

let base = {
  'title': '基础',
  list: [{
    path: '/btemplate',
    name: 'btemplate',
    component: btemplate,
    msg: '模板语法'
  }, {
    path: '/bclass',
    name: 'bclass',
    component: bclass,
    msg: 'class绑定'
  }, {
    path: '/bif',
    name: 'bif',
    component: bif,
    msg: '条件渲染'
  }, {
    path: '/bfor',
    name: 'bfor',
    component: bfor,
    msg: 'for列表'
  }, {
    path: '/bevent',
    name: 'bevent',
    component: bevent,
    msg: '事件模型'
  }]
}

let use={
  'title': 'demo',
  list:[]
}

routes = routes.concat(routes, core['list'], base['list'],use['list']);
vms.push(core, base,use);

let routeVo = {
  'routes': routes,
  'vms': vms
};
export default routeVo;