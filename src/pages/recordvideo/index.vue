<template>
  <div class="home-warp" id="home-warp" :class="{'topbarhidden':isHiddenNav}">
    <video v-if='stream' class="vjs-tech" width="100%" height="100%" controls="controls" autoplay="autoplay" x-webkit-airplay="true" x5-video-player-fullscreen="true" preload="auto" playsinline="true" webkit-playsinline x5-video-player-typ="h5">
      <source type="application/x-mpegURL" :src="streamUrl">
    </video>
    
    <div>
      <div class="ya-video-title">{{intro}} 
        <span class="list-item-bot-right">
          <i class="list-item-hot-icon"></i>
          <i class="list-item-hot-num">{{playSum}}</i>
        </span></div>
      
      <a class="head-con" :href='domain'>
        <div class="ya-head"><img :src="zuozhe_avatar"></div>
        <div class="miaoshu">
          <div class="zuozhe_nickName">{{zuozhe_nickName}}</div>
          <div class="zhubo_nickName">{{zhubo_nickName}}</div>
        </div>
        <div v-if='isLive' class="zhibo">正在直播</div>
      </a>
    </div>
  
    <div class="home-hot-warp home-first-warp">
      <a href="#" data-action="click" data-cate="" data-label="home-title-秀场" class="home-hot-title">
        <div class="home-hot-title-tit"><span class="home-title-name">视频推荐</span></div> <span class="more1 hot-more1"></span>
      </a>
      <div class="home-list-warp">
        <template v-for="item in videos">
          <a :href="item.yurl" data-cate="" data-action="click" data-label="home-play-item" class="defult-list-item">
            <span class="list-item-img">
              <img :src="item.preview"> 
              <i class="list-item-img-info text-nowrap">{{item.intro}}</i>
            </span> 
            <span class="list-item-bottom">
              <span class="list-item-bot-name">{{item.title}}</span> 
                <span class="list-item-bot-right">
                  <i class="list-item-hot-icon"></i>
                  <i class="list-item-hot-num">{{item.playSum}}</i>
                </span>
            </span>
          </a>
        </template>
      </div>
    </div>
    
  
    <div class="home-hot-warp home-first-warp">
      <a href="#" data-action="click" data-cate="" data-label="home-title-秀场" class="home-hot-title">
        <div class="home-hot-title-tit"><span class="home-title-name">直播推荐</span></div> <span class="more1 hot-more1"></span>
      </a>
      <div class="home-list-warp">
        <template v-for="item in lives">
        <a :href="item.TargetUrl" data-cate="" data-action="click" data-label="home-play-item" class="defult-list-item">
        <span class="list-item-img">
          <img :src="item.Thumb"> 
          <i class="list-item-img-info text-nowrap">{{item.UserName}}</i>
        </span>
        <span class="list-item-bottom">
          <span class="list-item-bot-name">{{item.Caption}}</span> 
          <span class="list-item-bot-right"><i class="list-item-hot-icon1"></i> <i class="list-item-hot-num">{{item.Online}}</i></span>
        </span>
        </a>
        </template>
      </div>
    </div>
  
    <div class="entertainment-warp" id="adlun">
    </div>
  
    <huanqi></huanqi>
    <footerdom></footerdom>
    <scrolldown></scrolldown>
  </div>

</template>

<script>
import _ from "lodash";
import vueHttp from "../../commons/vueHttp.js";
import topbar from "../../components/topbar/index.vue";
import huanqi from "../../components/huanqi/index.vue";
import navdom from "../../components/nav/index.vue";
import footerdom from "../../components/footer/index.vue";

import scrolldown from "../../components/scrolldownload/index.vue";
import topBarScroll from "../../commons/topbarscroll.js";
import "../../commons/css/reset.css";
import "./css/index.css";
import openShares from "../../commons/openShares";

export default {
  data() {
    return {
      items: [],
      pre: window["_GLOBAL_prefix_"],
      isHiddenNav: false,
      videos: [],
      lives: [],
      id: null,
      streamurl: "",
      intro: "视频描述",
      playSum: null,
      zuozhe_avatar: "",
      zuozhe_nickName: "",
      zhubo_nickName: "",
      videoid: "",
      url: "",
      isLive: false,
      stream: false,
      domain: "#",
      title: ""
    };
  },
  components: {
    topbar,
    navdom,
    footerdom,
    scrolldown,
    huanqi
  },
  methods: {
    formatNum_(num) {
      let text = parseInt(num);
      if (text > 10000) {
        text = (text / 10000).toFixed(1) + "万";
      }
      return text;
    },
    up() {
      this.isHiddenNav = false;
    },
    down() {
      this.isHiddenNav = true;
    },
    record() {
      vueHttp
        .recordVideo({
          device: 8,
          leadingactor: this.id,
          packageid: -1,
          pageindex: 0,
          pagesize: 4
        })
        .then(data => {
          if (data && data["data"]) {
            this.videos = data["data"]["videos"];
            let aurl = window.location.href;
            if (aurl.indexOf("?") != -1) {
              aurl = aurl.split("?")[0];
            }
            for (var i in this.videos) {
              this.videos[i].yurl = `${aurl}?videoid=${this.videos[i].id}`;
            }
          }
        });
    },
    live() {
      vueHttp
        .recommendLive({
          pageIndex: 1,
          pageSize: 4
        })
        .then(data => {
          this.lives = data["Rooms"];
        });
    },
    play() {
      vueHttp
        .yaplayvideo({
          videoid: this.videoid
        })
        .then(data => {});
    },
    video() {
      vueHttp
        .videoinfo({
          device: 1,
          packageid: -1,
          videoid: this.videoid
        })
        .then(data => {
          let vo = data["data"];

          openShares(vo["title"], vo["preview"], vo["title"]);

          if (vo) {
            this.intro = vo["title"];
            this.id = vo["videoLeadingActor"]
              ? vo["videoLeadingActor"]["userId"]
              : "null";
            if (vo["url"] && vo["url"] != "") {
              this.stream = true;
              this.streamUrl = vo["url"];
            }
            this.zuozhe_avatar =
              vo["videoWriter"] && vo["videoWriter"]["avatar"];
            this.zuozhe_nickName =
              vo["videoWriter"] && vo["videoWriter"]["nickName"];
            this.zhubo_nickName = `录制于${vo["videoLeadingActor"] &&
              vo["videoLeadingActor"]["nickName"]}的直播间`;
            this.playSum = vo["playSum"];
            if (vo["videoLeadingActor"]) {
              this.isLive = vo["videoLeadingActor"]["isLive"];
            }
            this.domain = `http://star.longzhu.com/${
              vo["videoLeadingActor"]["domain"]
            }`;
            this.title = vo["title"];
            this.preview = vo["preview"];

            this.record();
          }
        });
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  },
  mounted() {
    this.videoid =
      this.getQueryString("videoid") || this.getQueryString("videoId");
    this.streamUrl = "";
    this.url = window.location.host;
    this.$nextTick(() => {
      this.play();
      this.video();
      this.live();
      topBarScroll(this.up, this.down);
    });
  }
};
</script>