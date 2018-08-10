<template>
  <div>
    <div id="mobile-bar" class="top">
      <a class="menu-button"></a>
      <a class="logo" href="/"></a>
    </div>

    <div class="sidebar open">
      <div class="sidebar-inner-index">
        <ul class="main-menu">

          <li class="nav-dropdown-container learn" v-for="routeVm in routeVms">
            <a class="nav-link">{{routeVm['title']}}</a><span class="arrow"></span>
            <ul class="nav-dropdown">
              <li>
                <ul>
                  <li v-for="item in routeVm['list']"><router-link :to="{'name':item['name']}" class="nav-link">{{item['name']}}</router-link></li>
                </ul>
              </li>
            </ul>
          </li>
        
        </ul>
      </div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import routeVo from "./router";
import "./css/index.css";
import "./css/sidebar.css";
import "./css/common.css";

export default {
  data() {
    return {
      routeVms: routeVo["vms"]
    };
  },
  methods: {}
};
</script>