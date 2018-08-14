<template>
  <div>
    <p class="y-title">data</p>
        <p class="y-html">
      <pre>
<span class="line">data: <span class="function"><span class="keyword">function</span> (<span class="params"></span>) </span>{</span>
<span class="line">  <span class="keyword">return</span> {</span>
<span class="line">  }</span>
<span class="line">}</span>
        </pre>
    </p>
    <p class="y-title">props</p>
    <p class="y-html">
      <pre>
<span class="line">  props: [<span class="string">'key','key','key'</span>]</span>
      </pre>
    </p>

    <p class="y-title">slot</p>

    <ccC v-bind:count='counts'></ccC>
     <zcombasedmeo2 v-if="bl"></zcombasedmeo2>
     <button v-on:click="bl=!bl">按钮</button>
  </div>
</template>

<script>
import ccC from "./z-com-base-dmeo1"
import zcombasedmeo2 from "./z-com-base-dmeo2.vue";

export default {
  data() {
    return {
      counts:1,
      bl:true
    };
  },
  computed: {},
  components:{
    ccC,
    zcombasedmeo2
  }
};
</script>