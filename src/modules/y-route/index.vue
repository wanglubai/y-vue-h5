<template>
<div>
  <p>
    <router-link :to="{name:'c1',params:{c:123,m:22}}">c1</router-link>
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
  },
  beforeRouteUpdate(to, from, next) {
     console.log('beforRouteEnter')
  }
};
</script>
