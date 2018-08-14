<template>
    <i :class="classes" :style="styles" @click="clickFun"></i>
</template>

<script>
export default {
  name:'y-icon',
  props:{

  },
  computed:{

  },
  methods:{
    clickFun(e){
      this.$emit('click',e);
    }
  }
};
</script>