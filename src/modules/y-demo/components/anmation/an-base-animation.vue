<template>
<div>
  <button @click="clickFun">我爱你</button>
  <transition name='an-base-animation'>
    <p v-show="isshow">
      如果给你寄一本书，我不会寄给你诗歌
      <br>我要给你一本关于植物，关于庄稼的
      <br>告诉你稻子和稗子的区别
      <br>告诉你一棵稗子提心吊胆的
      <br>春天
    </p>
  </transition>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      isshow: false
    };
  },
  methods: {
    clickFun() {
      this.isshow = !this.isshow;
    }
  },
  watch: {

  },
  computed: {

  }
};
</script>

<style lang="css">
.an-base-animation-enter-active {
  animation: an-base-animation-in .5s;
}

.an-base-animation-leave-active {
  animation: an-base-animation-in .5s reverse;
}

@keyframes an-base-animation-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
