<template>
<div>
  <p>
    <router-link to="/c1">c1</router-link>
    <router-link to="/c2">c2</router-link>
    <router-link to="/c3">c3</router-link>
  </p>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
};
</script>