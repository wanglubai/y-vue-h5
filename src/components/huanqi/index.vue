<template>
  <div>
    <a class="report-rbi-click"
       v-if='huanqi'
       data-label="h5-huanqi"
       data-cate=""
       data-action="click"
       :href="hrefs"></a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      huanqi: false,
      roomid: window.roomId,
      hrefs:""
    }
  },
  methods: {
    getCookie(key) {
      var str = document.cookie;
      var arr = str.split('; ');
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == key) {
          return arr2[1];
        }
      }
      return '';
    },
    setCookie(key, value) {
      var d = new Date();
      d.setDate(d.getDate() + 1);
      document.cookie = key + '=' + value + '; expires=' + d+';path=/';
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(!!this.roomid){
        this.roomid=window.roomId;
        this.hrefs=`plulongzhulive://room/openwith?roomId=${this.roomid}&feed=1`
      }else{
        this.roomid=11111;
        this.hrefs="plulongzhulive://room/openwith?roomId=11111&feed=1&livestatus=1";
      }
      var ua = navigator.userAgent.toUpperCase();
      if(/(LONGZHU|TGA)/.test(ua)==false){
        let expirationVal = this.getCookie('expiration');
        let curtime = new Date().getTime();
        if (expirationVal == '') {
          this.setCookie('expiration', curtime);
          this.huanqi = true;
          window.location.href =`plulongzhulive://room/openwith?roomId=${this.roomid}&feed=1&livestatus=1`;
        } else {
          // if ((curtime - expirationVal) > 86400000) {
          if ((curtime - expirationVal) > 1000*60*30) {
            this.huanqi = true;
            this.setCookie('expiration', curtime);
            window.location.href = `plulongzhulive://room/openwith?roomId=${this.roomid}&feed=1&livestatus=1`;
          } else {
            this.huanqi = false;
          }
        }
      } else {
        this.huanqi = false;
      }
    })
  }
}
</script>

