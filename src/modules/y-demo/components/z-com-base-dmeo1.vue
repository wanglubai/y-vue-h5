<template>
  <div>
    <a>{{count_}}</a>
    <button @click="count_++">按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count_: this.count
    };
  },
  methods: {
    countFun() {
      this.count_++;
    }
  },
  props: {
    count: {
      type: Number
    }
  },
  computed: {}
};
</script>