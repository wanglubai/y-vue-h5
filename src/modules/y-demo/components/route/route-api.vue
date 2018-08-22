<template>
<div>
  route-api
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
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  },
  computed: {

  }
};
</script>

<style lang="css">

</style>
