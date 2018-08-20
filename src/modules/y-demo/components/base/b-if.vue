<template>
  <div>
    <p class="y-title">v-if</p>
    <p><code>v-if</code> 是一个指令，所以必须将它添加到一个元素上。如果v-if加在template上，最终的渲染结果将不包含 template 元素</p>
    <p class="y-html">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-if</span>=<span class="string">"type === 'A'"</span>&gt;</span></span>
<span class="line">  A</span>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-else-if</span>=<span class="string">"type === 'B'"</span>&gt;</span></span>
<span class="line">  B</span>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-else</span>&gt;</span></span>
<span class="line">  Not A/B</span>
<span class="line"><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>
    <p class="y-title">key</p>
    <p>
      Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
      这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 <code>key</code> 属性即可：
    </p>
        <p class="y-html">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-if</span>=<span class="string">"type === 'A'" key="keyA"</span>&gt;</span></span>
<span class="line">  A</span>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-else-if</span>=<span class="string">"type === 'B'" key="keyB"</span>&gt;</span></span>
<span class="line">  B</span>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-else key="keyC"</span>&gt;</span></span>
<span class="line">  Not A/B</span>
<span class="line"><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>
    <p class="y-title">v-show</p>
    <p>
      v-show 只是简单地切换元素的 CSS 属性 display。注意，v-show 不支持 <code>template</code> 元素，也不支持 <code>v-else</code>。
    </p>
       <p class="y-html">
   <pre><span class="line"><span class="tag">&lt;<span class="name">h1</span> <span class="attr">v-show</span>=<span class="string">"ok"</span>&gt;</span>Hello!<span class="tag">&lt;/<span class="name">h1</span>&gt;</span></span><br></pre>
       </p>
          <p  class="y-title">v-if vs v-show</p>
        <p><code>v-if</code> 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
<code>v-if</code> 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
相比之下，<code>v-show</code> 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
一般来说，<code>v-if</code> 有更高的切换开销，而 <code>v-show</code> 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 <code>v-show</code> 较好；如果在运行时条件很少改变，则使用 <code>v-if</code> 较好。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {}
};
</script>