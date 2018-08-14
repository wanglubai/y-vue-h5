<template>
  <div>
    <p class="y-title">事件监听处理</p>
    <p class="y-html">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-on:click</span>=<span class="string">"FUN"</span>&gt;</span>Greet<span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-on:click</span>=<span class="string">"FUN(param)"</span>&gt;</span>Greet<span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-on:click</span>=<span class="string">"FUN(param,$event)"</span>&gt;</span>Greet<span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
</pre>
    </p>

      <p class="y-title">事件修饰符</p>
      <p></p>
<ul>
<li><code>.stop</code></li>
<li><code>.prevent</code></li>
<li><code>.capture</code></li>
<li><code>.self</code> e.target是当前元素自身时触发处理函数</li>
<li><code>.once</code>  事件将只会触发一次,可用于自定义组件</li>
<li><code>.passive</code></li>
</ul>
    </p>

     <p class="y-title">按键修饰符</p>
<ul>
<li><code>.enter</code></li>
<li><code>.tab</code></li>
<li><code>.delete</code> (捕获“删除”和“退格”键)</li>
<li><code>.esc</code></li>
<li><code>.space</code></li>
<li><code>.up</code></li>
<li><code>.down</code></li>
<li><code>.left</code></li>
<li><code>.right</code></li>
</ul>
    </p>

       <p class="y-title">鼠标修饰符</p>
<ul>
<li><code>.left</code></li>
<li><code>.right</code></li>
<li><code>.middle</code></li>
</ul>
    </p>

     <p class="y-title">为什么在html监听事件</p>
     <p>1.模板容易定位,VideoModel和DOM完全解耦</p>
     <p>2.ViewModel销毁时，事件处理器自动回收</p>
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