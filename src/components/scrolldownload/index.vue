<template>
  <a class="scroll-download" v-show="showDialog">
    <div class="scroll-item">
      <div class="scroll-dw-closebtn" @click="closeScroll" data-action='click' data-cate='' data-label='close-scroll-download'></div>
      <a  id="moblikn8" moblink-featured  @click="huanqiApp" style="display: flex;" data-action='click' data-cate='' data-label='scroll-download'>
        <div class="scroll-dw-logo"></div>
        <a class="scroll-dw-txt">
          <p class="scroll-dw-txt-title">龙珠直播</p>
          <p class="scroll-dw-txt-con">你想要的都在这里</p>
        </a>
      </a>
    </div>
    <div class="scroll-item">
      <a class="scroll-dw-btn" @click="huanqiApp" moblink-featured id="moblikn88" href="javascript:;" data-action='click' data-cate='' data-label='scroll-download'>下载</a>
    </div>
  </a>
</template>
<script>
import vueHttp from "../../commons/vueHttp";
import moment from 'moment';
import "../../commons/css/reset.css";
import "./css/index.css";
import huanqiAppDownLink from "../../commons/huanqiAppAll.js";
export default {
  props: ["isBottomShow"],
  data() {
    return {
      showDialog: true,
      closeBtn: true,
      moblink: '',
      params: null,
      startTime: '2017-05-01 00:00:00',
      pre: window['_GLOBAL_prefix_']
    }
  },
  methods: {
    huanqiApp(e) {
      huanqiAppDownLink.getDownloadLink(e.currentTarget.id);
    },
    handleScroll() {
      let scrolltop = document.body.scrollTop;
      let bodyHeight = document.body.clientHeight;
      let bodyClientHeight = document.documentElement.clientHeight;
      if (scrolltop >= bodyHeight - bodyClientHeight) {
        if (!this.isBottomShow) {
          this.showDialog = false;
        }
      } else {
        this.showDialog = true;
      }
    },
    closeScroll() {
      this.closeBtn = false;
      this.showDialog = false;
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!window['roomId']) {
        this.params = {
          type: '0'
        }
      } else {
        this.params = {
          type: '1',
          roomId: window['roomId']
        }
      }
      setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll);
      }, 500)
    })
  }
}
</script>