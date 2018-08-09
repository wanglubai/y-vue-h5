<template>
  <div class="turntable">
    <!--<div class="turntable" :style="{'background-image': !!globalbg ? `url(${globalbg})` : 'none'}">-->
    <div class="action-btn report-rbi-click" data-label="yzcm-chusai-choujiang" data-cate="" data-action="click" :class="{start: start}" @click="startHandle">
    </div>
    <div class="table" :class="{start: start}" :style="{transform: rotate2end, 'background-image': !!votebg ? `url(${votebg})` : 'none'}">
    </div>
    <!--<dialogpane dtype="small" v-on:hide="hideDialog" v-if="isShowDialog" :message="message" :title="title" v-on:enterFn="enterFn"></dialogpane>-->
  </div>
</template>

<script>
  // import dialogpane from "./components/dialog";
  export default {
    props: ["amount", "winnum", "votebg", "globalbg", "activeKey"],
    // components: {
    //   dialogpane
    // },
    data() {
      return {
        start: false,
        hasReturn: true,
        rotate2end: 0,
        prize: [0],
        base: 1,
        amount_: this.amount,
        isShowDialog: false,
        message: "",
        title: ''
      }
    },
    watch: {
      activeKey(val, oldVal) {
        this.begin(this.winnum);
      }
    },
    mounted() {
      this.$nextTick(() => {
        const area = 360 / this.amount_;
        _.times(this.amount_, index => {
          this.prize.push(this.prize[index] - area);
        });
      })
    },
    methods: {
      enterFn() {
        this.isShowDialog = false;
        this.startHandle();
      },
      // hideDialog() {
      //   this.isShowDialog = false;
      // },
      // showDialog() {
      //   this.message = '是否消费100龙币进行抽奖？';
      //   this.isShowDialog = true;

      // },
      result(i) {
        return _.nth(this.prize, i);
      },
      startHandle() {
        this.$emit("start-action");
      },
      begin(win) {
        if (this.hasReturn) {
          this.start = true;
          this.hasReturn = false;
          this.rotate2end = `rotate(${this.result(win)+(1800 * this.base)}deg)`;
          this.base++;
          setTimeout(() => {
            this.hasReturn = true;
            this.start = false;
            this.$emit("end-action")
          }, 4000)
        }
      }
    }
  }
</script>

<style>
  .turntable {
    width: 621px;
    height: 621px;
    margin: 0 auto;
    position: relative;
    /*background-image: url(./images/turntablebg.png);*/
    background-position: bottom;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .table {
    position: absolute;
    /*top: 20px;*/
    /*background-image: url(./images/turntable-info.png);*/
    width: 621px;
    height: 621px;
    z-index: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 621px 621px;
  }

  .table.start {
    transition: transform 4s;
  }

  .action-btn {
    width: 169px;
    height: 205px;
    top: 50%;
    left: 50%;
    margin-top: -102.5px;
    margin-left: -85px;
    line-height: 100px;
    text-align: center;
    position: absolute;
    z-index: 9;
    background-image: url(./images/center-btn-3.png);
    background-position: center;
    background-size: 169px 205px;
    background-repeat: no-repeat;
    /*transform: scale(0.8);*/
  }

  .action-btn.start {
    background-image: url(./images/center-btn-3.png);
  }

  @keyframes next-btn {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
</style>
