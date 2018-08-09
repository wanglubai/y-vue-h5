<template>
  <div>
    <div class="videoplayer">
        <template v-if="!isPPTV">
             <div v-if="islive != 'broadcastEnd'">
                <div class="description" :class="{'suipai-bg':issuipaiType}">
                <div class="description-head clearfix" v-show="!isPlay">
                    <i class="img_title"></i>
                    <span class="description-head-title">{{roomstatus.title}}</span>
                </div>
                <div @click="playvideo"><img class="isbroadcast-img" v-show="!isPlay" :class="{'suipai':issuipaiType}" :src="roomstatus.cover"></div>
                <video v-if="islive != 'broadcastEnd'" ref="video" id="videos" v-show="isPlay" @click="stopvideo" :src="m3u8" class="video-div report-rbi-click"
                    :class="{'watchDirections':portrait}" @pause="videopause" webkit-playsinline playsinline autoplay data-label="h5-fangjian-bofang" data-cate=""
                    data-action="click"></video>
                    <a class="description-footer report-rbi-click" data-label="h5-xiazai-app" data-cate="" data-action="click" v-show="!isPlay" :href="dest_href">高清加速不会卡，安装聚力视频APP</a>
                </div>
                <div class="player" @click="playvideo" v-show="button_isPlay"></div>
            </div>
            <div v-if="(isnormalType==false && issuipaiType==false )||　islive == 'broadcastEnd'">
                <a class="report-rbi-click" data-label="h5-xiazai-app" data-cate="" data-action="click" :href="dest_href">
                <div class="description-bg ">
                    <div class="description-footer">
                    高清加速不会卡，安装聚力视频APP
                    </div>
                </div>
                </a>
                <a class="report-rbi-click noplayer" data-label="h5-xiazai-app" data-cate="" data-action="click" :href="dest_href">主播还在准备中</a>
            </div>
        </template>
        <template v-else>
            <div class="video-iframe">
                <iframe :src="m3u8" 
                allowtransparency="true" width="100%" height="100%" scrolling="no" frameborder="0" ></iframe>
            </div>
        </template>
      <div class="author-information clearfix">
        <div class="author-head"><img :src="roomstatus.logo" /></div>
        <div class="author-name-hot">
          <span>{{roomstatus.name}}</span>
          <div class="hotNum clearfix"><i></i><span> {{roomstatus.onlineCount}}</span></div>
        </div>
        <a class="report-rbi-click app-download" data-label="h5-xiazai-app" data-cate="" data-action="click" :href="dest_href"></a>
      </div>
    </div>
  </div>
</template>
<script>
  import vueHttp from "../../commons/vueHttp.js";
  import _ from "lodash";
  import "../../commons/css/reset.css";
  import "./css/videoplayer.css";
  export default {
    props: ["roomid", "islive"],
    data() {
      return {
        mask:false,
        pre: window['_GLOBAL_prefix_'],
        roomstatus: {},
        streamUrls:"",
        //获取多路流
        isPlay: true,
        broadcast: false,
        m3u8: "",
        // 判断是随拍还是其他
        gameType: "",
        // 判断是否是正常用户
        normalType: false,
        watchDirections: "",
        button_isPlay: false,
        pptv:"",
        path:"",
        dest_href:"",
        linkType:"",
        isPPTV:true,
        playGameId:0
      }
    },
    computed: {
      isnormalType() {
        return this.broadcast == false && this.gameType == "other";
      },
      issuipaiType() {
        return this.broadcast == false && this.gameType == "suipai";
      },
      // 竖屏
      portrait() {
        return this.watchDirections == "portrait";
      }
    },
    watch: {
      islive(val, oldVal) {
        if (val != oldVal && val == "broadcastStart ") this.getData();
      }
    },
    methods: {
      playvideo() {
        this.isPlay = true;
        this.button_isPlay = false;
        this.$refs.video.play();
      },
      stopvideo() {
        this.button_isPlay = true;
        this.$refs.video.pause();
      },
      videopause() {
        this.button_isPlay = true;
      },
      getLongZhuData(res) {
          this.playGameId=res.playGameId;
          this.watchDirections = res.watchDirections;
          let arr = [ 119, 127, 128, 129];
          if (res.streamUri == "") {
            this.broadcast = true;
            this.isPlay=true;
            this.button_isPlay=false;
          } else {
            this.isPlay=false;
            this.broadcast = false;
            this.button_isPlay=true;
             this.m3u8=res.streamUri;
            if (_.includes(arr, res.playGameId)) {
              this.gameType = "suipai";
            } else {
              this.gameType = "other";
            }  
          }
            this.pptv=`pptv://page/cate/yoyo/detail?id=${this.roomid}&userfrom=longzhu_html5&type=${this.playGameId}`;
            this.path= encodeURIComponent(this.pptv);
            this.dest_href= `http://applink.pptv.com/go2app.html?path=${this.path}`;
            this.$emit('destHref', this.dest_href);
      },
       getPPtvData(res) {
              let key_ = 'wap_154';
              let pptvcid=res.streamUri.split("=")[1];
              this.pptv=`pptv://page/isliving/detail?id=${this.roomid}&userfrom=longzhu_html5`;
              this.path= encodeURIComponent(this.pptv);
              this.m3u8=`http://pub.pptv.com/player/iframe/index.html#showList=0&id=${pptvcid}&ctx=wmode%3Dopaque%26subject%3D${key_}%26o%3D${key_}`;
              this.dest_href= `http://applink.pptv.com/go2app.html?path=${this.path}`;
              this.$emit('destHref', this.dest_href);
      }
    },
    mounted() {
      this.$nextTick(() => {
        vueHttp.getLiveUrl({
          roomId: this.roomid
        }).then((res) => {
          this.roomstatus = res;
          if(_.includes(res.streamUri,'pptvcid')){
            this.isPPTV=true;
             this.getPPtvData(res);
            }else{
              this.isPPTV=false;
             this.getLongZhuData(res);
            }     
        });     
      });
    }
  }
</script>