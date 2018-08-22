<template>
<div>
  <button @click="clickFun">四月</button>
  <transition name='an-base-transition'>
    <p v-show="isshow">
      你是一树一树的花开，<br> 是燕在梁间呢喃。
      <br> 你是爱，
      <br> 是暖，
      <br> 是希望，<br> 你是人间的四月天。<br>
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
.an-base-transition-enter-active {
  transition: all .3s ease;
}

.an-base-transition-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.an-base-transition-enter,
.an-base-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
