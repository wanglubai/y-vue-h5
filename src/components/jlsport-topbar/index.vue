<template>
  <div class="jltop-bar" id="top-bar">
    <a class="jltop-bar-logo report-rbi-click" data-action='click' data-cate='' data-label='jltopbar-logo'></a>
    <div class="jlplay-jc">
      <span class="jl-font">下载聚力体育</span>
      <span class="jl-wcjc">中超亚冠全场次高清直播</span>
    </div>
    <a :href="locationHref" class="jltop-bar-user report-rbi-click" data-action='click' data-cate='' data-label='jltopbar-login'>立即下载</a>
  </div>
</template>
<script>
import "../../commons/css/reset.css";
import "./css/index.css";
import vueHttp from "../../commons/vueHttp.js";
import _ from "lodash";
export default {
  props: ["locationHref"],
  data() {
    return {
      userinfo: false,
      pre: window['_GLOBAL_prefix_']
    }
  },
  computed: {
    isUserLogin() {
      return _.result(this.userinfo, "uid") <= 0;
    }
  },
  mounted() {
    this.$nextTick(() => {
      vueHttp.getUserInfo({
        with: 8651
      }).then(data => {
        this.userinfo = data;
        this.avatar = data.avatar;
        this.$emit('getUserInfo', this.userinfo);
      })
    })
  }
}
</script>