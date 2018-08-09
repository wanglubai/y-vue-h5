<template>
  <div>
    <div class="replayBtn" v-show="openBoardcasting" @click="checkToBoardcastType"></div>
    <div class="videoplayer">
      <div v-if="isShowPic" class="tipian-pic">
        <img :src="tpPic">
      </div>
      <div ref="expo" v-if="isShowTp" class="tiepian report-rbi-static report-rbi-click" data-cate="" data-action="ad_expose" data-label="ad_tp" data-exposure="tpad_expose">
        <div v-show="showVoice" class="voice" :class="{'on-voice':isVoicePic}" @click="onoff"></div>
        <div class="time-cutdown clearfix">
          <span class="daoshu fl ">广告
            <i class="time time-num ">{{showTime}}</i>s
          </span>
          <i class="fl line"></i>
          <span v-if="isJump" class="report-rbi-click" data-label="h5-tipeian-jump" data-cate="" data-action="click" @click="JumpAds">
            跳过》
          </span>
          <span v-else class="fr jump " @click="canJump">
            <i class="time fl">{{leaveTime}}</i>s后可跳过
          </span>
        </div>
        <a class="more report-rbi-click" data-label="h5-tipeian-link" data-cate="" data-action="click" :href="more"></a>
        <div class="not-jump" v-if="canNotJump">您暂时无法跳过广告</div>
        <div class="ads-guanggao">广告</div>
      </div>
      <div v-if="islive != 'broadcastEnd'">
        <div class="description" :class="{'suipai-bg':issuipaiType}">
          <div class="description-head clearfix" v-if="!isPlay" v-show="!hiddenDownloadTips">
            <i class="img_title"></i>
            <span class="description-head-title">{{roomstatus.title}}</span>
          </div>
          <div @click="playvideo" class="report-rbi-click" data-label="play" data-cate="lz_player" data-action="click">
            <img class="isbroadcast-img" v-show="!isPlay" :class="{'suipai':issuipaiType}" :src="roomstatus.cover">
          </div>
          <div id="tengxun-media" v-if="noTx"></div>
          <video controls="controls" v-if="islive != 'broadcastEnd'" ref="video" id="videos" v-show="isPlay" :src="m3u8" class="video-div report-rbi-click" :class="{'watchDirections':portrait}" autoplay webkit-playsinline playsinline data-label="h5-fangjian-bofang" data-cate="" data-action="click"></video>
          <!--<a class="description-footer report-rbi-click" data-label="h5-dw-app" data-cate="" data-action="click" v-show="!hiddenDownloadTips && !isPlay" id="linkBtn0" @click="huanqiApp">高清加速不会卡，安装龙珠直播APP</a>-->
          <a class="description-footer report-rbi-click" data-label="h5-dw-app" data-cate="" data-action="click" v-show="!hiddenDownloadTips && !isPlay" id="linkBtn0">高清加速不会卡，安装龙珠直播APP</a>
        </div>
        <div class="player report-rbi-click" data-label="play" data-cate="lz_player" data-action="click" @click="playvideo" v-show="button_isPlay">
        </div>
        <div class="replay" v-show="replay">REPLAY</div>
        <div class="boardcastiong_replay" v-show="isBoardcastiongReplay">点击观看直播回放</div>
        <div class="canNotReplay" v-if="canNotReplay">{{canNotReplayText}}</div>
      </div>
      <div v-if="(isnormalType==false && issuipaiType==false )||　islive == 'broadcastEnd'">
        <div class="description-bg ">
          <a v-show="!hiddenDownloadTips" data-label="h5-dw-app" data-cate="" data-action="click" class="report-rbi-click description-footer" id="linkBtn3" href="javascript:;">
            高清加速不会卡，安装龙珠直播APP
          </a>
        </div>
        <a id="linkBtn4" class="report-rbi-click noplayer" data-label="h5-dw-app" data-cate="" data-action="click" href="javascript:;">主播还在准备中</a>
      </div>
    </div>
  </div>
