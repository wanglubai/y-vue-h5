<template>
<div>
  <p>
    <router-link :to="{name:'c1',params:{id:123}}">c1</router-link>
    <router-link :to="{name:'c2'}">c2</router-link>
    <router-link :to="{name:'c3'}">c3</router-link>
  </p>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>