<template>
  <div class="top-bar" id="top-bar">
    <a :href="`//${pre}m.longzhu.com/index`" class="top-bar-logo report-rbi-click" data-action='click' data-cate='' data-label='topbar-logo'></a>
    <!--<span v-if="!isUserLogin" class="top-bar-user" @click="showUserPanel"><img :src="userinfo.avatar" /></span> -->
    <a v-if="!isUserLogin" class="top-bar-user report-rbi-click" data-action='click' data-cate='' data-label='topbar-login' moblink-featured id="moblink10"></a>
    <a href="javascript:;" moblink-featured id="moblink9" class="top-bar-user report-rbi-click" data-action='click' data-cate='' data-label='topbar-login' v-else></a>
    <!--<a :href="`//${pre}login.plu.cn/portable/login`" class="top-bar-user report-rbi-click" data-action='click' data-cate='' data-label='topbar-login' v-else></a>-->
    <!-- 个人信息弹窗. -->
    <div class="topbar-userinfo" v-if="isPanel" @touchmove.prevent>
      <div class="userinfo-panel">

        <div class="close-popup-btn" @click="showUserPanel"></div>

        <div class="user-face">
          <img :src="userinfo.avatar" />
          <a class="user-vip" :href="`//${pre}pay.longzhu.com/pay/BuyVipPayAlipayView`" v-if="userinfo.profiles.viptype"></a>
          <a class="user-no-vip" :href="`//${pre}pay.longzhu.com/pay/BuyVipPayAlipayView`" v-else></a>
        </div>

        <div class="user-info">
          <div class="user-info-name">
            <span class="user-name" v-text="userinfo.username"></span>
            <i :class="'user-lv user-lv-' + userinfo.newGrade"></i>
          </div>
          <div class="user-info-uid" v-text="'UID: ' + userinfo.uid"></div>
        </div>

        <div class="user-account">
          <div class="user-account-name clearfix">
            <a :href="`//${pre}pay.plu.cn/pay/h5payindex`" class="fl">龙币</a>
            <span class="fl">龙豆</span>
            <span class="fl">仙豆</span>
          </div>

          <div class="user-account-number clearfix">
            <a :href="`//${pre}pay.plu.cn/pay/h5payindex`" class="fl" v-text="userinfo.profiles.userbalance*100 > 10000 ? parseFloat(userinfo.profiles.userbalance/100).toFixed(2) + '万': parseInt(userinfo.profiles.userbalance*100)">--</a>
            <span class="fl" v-text="userinfo.profiles.userbean > 10000 ? parseFloat(userinfo.profiles.userbean/10000).toFixed(2) + '万': userinfo.profiles.userbean">--</span>
            <span class="fl" v-text="userinfo.profiles.xcoin > 10000 ? parseFloat(userinfo.profiles.xcoin/10000).toFixed(2) + '万': userinfo.profiles.xcoin">--</span>
          </div>
        </div>

        <div class="user-exit" @click="exitAccount">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../commons/css/reset.css";
import moblink from "../../commons/moblink.js";
import "./css/index.styl";
import "./css/landscape.css";
import vueHttp from "../../commons/vueHttp.js";
import huanqiAppDownLink from "../../commons/huanqiAppAll.js";
import _ from "lodash";
export default {
  data() {
    return {
      userinfo: false,
      pre: window['_GLOBAL_prefix_'],
      isPanel: false,
      isTobar: true,
      videos: null,
      paraDom:null
    }
  },
  computed: {
    isUserLogin() {
      return _.result(this.userinfo, "uid") <= 0;
    }
  },
  methods: {
    setMoblink() {
      huanqiAppDownLink.setMoblink('moblink10');      //未登录topbar按钮
      huanqiAppDownLink.setMoblink('moblink9');       //已登录topbar按钮
    },
    huanqiApp(e) {
      huanqiAppDownLink.getDownloadLink(e.currentTarget.id);
    },
    changeHttps(logo) {
      return 'https' + logo.substring(4);
    },
    showUserPanel() {
      this.isPanel = !this.isPanel
    },
    exitAccount() {
      let _href = "https://login.plu.cn/member/logout?returnurl=" + window.location.href;
      window.location.href = _href;
    },
    isHideTobar() {
      let agent = navigator.userAgent.toUpperCase();
      if (agent.match(/TGA/i) != null || agent.match(/LONGZHU/i) != null) {
        this.isTobar = false
      }
    },
    //判断横屏还是竖屏
    orientation() {
      this.videos = document.getElementById('videos');
      let orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
      if (orientation == 'landscape') {
        if (!!this.paraDom) {
          this.paraDom.style.display = "block";
          return;
        }
        let para = document.createElement("div");
        para.id = "landscape_dialog";
        let landscapeOrientation = document.body.appendChild(para);
        landscapeOrientation.innerHTML = `<div class='landscapeMask'></div>
        <div class="landscape">
          <div class="landscape-close" id="close_landscape"></div>
        </div>`;
        this.paraDom = document.querySelector('#landscape_dialog')
        let closeLandscape = document.getElementById('close_landscape');
        closeLandscape.addEventListener('click', () => {
          this.colseOrientation(para);
        });
      } else {
        !!this.paraDom && (this.paraDom.style.display = "none");
      }
    },
    colseOrientation(para) {
      para.parentNode.removeChild(para);
      this.paraDom=null;
    },
    listnerOorientation() {
      this.orientation();
      window.addEventListener('resize', this.orientation, false);
    }
  },
  mounted() {
    moblink();

    //临时设置moblink
    this.setMoblink();

    this.listnerOorientation();
    this.$nextTick(() => {
      vueHttp.getUserInfo({
        with: 10370
      }).then(data => {
        this.userinfo = data;
        this.$emit('getUserInfo', this.userinfo);
      })
      this.isHideTobar();
    })
  }
}

</script>