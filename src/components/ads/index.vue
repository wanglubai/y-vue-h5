<template>
  <div>
    <a ref="anim"
       class="ads report-rbi-click report-rbi-static"
       :href="targetUrl"
       :data-label="`ad_type:${adsType},ad_id:${adsId}`"
       data-cate=""
       data-action="ad_expose"
       target="_blank"
       v-show="adshow">
      <img :src="materialUrl" />
      <div style="display:none;">
        <img :src="monitorCode" />
      </div>
    </a>
  </div>
</template>
<script>
import vueHttp from "../../commons/vueHttp.js";
import _ from "lodash";
import "../../commons/css/reset.css";
import "./css/ads.css";
import Vue from 'vue';
import moment from 'moment';
export default {
  props: ["roomid","adRes"],
  data() {
    return {
      item: {},
      adshow: false,
      timer: null,
      starttime: "",
      endtime: "",
      materialUrl: "",
      targetUrl: "",
      adsId: '',
      adsType: '',
      monitorCode: ""
    }
  },
  watch:{
    adRes(val, oldVal){
      if(val !=oldVal){
        this.showAd();
      }
    }
  },
  methods: {
    run() {
      if (!(moment().isBetween(moment(this.starttime), moment(this.endtime)))) {
        this.adshow = false;
        clearInterval(this.timer);
      }
    },
    showAd(){
       if(!!this.adRes){
        let res=this.adRes;
         if (res.code == 0) {
          var index = _.findIndex(res.data, function (char) {
            return char.platfrom == "M站" && char.type!=1 && char.type!=3;
          })
          if (index != -1) {
            var data = res.data[index];
            this.item = data;
            this.monitorCode = data.monitorCode;
            this.materialUrl = data.materialUrls[0];
            this.targetUrl = data.targetUrl;
            this.starttime = parseInt("" + data.startTime + "000");
            this.endtime = parseInt("" + data.endTime + "000");
            this.adsId = data.id;
            this.adsType = data.remarks;
            if (moment().isBetween(moment(this.starttime), moment(this.endtime))) {
              this.adshow = true;
              this.$nextTick(()=>{
                window['_mattock']('send', 'event', this.$refs.anim.getAttribute('data-cate'), this.$refs.anim.getAttribute('data-action'), this.$refs.anim.getAttribute('data-label'));
              })
            }
            this.timer = setInterval(() => {
              this.run();
            }, 1000)
          }
        } else {
          this.item = {};
        }
      }
    }
  }
}
</script>