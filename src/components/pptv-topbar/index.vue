<template>
  <div class="pptvtop-bar"
       id="top-bar">
    <a class="pptvtop-bar-logo report-rbi-click"  data-action='click'
       data-cate=''
       data-label='pptvtopbar-logo'></a>
    <span class="pptvplay-jc"></span>
    <a :href="locationHref"
       class="pptvtop-bar-user report-rbi-click"
       data-action='click'
       data-cate=''
       data-label='pptvtopbar-login'
       >打开APP</a>
  </div>
</template>
<script>
import "../../commons/css/reset.css";
import openShares from '../../commons/openShares.js';
import "./css/index.css";
import vueHttp from "../../commons/vueHttp.js";
import _ from "lodash";


  export default {
    props: ["locationHref"],
    data() {
      return {
        userinfo: false,
        pre:window['_GLOBAL_prefix_']
      }
    },
    computed: {
      isUserLogin() {
        return _.result(this.userinfo, "uid") <= 0;
      }
    },
    mounted() {
      openShares('直播间-PPTVLive','http://r.plures.net/vue/04b35927d01/imagesbin/room-pptv/share-pptv.png');
      this.$nextTick(() => {
        vueHttp.getUserInfo({
          with: 8651
        }).then(data => {
          this.userinfo = data;
          this.$emit('getUserInfo', this.userinfo);
        })
      })
    }
}
</script>