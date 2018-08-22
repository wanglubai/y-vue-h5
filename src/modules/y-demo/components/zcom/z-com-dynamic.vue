<template>
<div>
  <p class="y-title">v-bind:is</p>
  <p><code>:is</code>可以切换不同组件实例,但会反复执行相应的钩子,创建新的实例。</p>
  <p class="y-html">
    <pre>
<span class="line"><span class="tag">&lt;<span class="name">component</span> <span class="attr">v-bind:is</span>=<span class="string">"curcomponent"</span>&gt;</span><span class="tag">&lt;/<span class="name">component</span>&gt;</span></span>
    </pre>
  </p>

  <p class="y-title">keep-alive</p>
  <p><code>:is</code> 用<code>keep-alive</code>标签包裹,保存状态，组件复用。</p>
  <p class="y-html">
    <pre>
<span class="tag">&lt;<span class="name">keep-alive</span>&gt;</span>
<span class="line"><span class="tag">&lt;<span class="name">component</span> <span class="attr">v-bind:is</span>=<span class="string">"curcomponent"</span>&gt;</span><span class="tag">&lt;/<span class="name">component</span>&gt;</span></span>
<span class="line"><span class="tag">&lt;/<span class="name">keep-alive</span>&gt;</span></span>
    </pre>
  </p>
<div class="demo">
  <button @click="clickFun(1)">com1</button>
  <button @click="clickFun(2)">com2</button>
  <component v-bind:is="curcom"></component>
  <keep-alive>
    <component v-bind:is="curkeepcom"></component>
  </keep-alive>
  </div>
</div>
</template>

<script>
import demo1 from "./z-com-dynamic-demo1";
import demo2 from "./z-com-dynamic-demo2";
export default {
  data() {
    return {
      curcom: '',
      curkeepcom: ''
    };
  },
  name: "z-com-dynamic",
  methods: {
    clickFun(i) {
      i == 1 ? this.curcom = demo1 : this.curcom = demo2;
      i == 1 ? this.curkeepcom = demo1 : this.curkeepcom = demo2;
    }
  },
  computed: {}
};
</script>
