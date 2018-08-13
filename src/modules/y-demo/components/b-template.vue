<template>
  <div>
    <p class="y-title">Mustache 语法</p>
    <p class="y-html">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span>&gt;<span class="string" v-html="'{{ VAR }}'"></span></span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>

    <p class="y-title">v-once 一次性插值</p>
    <p class="y-html">
       <pre>
<span class="line"><span class="tag">&lt;<span class="name">div v-once</span><span class="string" v-html="'{{ VAR }}'"></span></span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>

    <p class="y-title">原始html</p>
    <p class="y-html">
       <pre>
<span class="line"><span class="tag">&lt;<span class="name">div v-bind:id=</span><span class="string">"VAR"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>

    <p>1.Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用<code> v-bind</code> 指令</p>
    <p class="y-html">
       <pre>
<span class="line"><span class="tag">&lt;<span class="name">div v-html=</span><span class="string">"VAR"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>

    <p>2.js单个表达式</p>
     <p class="y-html">
<pre>
{{msg1}}
{{msg2}}
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-bind:id</span>=<span class="string">"'list-' + VAR"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
</pre>
    </p>

    <p>3.v-bind 缩写</p>
     <p class="y-html">
<pre>
  <span class="attr">v-bind: 简写 :</span>
</pre></p>

   <p>4.v-on 缩写</p>
  <p class="y-html">
<pre>
  <span class="attr">v-on:  简写 @</span>
</pre></p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      msg1: "{{ VAR + 1 }}",
      msg2: "{{ VAR.split('').reverse().join('') }}"
    };
  },
  computed: {}
};
</script>