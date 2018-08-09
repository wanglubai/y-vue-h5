<template>
  <div class="dialog" :class="dtype">
    <div class="mask"></div>
    <div class="dialog-content">
      <div class="close-btn" @click="hideFn">

      </div>
      <div class="content-pane">
        <div class="info-title">
          {{title}}
        </div>
        <div class="info-message">
          {{message}}
        </div>
        <div class="enter-btn" @click="enterFn">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dtype", "message", "title"],
  data() {
    return {
    }
  },
  methods: {
    hideFn() {
      this.$emit("hide");
    },
    enterFn() {
      this.$emit("enterFn");
    }
  }
}
</script>

<style lang="css">
  .dialog {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    background-color: rgba(0,0, 0, 0.7);
  }
  .dialog-content {
    width: 327px;
    height: 215px;
    background-image: url(../images/small-dialog.png);
    background-position: center;
    background-repeat: no-repeat;
    z-index: 99;
    position: absolute;
    left: 50%;
    margin-left: -163px;
    top: 50%;
    margin-top: -107px;
  }
  .info-title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: absolute;
    top: 46px;
    left: 0;
    text-align: center;
    color: #f02b2b;
    font-size: 20px;
    font-weight: bold;
  }
  .info-message {
    color: #e3c058;
    font-size: 20px;
    text-align: center;
    position: absolute;
    width: 100%;
    height: auto;
    top: 96px;
  }
  .enter-btn {
    width: 128px;
    height: 33px;
    margin: 0 auto;
    margin-top: 160px;
    background-image: url(../images/dialog-btn.png);
    cursor: pointer;
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    margin: 11px 11px 0 0;
    cursor: pointer;
  }
</style>