</template>

<script>
import vueHttp from "../../commons/vueHttp.js";
import _ from "lodash";
import openShares from '../../commons/openShares';
import "./css/videoplayer.css";
import moblink from "../../commons/moblink.js";
import huanqiAppDownLink from "../../commons/huanqiAppAll.js";
export default {
  props: ["roomid", "islive", "hiddenDownloadTips", "adRes", "hostVideoId"],
  data() {
    return {
      mask: false,
      pre: window['_GLOBAL_prefix_'],
      roomstatus: {},
      streamUrls: "",
      //获取多路流
      isPlay: false,
      broadcast: false,
      streamUri: "",
      //m3u8是绑定数据的参数
      m3u8: "",
      //fl是获取的真正的流地址
      flv: "",
      // 判断是随拍还是其他
      gameType: "",
      // 判断是否是正常用户
      normalType: false,
      watchDirections: "",
      button_isPlay: false,
      replay: false,
      //控制贴片广告的声音图片
      isVoicePic: false,
      //控制体魄广告的静音
      noVoice: false,
      //读取贴片广告的视频地址
      materialUrls: "",
      isShowTp: false,
      //初始倒数计时的时间 广告贴片
      showTime: 30,
      totalTime: 0,
      timeCha: 0,
      timer: null,
      timer2: null,
      timer3: null,
      //判断是不是第一次读取贴片广告
      isfirst: 1,
      //广告贴片详情
      more: "javascript:;",
      //初始取消广告贴片的时间
      leaveTime: 5,
      isJump: false,
      canNotJump: false,
      isWeiXin: false,
      flag: false,
      tpPic: "",
      isShowPic: false,
      jianrong: false,
      showVoice: true,
      States: { PENDING: 0, LOADING: 1, LOADED: 2, READY: 3 },
      state: 1,
      txBroadcast: '',
      noTx: false,
      isAndroid: "",
      isBoardcastiongReplay: false,
      openBoardcasting: false,
      firstReplayType: 1,
      //腾讯的uid
      txStreamUriId: "",
      regStreamUri: false,
      canNotReplay: false,
      canNotReplayText: "您观看的回放视频已被封禁！"
      // isAndroid: " //a.app.qq.com/o/simple.jsp?pkgname=com.longzhu.tga"
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
      if (val != oldVal && val == "broadcastStart") {
        this.openBoardcasting = true;
        debugger
        this.getData();
      }else if(val != oldVal && val == "broadcastEnd"){
        this.openBoardcasting = false;
      }
    },
    hostVideoId(val) {
      let id = huanqiAppDownLink.getParam('videoId');
      if (val == id) {
        this.isPlay = false;
        this.canNotReplay = true;
        this.m3u8="";
      }
    },
    showTime(val) {
      this.timeCha = val;
      if (val == 0) {
        this.JumpAds(val);
        this.exposureData();
      }
    },
    adRes(val, oldVal) {
      if (val != oldVal) {
        this.getTiepian();
      }
    }
  },
  methods: {
    huanqiApp(e) {
      huanqiAppDownLink.getDownloadLink(!!e.currentTarget ? e.currentTarget.id : e.target.id);
    },
    exposureData() {
      let exposure = this.$refs.expo.getAttribute("data-exposure");
      if (exposure) {
        window['_mattock']('send', 'event', cate, action, label);
      }
    },
    //跳过广告
    JumpAds(time) {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      if (this.timeCha <= this.totalTime - 5 && this.timeCha > 0) {
        this.JumpAds_pic();
      } else {
        this.isShowPic = false;
        this.isShowTp = false;
        if (!!this.flag) {
          this.button_isPlay = true;
          this.isPlay = false;
        }
        this.$refs.video.controls = true;
        this.m3u8 = this.flv;
        this.$refs.video.play();
      }
    },
    JumpAds_pic() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      this.isShowPic = false;
      this.isShowTp = false;
      if (!!this.flag) {
        this.button_isPlay = false;
        this.isPlay = true;
      }
      this.$refs.video.controls = true;
      this.m3u8 = this.flv;
      this.$refs.video.play();
    },
    canJump() {
      if (this.leaveTime > 0) {
        this.canNotJump = true;
        setTimeout(() => {
          this.canNotJump = false;
        }, 1000)
      }
    },
    showLeaveTime() {
      this.timer2 = setInterval(() => {
        this.leaveTime--;
        if (this.leaveTime == 0) {
          this.isJump = true;
          clearInterval(this.timer2)
        }
      }, 1000)
    },
    //贴片广告倒数计时
    showTpTime() {
      this.timer = setInterval(() => {
        this.showTime--;
        if (this.showTime == 0) {
          clearInterval(this.timer);
        }
      }, 1000)
    },
    //贴片广告的声音开关
    onoff() {
      this.isVoicePic = !this.isVoicePic;
      this.noVoice = !this.noVoice;
      this.$refs.video.muted = this.noVoice;
    },
    changeHttps(logo) {
      return 'https' + logo.substring(4);
    },
    closeMask() {
      this.mask = false;
      this.$refs.video.style.display = 'block';
    },
    firstCanPlay() {
      this.$refs.video.removeEventListener('timeupdate', this.firstCanPlay);
      this.showTpTime();
      this.showLeaveTime();
      this.isShowTp = true;
      this.isfirst++;
    },
    //统计视频加载后上报
    statistics_start() {
      clearTimeout(this.timer3)
      window['_mattock']('send', 'event', 'lz_player', 'play_start', '');
      this.timer3 = setTimeout(() => {
        window['_mattock']('send', 'event', 'lz_player', 'valid_play', '');
      }, 1000 * 30);
      this.$refs.video.removeEventListener('timeupdate', this.statistics_start);
    },
    playvideo() {
      this.isBoardcastiongReplay = false;
      this.isPlay = true;
      this.button_isPlay = false;
      this.replay = false;
      // Bus.$emit('showLandscape', this.showLandscape);
      this.playTpVideo();
    },
    //处理贴片广告的视频
    playTpVideo() {
      if (!!this.materialUrls && this.isfirst == 1 && this.isWeiXin == false && this.flag == false) {
        this.m3u8 = this.materialUrls;
        this.$refs.video.play();
        this.$refs.video.controls = false;
        this.$refs.video.addEventListener('timeupdate', this.firstCanPlay, false);
      } else if (!!this.materialUrls && this.isfirst == 1 && this.flag == true) {
        this.showVoice = false;
        this.isShowPic = true;
        this.isPlay = false;
        this.isShowTp = true;
        this.showTpTime();
        this.showLeaveTime();
        this.tpPic = this.materialUrls;
        this.isfirst++;
      } else {
        this.$refs.video.play();
      }
      this.$refs.video.addEventListener('timeupdate', this.statistics_start, false);
    },
    xunhuan() {
      let timeSeconds = 1000 * 60 * 3;
      if (!!this.regStreamUri) timeSeconds = 0;
      let timer = setTimeout(() => {
        if (this.hiddenDownloadTips) {
          this.mask = false;
          return;
        }
        this.mask = true;
        this.$refs.video.style.display = 'none';
        if (this.regStreamUri == false) this.xunhuan();
      }, timeSeconds);
    },
    //随拍回放
    getLiveReplay(arr, playGameId) {
      let that = this;
      vueHttp.liveReplay({
        roomId: this.roomid
      }).then((res) => {
        this.roomstatus = res;
        this.roomstatus.name = res.userName;
        this.roomstatus.logo = res.userAvatar;
        if (!!res.playUrl && _.includes(arr, playGameId)) {
          this.isPlay = false;
          this.broadcast = false;
          this.button_isPlay = true;
          this.m3u8 = res.playUrl;
          this.gameType = "suipai";
          this.replay = true;
          this.$refs.video.addEventListener('ended', function() {
            that.$refs.video.currentTime = 0.1;
            that.$refs.video.play();
          }, false)
        } else {
          this.broadcast = true;
          this.isPlay = true;
          this.button_isPlay = false;
          this.replay = false;
        }
        if (res.playUrl && _.includes(arr, playGameId)) {
          this.xunhuan();
        }
      })
    },
    checkToBoardcastType() {
      let txLinkHref = location.href.replace('type=playback', '');
      if (!!this.txStreamUriId) {
        location.href = txLinkHref;
      } else if (!!this.streamUri) {
        if (!!this.canNotReplay) {
          location.href = txLinkHref;
        } else {
          this.playvideo();
          this.m3u8 = this.streamUri;
        }
      }
      this.openBoardcasting = false;
    },
    //获取链接里回放状态
    getReplayType() {
      let arr = [119, 127, 128, 129];
      let videoId = huanqiAppDownLink.getParam('videoId');
      vueHttp.GetReplayForDisplay({
        videoId: videoId
      }).then((res) => {
        if (res == null) {
          this.canNotReplayText = "您观看的回放视频已被删除!";
          this.canNotReplay = true;
        }
        if (res.replayVideoStatus == 2) {
          this.canNotReplay = true;
        }
        this.isBoardcastiongReplay = true;
        this.isPlay = false;
        this.broadcast = false;
        this.button_isPlay = true;
        this.m3u8 = res.videoUrl;
        this.roomstatus.title = res.title;
        if (_.includes(arr, res.gameId)) {
          this.gameType = "suipai";
        } else {
          this.gameType = "other";
        }
      })
    },
    changeToTxStreams(cover) {
      // 切换到腾讯流
      this.noTx = true;
      let head = document.querySelector("head");
      let txScript = document.createElement("script");
      txScript.setAttribute('src', "//imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2.js");
      txScript.onload = () => {
        this.setVqqLive(this.txStreamUriId, cover)
      }
      head.appendChild(txScript);
    },
    getData() {
      vueHttp.getLiveUrl({
        roomId: this.roomid
      }).then((res) => {
        this.roomstatus = res;
        this.streamUri = res.streamUri;
        this.regStreamUri = (/\_sy/g).test(res.streamUri);
        openShares(
          this.roomstatus.title ? this.roomstatus.title : '精彩直播尽在最娱乐的龙珠直播',
          this.roomstatus.logo ? this.roomstatus.logo : 'http://r.plures.net/images/share/icon_shareWX.jpg',
          '龙珠直播提供高清、流畅的视频、活动、赛事直播服务，不仅包含英雄联盟lol直播，穿越火线直播，DNF直播等游戏直播，更有大型活动直播、演唱会直播、美女直播，内容丰富，精彩直播尽在最娱乐的龙珠直播',
          location.href
        );
        let replayType = huanqiAppDownLink.getParam('type');
        this.watchDirections = res.watchDirections;
        let arr = [119, 127, 128, 129];
        //判赛事断腾讯流
        if (res && res.broadcast && res.broadcast.html) {
          this.txStreamUriId = this.parseVqqVid(res.broadcast.html);
        }
        if (replayType == "playback" && (!!this.txStreamUriId || this.streamUri != "")) this.openBoardcasting = true
        if (replayType == "playback" && this.firstReplayType == 1) {
          this.getReplayType();
          this.firstReplayType++;
        } else if (!!this.txStreamUriId) {
          this.changeToTxStreams(res.cover);
        } else if (this.streamUri != "") {
          this.isPlay = false;
          this.broadcast = false;
          this.button_isPlay = true;
          this.m3u8 = this.streamUri;
          this.flv = this.streamUri;
          if (_.includes(arr, res.playGameId)) {
            this.gameType = "suipai";
          } else {
            this.gameType = "other";
          }
        } else {
          this.getLiveReplay(arr, res.playGameId)
        }
        if (this.streamUri) {
          this.xunhuan();
        }
      });
    },
    //获取贴片广告的数据
    getTiepian() {
      if (!!this.adRes) {
        let res = this.adRes;
        let num = res.data.length;
        if (num > 0) {
          let index = _.findIndex(res.data, function(char) {
            return char.platfrom == "M站" && char.type == 1;
          })
          let data = res.data[index];
          if (index != -1) {
            this.materialUrls = data.materialUrls[0];
            //检查是否是图片还是视频
            this.checkFileExt(this.materialUrls)
            if (data.videoSound == 1) {
              this.noVoice = false;
              this.isVoicePic = false;
            } else {
              this.noVoice = true;
              this.isVoicePic = true;
            }
            this.showTime = data.showTime;
            this.totalTime = data.showTime;
            this.timeCha = this.showTime - 5;
            if (!!data.targetUrl) this.more = data.targetUrl;
            if (this.flag == true) this.playvideo();
          }
        }
      }
    },
    checkFileExt(filename) {
      let arr = ["jpg", "gif"];
      let index = filename.lastIndexOf(".");
      let ext = filename.substr(index + 1);
      //循环比较
      for (var i = 0; i < arr.length; i++) {
        if (ext == arr[i]) {
          this.flag = true; //一旦找到合适的，立即退出循环
          break;
        }
      }
    },
    setState(state) {
      this.state = state;
    },
    parseVqqVid(str) {
      let match = str.match(/\.qq\.com\/.*cnlid=([^&]*)/);
      return match && match[1];
    },
    setVqqLive(channelId, opt_thumb) {
      let opt_thumb2 = opt_thumb;
      let that = this;
      this.setState(this.States.LOADING);
      if (this.state == this.States.LOADING.READY) return;
      if (this.state == this.States.LOADING.LOADED) return;
      if (this.state == this.States.LOADING.PENDING) return;
      this.setState(this.States.LOADED);
      let tvp = window['tvp'];
      if (!tvp) return;
      let model = new tvp['VideoInfo']();
      model['setChannelId'](channelId + '');
      let player = new tvp['Player']();
      if (!player || !player['create']) return;
      player['create']({
        'type': 1,
        'video': model,
        'width': '100%',
        'height': '100%',
        'modId': 'tengxun-media',
        'player': 'html5',
        'pic': opt_thumb2,
        'oninited': () => {
          if (that.state == that.States.LOADING.PENDING) {
            // that.cleanRoot_();
          } else {
            that.setState(that.States.LOADING.READY);
          }
        }
      });
      document.querySelector('#tengxun-media').addEventListener('click', (e) => {
        const target = e.target
        if (target.classList.contains('tvp_button_play')) {
          this.$nextTick(() => {
            this.isPlay = true;
            this.broadcast = true;
          })
        }
      })
    },
    getmoblink() {
      var params = this.params;
      let utm_sr = huanqiAppDownLink.getParam('utm_sr');
      //15cf82cb4ab  cfm
      //71aa95838f1f3a  cfm
      //45b9be32f6b  百度聚合
      if (utm_sr != "15cf82cb4ab" && utm_sr != "71aa95838f1f3a" && utm_sr != "45b9be32f6b") {
        huanqiAppDownLink.setMoblink('linkBtn0');       //高清加速不会卡，下载按钮
        huanqiAppDownLink.setMoblink('linkBtn3');       //高清加速不会卡，回放时下载按钮
      }
    }
  },
  mounted() {
    moblink();
    this.getmoblink();
    this.$nextTick(() => {
      this.getData();
      if (navigator.userAgent.toUpperCase().match(/MICROMESSENGER/) != null) {
        this.isWeiXin = true;
      }
      this.setVqqLive();
    });
  }
}
</script>