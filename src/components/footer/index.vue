<template>
  <div class="footer">
    <div class="footer-item-1"  :class="isClass">
      <a @click="huanqiApp" id="moblink11" moblink-featured class="footer-download" href="javascript:;" data-action='click' data-cate='' data-label='footer-download'>
        <i class="footer-download-icon"></i>
        <span class="footer-download-txt">下载APP</span>
      </a>
      <span class="footer-top" @click="goTop" data-action='click' data-cate='' data-label='footer-to-top'>
        <i class="footer-top-icon"></i>
        <span class="footer-top-txt">回到顶部</span>
      </span>
    </div>
    <div class="footer-item-2">
      <p>Copyright © 2007-2016 | 苏公网安备 32058502010105号</p>
      <p>太仓聚一堂网络科技有限公司 | 苏ICP备17043616号</p>
      <p >许可证号 苏网文(2017)9070-170号</p>
    </div>
  </div>
</template>
<script>
  import "./css/index.css";
  import huanqiAppDownLink from "../../commons/huanqiAppAll.js";
  export default {
    data() {
      return {
        pre: window['_GLOBAL_prefix_'],
        isClass: ''
      }
    },
    methods: {
      huanqiApp(e) {
        huanqiAppDownLink.getDownloadLink(e.currentTarget.id);
      },
      goTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },

      isHide () {
        let agent = navigator.userAgent.toUpperCase();
        if (agent.match(/TGA/i) != null || agent.match(/LONGZHU/i) != null) {
          this.isClass = 'hide-download'
        }
      }
    },
    mounted () {
      this.$nextTick(()=> {
        this.isHide();
      });
    }
  }
</script>