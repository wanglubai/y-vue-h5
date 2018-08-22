<template>
<div>
  {{namec}} {{str}} {{timeval}}
</div>
</template>

<script>
export default {
  data() {
    return {
      namec: 'demo2',
      timeval: 0,
      str: '',
    };
  },
  props: {},
  methods: {
    add() {
      this.timeval++;
    }
  },
  name: "z-com-dynamic-demo2",
  computed: {},
  beforeCreate: function () {
    //alert(`2-${this.namec} - beforeCreate`);
  },
  created: function () {
    this.str += '- created';
  },
  beforeMount: function () {
    this.str += '- beforeMount';
  },
  mounted: function () {
    this.str += '- mounted';
    setInterval(this.add, 1000);
  },
  beforeUpdate: function () {
    // this.str += '- beforeUpdate';
  },
  updated: function () {
    // this.str += '- updated';
  },
  beforeDestroy: function () {
    //alert(`2-${this.namec} - beforeDestroy`);
  },
  destroyed: function () {
    //alert(`2-${this.namec} - destroyed`);
  }
};
</script>
