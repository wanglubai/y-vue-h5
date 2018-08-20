<template>
  <div>
    temp1
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
 beforeCreate: function() {
    console.log("temp1-beforeCreate");
  },
  created: function() {
    console.log("temp1-created");
  },
  beforeMount: function() {
    console.log("temp1-beforeMount");
  },
  mounted: function() {
    console.log("temp1-mounted");
  },
  beforeUpdate: function() {
    console.log("temp1-beforeUpdate");
  },
  updated: function() {
    console.log("temp1-updated");
  },
  beforeDestroy: function() {
    console.log("temp1-beforeDestroy");
  },
  destroyed: function() {
    console.log("temp1-destroyed");
  }
};
</script>