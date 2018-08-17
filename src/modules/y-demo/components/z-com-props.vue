<template>
  <div>
      <p class="y-title">Init</p>
    <p class="y-html">
      <pre>
  <span class="line">props: [<span class="string">'key','key','key'</span>]</span>
      </pre>
    </p>

        <p class="y-js">
      <pre>
<span class="line">  props: {</span>
  <span class="line">  key: <span class="built_in">DataType</span>,</span>
  <span class="line">  key: <span class="built_in">DataType</span>,</span>
  <span class="line">  key: <span class="built_in">DataType</span></span>
  <span class="line">}</span>
      </pre>
    </p>

      <p class="y-js">
      <pre>
<span class="line">  props: {</span>
<span class="line">    key: <span class="built_in">DataType</span>,</span>
<span class="line">    key: [<span class="built_in">DataType</span>, <span class="built_in">DataType</span>],</span>
<span class="line">    key: {</span>
<span class="line">      type: <span class="built_in">DataType</span>,</span>
<span class="line">      required: <span class="literal">Var_Bleaoon</span>,<span class="comment"> //是否必填</span></span>
<span class="line">      <span class="keyword">default</span>: <span class="number">VAR</span><span class="comment"> //默认值</span></span>
<span class="line">    },</span>
<span class="line">    key: {</span>
<span class="line">      type: <span class="built_in">Object</span>,</span>
<span class="line">      <span class="keyword">default</span>: <span class="function"><span class="keyword">function</span> (<span class="params"></span>) </span>{</span><span class="comment"> //默认数组或对象</span>
<span class="line">        <span class="keyword">return</span> { <span class="attr">key</span>: <span class="string">VAR</span> }</span>
<span class="line">      }</span>
<span class="line">    },</span>
<span class="line">    key: {</span>
<span class="line">      validator: <span class="function"><span class="keyword">function</span> (<span class="params">value</span>) </span>{</span><span class="comment"> //自定义验证函数</span>
<span class="line">        <span class="keyword">return</span> [<span class="string">'success'</span>, <span class="string">'warning'</span>, <span class="string">'danger'</span>].indexOf(value) !== <span class="number">-1</span></span>
<span class="line">      }</span>     
<span class="line">     }</span>   
<span class="line">    }</span>   
<span class="line"> })</span>   
      </pre>
    </p>
<p class="y-title">DataType</p>
<ul>
<li><code>String</code></li>
<li><code>Number</code></li>
<li><code>Boolean</code></li>
<li><code>Array</code></li>
<li><code>Object</code></li>
<li><code>Date</code></li>
<li><code>Function</code></li>
<li><code>Symbol</code></li>
</ul>
<p class="y-title">单项数据流</p>
<p class="y-title">keep-alive</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count_: this.count
    };
  },
  methods: {
    countFun() {
      this.count_++;
    }
  },
  props: {
    count: {
      type: Number
    }
  },
  computed: {}
};
</script>