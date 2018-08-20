<template>
<div>

  <div class='c1'>
    <slot name="n1"></slot>
  </div>
  <div class='c2'>
    <slot></slot>
  </div>
  <div class='c3'>
    <slot name="n3"></slot>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {}
};
</script>
