<template>
<div>
  <h2>c1</h2>
  <button @click='clickCall'>click</button>
  <div>{{getconut}}</div>
</div>
</template>

<script>
import {
  mapState,mapGetters
} from 'vuex'

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'getconut'
    ])
  },
  methods: {
    clickCall() {
      this.$store.commit('increment',1)
    }
  }
};
</script>
