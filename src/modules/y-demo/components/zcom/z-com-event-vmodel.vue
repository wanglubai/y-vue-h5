<template>
<div>
  {{getnum}}
  <button @click="chengFun">change</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: Math.random()
    };
  },
  model: {
    prop: "nums",
    event: "numschange"
  },
  methods: {
    chengFun() {
      this.$emit("numschange", "change");
    }
  },
  name: "z-com-event-vmodel",
  props: ["nums"],
  computed: {
    getnum() {
      return `${this.name} - ${this.nums}`;
    }
  }
};
</script>
