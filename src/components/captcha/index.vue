<template>
  <div id="captcha" class="captcha" style="width: 300px;"></div>
</template>

<script>
  import vueHttp from "../../commons/vueHttp";
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.$nextTick(() => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = () => {
          vueHttp.getCaptcha().then(data => {
            initGeetest({
              'gt': data['gt'],
              'challenge': data['challenge'],
              'product': 'float',
              'offline': !data['status']
            }, captchaObj => {
              captchaObj['appendTo']("#captcha");
              captchaObj['onSuccess'](() => {
                this.$emit('changeCaptcha');
              });
            });
          })
        }
        script.src = '//static.geetest.com/static/tools/gt.js';
        document.body.appendChild(script);
      })
    }
  }
</script>

<style>
  .captcha{
    margin: 30px auto auto;
  }
</style>
