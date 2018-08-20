import vueRouter from "vue-router";

import cMvvm from "../components/c-mvvm.vue";

import btemplate from "../components/base/b-template.vue";
import bclass from "../components/base/b-class.vue";
import bif from "../components/base/b-if.vue";
import bfor from "../components/base/b-for.vue";
import bevent from "../components/base/b-event.vue";
import bfun from "../components/base/b-fun.vue";

import ccycle from "../components/c-cycle.vue";

import ecomponent from "../components/e-component.vue";

import zcomevent from "../components/zcom/z-com-event.vue";
import zcombase from "../components/zcom/z-com-base.vue";
import zcomprops from "../components/zcom/z-com-props.vue";
import zcomslot from "../components/zcom/z-com-slot.vue";
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
    msg: '数据绑定'
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
  },{
    path: '/zcomprops',
    name: 'zcomprops',
    component: zcomprops,
    msg: 'props'
  },{
    path: '/zcomevent',
    name: 'zcomevent',
    component: zcomevent,
    msg: 'event'
  },{
    path: '/zcomslot',
    name: 'zcomslot',
    component: zcomslot,
    msg: 'slot'
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

let vuex={
  'title':'VueX',
  list: [{
    path: '/ecomponent',
    name: 'ecomponent',
    component: ecomponent,
    msg: '组件'
  }]
}
routes = routes.concat(routes, core['list'], base['list'], component['list'],example['list'],vuex['list']);
vms.push(core, base, component,example,vuex);

let routeVo = {
  'routes': routes,
  'vms': vms
};
export default routeVo;