<template>
<div>
  <c1></c1>
  <c2></c2>
  <div>{{count}}</div>
</div>
</template>

<script>
import c1 from "./components/c1";
import c2 from "./components/c2";

export default {
  data() {
    return {};
  },
  components: {
    c1,
    c2
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>
