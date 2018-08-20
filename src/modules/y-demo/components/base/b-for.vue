<template>
  <div>
    <p class="y-title">渲染数组</p>
    <p class="y-html">
      <pre>
<span class="tag">&lt;<span class="name">li</span> <span class="attr">v-for</span>=<span class="string">"item in Var_Array"</span>&gt;</span>
<span class="line">item</span>
<span class="line"><span class="tag">&lt;/<span class="name">li</span>&gt;</span></span>
        </pre>
    </p>
      <p class="y-html">
        <pre>
<span class="line"><span class="tag">&lt;<span class="name">li</span> <span class="attr">v-for</span>=<span class="string">"(item, index) in Var_Array"</span>&gt;</span></span>
<span class="line">item index</span>
<span class="line"><span class="tag">&lt;/<span class="name">li</span>&gt;</span></span>
        </pre>
      </p>
      <p class="y-title">渲染对象</p>
      <p class="y-html">
        <pre>
<span class="tag">&lt;<span class="name">li</span> <span class="attr">v-for</span>=<span class="string">"item in Var_Object"</span>&gt;</span>
<span class="line">item</span>
<span class="line"><span class="tag">&lt;/<span class="name">li</span>&gt;</span></span>
        </pre>
      </p>
      <p class="y-html">
        <pre>
<span class="tag">&lt;<span class="name">li</span> <span class="attr">v-for</span>=<span class="string">"(value, key) in Var_Object"</span>&gt;</span>
<span class="line">value key</span>
<span class="line"><span class="tag">&lt;/<span class="name">li</span>&gt;</span></span>
        </pre>
      </p>
      <p class="y-html">
        <pre>
<span class="tag">&lt;<span class="name">li</span> <span class="attr">v-for</span>=<span class="string">"(value, key, index) in Var_Object"</span>&gt;</span>
<span class="line">value key index</span>
<span class="line"><span class="tag">&lt;/<span class="name">li</span>&gt;</span></span>
        </pre>
      </p>
      <p class="y-title">变异方法</p>
      <p>以下变异方法支持刷新</p>
      <ul class="content">
        <li><code>push()</code></li>
        <li><code>pop()</code></li>
        <li><code>shift()</code></li>
        <li><code>unshift()</code></li>
        <li><code>splice()</code></li>
        <li><code>sort()</code></li>
        <li><code>reverse()</code></li>
      </ul>
      <p class="y-title">替换数组</p>
      <p>非变异方法，替换数组：<code>filter(),</code><code>concat(),</code><code>slice()...</code></p>
       <p class="y-html">
      <pre>
<span class="line">this.items = this.items.filter(<span class="function"><span class="keyword">function</span> (<span class="params">item</span>) </span>{</span>
<span class="line"><span class="keyword">return</span> item.message.match(<span class="regexp">/Foo/</span>)</span>
<span class="line">})</span>
      </pre>
      </p>

      <p class="y-title">注意事项</p>
      <p>
        Vue 不能检测以下变动的数组
        <p class="y-warn"> 1:设置索引-数值</p>
        <p class="y-warn"> 2:设置长度</p>
        解决方法
      </p>
      <p class="y-js">
        <pre>
<span class="line">Vue.set(vm.items, indexOfItem, newValue)</span>
<span>或</span>
<span class="line">vm.$set(vm.items, indexOfItem, newValue)</span>
        </pre>
      </p>
      <p class="y-js">
      <pre>
<span class="line">vm.items.splice(newLength)</span>
      </pre>
      </p>
      </p>
        <p>
        Vue 不能检测以下变动的对象
        <p class="y-warn"> 1:不能检测对象属性的添加或删除</p>
        解决方法
      </p>
         <p class="y-js">
        <pre>
<span class="line">Vue.set(vm.vo, <span class="string">'key'</span>, <span class="number">Var_Value</span>)</span>
<span>或</span>
<span class="line">vm.$set(vm.vo, <span class="string">'key'</span>, <span class="number">Var_Value</span>)</span>
        </pre>
           <p class="y-js">
        <pre>
<span class="line">vm.vo = <span class="built_in">Object</span>.assign({}, vm.vo, {</span>
<span class="line">  key1: <span >Var_Value</span>,</span>
<span class="line">  key2: <span >Var_Value</span></span>
<span class="line">})</span>
        </pre>
           </p>
      </p>
  </div>
</template>

<style>
.content {
  padding-left: 40px;
  line-height: 30px;
}
</style>


<script>
export default {
  data() {
    return {
      msg1: ""
    };
  },
  computed: {}
};
</script>