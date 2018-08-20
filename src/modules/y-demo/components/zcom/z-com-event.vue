<template>
<div>
  <p class="y-title">事件名</p>
  <p>推荐始终使用 <code>kebab-case</code> 的事件名</p>
  <p class="y-title">v-model</p>
  <p>默认会利用名为 <code>value</code> 的 <code>prop</code> 和名为 <code>input</code> 的事件,组件内用<code>model</code>变量可重写关键字。</p>

  <p class="y-html">
    <pre>
 <span class="line">  model: {</span>
 <span class="line">    prop: <span class="string">'VAR'</span>,</span>
 <span class="line">    event: <span class="string">'VAR'</span></span>
 <span class="line">  },</span>
      </pre>
  </p>

  <p>{{vmodelCall}}</p>
  <vmodel v-model='vmodel'></vmodel>
  <vmodel v-model='vmodel'></vmodel>
</div>
</template>

<script>
import vmodel from "./z-com-event-vmodel";

export default {
  data() {
    return {
      vmodel: 'init'
    };
  },
  methods: {},
  computed: {
    vmodelCall() {
      return `v-model - ${this.vmodel}`;
    }
  },
  components: {
    vmodel
  }
};
</script>
