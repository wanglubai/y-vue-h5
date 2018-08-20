<template>
<div>
  <p class="y-title">插槽的默认内容</p>
  <p class="y-html">
    <pre>
    <span class="line"><span class="tag">&lt;<span class="name">slot</span>&gt;</span>.....<span class="tag">&lt;/<span class="name">slot</span>&gt;</span></span>
    </pre>
  </p>
  </p>
  <p class="y-title">具名插槽</p>
  <p class="y-html">
    <pre><span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">class</span>=<span class="string">"c1"</span>&gt;</span></span><br><span class="line">  <span class="tag">&lt;<span class="name">div</span>&gt;</span></span><br><span class="line">    <span class="tag">&lt;<span class="name">slot</span> <span class="attr">name</span>=<span class="string">"n1"</span>&gt;</span><span class="tag">&lt;/<span class="name">slot</span>&gt;</span></span><br><span class="line">  <span class="tag">&lt;/<span class="name">div</span>&gt;</span></span><br><span class="line">  <span class="tag">&lt;<span class="name">div</span>&gt;</span></span><br><span class="line">    <span class="tag">&lt;<span class="name">slot</span>&gt;</span><span class="tag">&lt;/<span class="name">slot</span>&gt;</span></span><br><span class="line">  <span class="tag">&lt;/<span class="name">div</span>&gt;</span></span><br><span class="line">  <span class="tag">&lt;<span class="name">div</span>&gt;</span></span><br><span class="line">    <span class="tag">&lt;<span class="name">slot</span> <span class="attr">name</span>=<span class="string">"n2"</span>&gt;</span><span class="tag">&lt;/<span class="name">slot</span>&gt;</span></span><br><span class="line">  <span class="tag">&lt;/<span class="name">div</span>&gt;</span></span><br><span class="line"><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span><br></pre>
  </p>
  <p class="y-html">
    <pre>
  <span class="line"><span class="tag">&lt;<span class="name">y-component</span>&gt;</span></span>
  <span class="line">  <span class="tag">&lt;<span class="name">p</span> <span class="attr">slot</span>=<span class="string">"n1"</span>&gt;</span>1<span class="tag">&lt;/<span class="name">p</span>&gt;</span></span><font class='comment'>//标签元素上</font>
  <span class="line">  <span class="tag">&lt;<span class="name">p</span>&gt;</span>2<span class="tag">&lt;/<span class="name">p</span>&gt;</span></span>
  <span class="line">  <span class="tag">&lt;<span class="name">p</span>&gt;</span>3<span class="tag">&lt;/<span class="name">p</span>&gt;</span></span>
  <span class="line">  <span class="tag">&lt;<span class="name">template</span> <span class="attr">slot</span>=<span class="string">"n2"</span>&gt;</span></span><font class='comment'>//template元素上</font>
  <span class="line">    <span class="tag">&lt;<span class="name">p</span>&gt;</span>4<span class="tag">&lt;/<span class="name">p</span>&gt;</span></span>
  <span class="line">  <span class="tag">&lt;/<span class="name">template</span>&gt;</span></span>
  <span class="tag">&lt;/<span class="name">y-component</span>&gt;</span>
  </pre>
  </p>

  <zcomslotname>
    <p slot='n3'>4</p>
    <template slot="n1">
      <p>1</p>
    </template>
    <p>2</p>
    <p>3</p>

  </zcomslotname>

  <p class="y-title">作用域</p>

</div>
</template>

<script>
import zcomslotname from "./z-com-slot-name";

export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    zcomslotname
  }
};
</script>
