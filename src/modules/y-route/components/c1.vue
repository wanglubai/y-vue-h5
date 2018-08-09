<template>
  <div>c1{{username}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$route.params.username;
    }
  }
};
</script>