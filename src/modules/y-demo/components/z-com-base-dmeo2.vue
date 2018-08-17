<template>
  <div>
    temp2
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  beforeCreate: function() {
    console.log("temp2-beforeCreate");
  },
  created: function() {
    console.log("temp2-created");
  },
  beforeMount: function() {
    console.log("temp2-beforeMount");
  },
  mounted: function() {
    console.log("temp2-mounted");
  },
  beforeUpdate: function() {
    console.log("temp2-beforeUpdate");
  },
  updated: function() {
    console.log("temp2-updated");
  },
  beforeDestroy: function() {
    console.log("temp2-beforeDestroy");
  },
  destroyed: function() {
    console.log("temp2-destroyed");
  }
};
</script>