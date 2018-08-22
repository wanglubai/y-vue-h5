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
import zcomdynamic from "../components/zcom/z-com-dynamic.vue";

import anbase from "../components/anmation/an-base.vue";

import routebase from "../components/route/route-base.vue";
import routeapi from "../components/route/route-api.vue";

let routes = [];
let vms = [];

let core = {
  title: "核心",
  list: [
    {
      path: "/cMvvm",
      name: "cMvvm",
      component: cMvvm,
      msg: "MVVM"
    },
    {
      path: "/ccycle",
      name: "ccycle",
      component: ccycle,
      msg: "生命周期"
    }
  ]
};

let base = {
  title: "基础",
  list: [
    {
      path: "/btemplate",
      name: "btemplate",
      component: btemplate,
      msg: "模板语法"
    },
    {
      path: "/bfun",
      name: "bfun",
      component: bfun,
      msg: "数据绑定"
    },
    {
      path: "/bclass",
      name: "bclass",
      component: bclass,
      msg: "class绑定"
    },
    {
      path: "/bif",
      name: "bif",
      component: bif,
      msg: "条件渲染"
    },
    {
      path: "/bfor",
      name: "bfor",
      component: bfor,
      msg: "列表渲染"
    },
    {
      path: "/bevent",
      name: "bevent",
      component: bevent,
      msg: "事件处理"
    }
  ]
};

let component = {
  title: "组件",
  list: [
    {
      path: "/zcombase",
      name: "zcombase",
      component: zcombase,
      msg: "基础"
    },
    {
      path: "/zcomprops",
      name: "zcomprops",
      component: zcomprops,
      msg: "props"
    },
    {
      path: "/zcomevent",
      name: "zcomevent",
      component: zcomevent,
      msg: "event"
    },
    {
      path: "/zcomslot",
      name: "zcomslot",
      component: zcomslot,
      msg: "slot"
    },
    {
      path: "/zcomdynamic",
      name: "zcomdynamic",
      component: zcomdynamic,
      msg: "动态&异步"
    }
  ]
};

let example = {
  title: "实例",
  list: [
    // {
    //   path: "/ecomponent",
    //   name: "ecomponent",
    //   component: ecomponent,
    //   msg: "组件"
    // }
  ]
};

let vuex = {
  title: "VueX",
  list: [
    {
      path: "/ecomponent",
      name: "ecomponent",
      component: ecomponent,
      msg: "组件"
    }
  ]
};

let animation = {
  title: "Animation",
  list: [
    {
      path: "/anbase",
      name: "anbase",
      component: anbase,
      msg: "组件"
    }
  ]
};

let route = {
  title: "路由",
  list: [
    {
      path: "/routebase",
      name: "routebase",
      component: routebase,
      msg: "基础"
    },
    {
      path: "/routeapi",
      name: "routeapi",
      component: routeapi,
      msg: "API"
    }
  ]
};

routes = routes.concat(
  routes,
  core["list"],
  base["list"],
  component["list"],
  example["list"],
  animation["list"],
  vuex["list"],
  route["list"]
);
vms.push(core, base, component, animation, route, vuex, example);

let routeVo = {
  routes: routes,
  vms: vms
};
export default routeVo;
