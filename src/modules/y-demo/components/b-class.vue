<template>
  <div>
    <p class="y-title">字符串绑定</p>
    <p class="y-html">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-bind:class</span>=<span class="string">"Var_String"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>
    <p class="y-title">对象绑定</p>
    <p>1.内联对象</p>
    <p class="y-html">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-bind:class</span>=<span class="string">"{ Class_Name: Var_Boolean }"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>
     <p>2.非内联对象</p>
    <p class="y-html">
       <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-bind:class</span>=<span class="string">"Var_Obj"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>
       <p class="y-js">
      <pre>
<span class="line">Var_Obj={ Class_Name: Var_Boolean }</span>
      </pre>
    </p>
      <p class="y-title">数组绑定</p>
    <p class="y-html" :class="[atr1,atr2,{'atr3':atr3v}]">
      <pre>
<span class="line"><span class="tag">&lt;<span class="name">div</span> <span class="attr">v-bind:class</span>=<span class="string">"[{ Class_Name: Var_Boolean }, Var_Obj,Var_String]"</span>&gt;</span><span class="tag">&lt;/<span class="name">div</span>&gt;</span></span>
      </pre>
    </p>

  </div>
</template>


<script>
export default {
  data() {
    return {
      msg1: '<div v-bind:class="Var_String"></div>',
      msg2: '<div v-bind:class="{ Class_Name: Var_Boolean }"></div>',
      msg3: '<div v-bind:class="Var_Obj"></div>',
      msg4: "Var_Obj={ Class_Name: Var_Boolean }",
      msg5:
        '<div v-bind:class="[{ Class_Name: Var_Boolean },Var_Obj, Var_String]"></div>',
      atr1: { atr1: true },
      atr2: "atr2v",
      atr3v: true
    };
  },
  computed: {}
};
</script>