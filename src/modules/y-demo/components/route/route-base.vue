<template>
<div>
  route-base
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
      console.log(to);
    }
  },
  computed: {

  },
   beforeRouteUpdate (to, from, next) {
     console.log(to);
  }
};
</script>

<style lang="css">

</style>
