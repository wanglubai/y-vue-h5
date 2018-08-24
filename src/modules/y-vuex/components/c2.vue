<template>
<div>
  <h2>c2</h2>
  <button @click='clickCall'>click</button>
  <div>{{count}}</div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    clickCall() {
      this.$store.commit('increment',10)
    }
  }
};
</script>
