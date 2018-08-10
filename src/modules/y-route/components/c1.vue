<template>
  <div>c1{{$route.params.id}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$route.params.id;
    }
  }
};
</script>