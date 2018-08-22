<template>
  <div>
    <div id="mobile-bar" class="top">
      <a class="menu-button" v-on:click='sidebarOpenFun'></a>
    </div>

    <div class="sidebar" v-bind:class="{open: sidebarOpen}">
      <div class="sidebar-inner-index">
        <ul class="main-menu">

          <li class="nav-dropdown-container learn" v-for="routeVm in routeVms">
            <h4 class="nav-link a-nav-link">{{routeVm['title']}}</h4><span class="arrow"></span>
            <ul class="nav-dropdown">
              <li>
                <ul>
                  <li v-for="item in routeVm['list']"><router-link :to="{'name':item['name']}" class="nav-link">{{item['msg']}}</router-link></li>
                </ul>
              </li>
            </ul>
          </li>
        
        </ul>
      </div>
    </div>

    <div v-on:click="sidebarCloseFun" class="y-content">
    <transition  name="slide-fade">
      <router-view></router-view>
    </transition>
    </div>
    {{`${username}as`}}
  
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
      routeVms: routeVo["vms"],
      sidebarOpen: false
    };
  },
  computed:{
    username(){
      console.log(this.$route.name);
      return this.$route.name;
    }
  },
  methods: {
    sidebarCloseFun() {
      this.sidebarOpen = false;
    },
    sidebarOpenFun() {
      this.sidebarOpen = true;
    },
    initMobileMenu() {
      var mobileBar = document.getElementById("mobile-bar");
      var sidebar = document.querySelector(".sidebar");
      var menuButton = mobileBar.querySelector(".menu-button");
      menuButton.addEventListener("click", () => {
        this.sidebarOpenFun();
      });
      document.body.addEventListener("click", e => {
        if (e.target !== menuButton && !sidebar.contains(e.target)) {
          this.sidebarCloseFun();
        }
      });
      var start = {};
      var end = {};
      document.body.addEventListener("touchstart", e => {
        start.x = e.changedTouches[0].clientX;
        start.y = e.changedTouches[0].clientY;
      });
      document.body.addEventListener("touchend", e => {
        end.y = e.changedTouches[0].clientY;
        end.x = e.changedTouches[0].clientX;

        var xDiff = end.x - start.x;
        var yDiff = end.y - start.y;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0 && start.x <= 80) this.sidebarOpenFun();
          else this.sidebarCloseFun();
        }
      });
    }
  },
  mounted() {
    this.initMobileMenu();
  }
};
</script>