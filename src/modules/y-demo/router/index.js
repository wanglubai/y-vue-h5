import vueRouter from "vue-router";

import cMvvm from "../components/c-mvvm.vue";

import btemplate from "../components/b-template.vue";
import bclass from "../components/b-class.vue";
import bif from "../components/b-if.vue";
import bfor from "../components/b-for.vue";
import bevent from "../components/b-event.vue";
import bfun from "../components/b-fun.vue";
import ccycle from "../components/c-cycle.vue";
import zcombase from "../components/z-com-base.vue";
import ecomponent from "../components/e-component.vue"
let routes = [];
let vms = [];

let core = {
  'title': '核心',
  list: [{
    path: '/cMvvm',
    name: 'cMvvm',
    component: cMvvm,
    msg: 'MVVM'
  }, {
    path: '/ccycle',
    name: 'ccycle',
    component: ccycle,
    msg: '生命周期'
  }]
}

let base = {
  'title': '基础',
  list: [{
    path: '/btemplate',
    name: 'btemplate',
    component: btemplate,
    msg: '模板语法'
  }, {
    path: '/bfun',
    name: 'bfun',
    component: bfun,
    msg: '数据调用'
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
    msg: '列表渲染'
  }, {
    path: '/bevent',
    name: 'bevent',
    component: bevent,
    msg: '事件处理'
  }]
}

let component = {
  'title': '组件',
  list: [{
    path: '/zcombase',
    name: 'zcombase',
    component: zcombase,
    msg: '基础'
  }]
}

let example = {
  'title': '实例',
  list: [{
    path: '/ecomponent',
    name: 'ecomponent',
    component: ecomponent,
    msg: '组件'
  }]
}

routes = routes.concat(routes, core['list'], base['list'], component['list'],example['list']);
vms.push(core, base, component,example);

let routeVo = {
  'routes': routes,
  'vms': vms
};
export default routeVo;