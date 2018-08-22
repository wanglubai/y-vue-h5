<template>
<div>
  <p class="y-title">transition</p>
  <p>当插入或删除包含在 <code>transition</code> 组件中的元素时，<code>Vue</code> 将会做以下处理:</p>
  <p>1:是否有<code>css</code>钩子，有则执行</p>
  <p>2:是否有<code>js</code>钩子，有则执行</p>
  <p>3:都没有立即执行</p>

  <p class="y-title">css钩子</p>
  <ul>
    <li>name||v<code>-enter</code></li>
    <li>name||v<code>-enter-active</code></li>
    <li>name||v<code>-enter-to</code></li>
    <li>name||v<code>-leave</code></li>
    <li>name||v<code>-leave-active</code></li>
    <li>name||v<code>-leave-to</code></li>
  </ul>

  <p class="y-title">自定义css钩子</p>
  <ul>
    <li><code>enter-class</code></li>
    <li><code>enter-active-class</code></li>
    <li><code>enter-to-class</code> (2.1.8+)</li>
    <li><code>leave-class</code></li>
    <li><code>leave-active-class</code></li>
    <li><code>leave-to-class</code> (2.1.8+)</li>
  </ul>

  <div class="demo">
    <anbasetransition></anbasetransition>
  </div>
  <div class="demo">
    <anbaseanmation></anbaseanmation>
  </div>

  <p class="y-title">transition-group</p>
  <div class="demo">
    <anbaselist></anbaselist>
  </div>
</div>
</template>

<script>
import anbasetransition from "./an-base-transition";
import anbaseanmation from "./an-base-animation";
import anbaselist from "./an-base-list";
export default {
  data: function () {
    return {};
  },
  methods: {

  },
  watch: {

  },
  computed: {

  },
  components: {
    anbasetransition,
    anbaseanmation,
    anbaselist
  }
};
</script>

<style lang="css">
.ani {
  border: 1px solid #ff0000;
}
</style>
