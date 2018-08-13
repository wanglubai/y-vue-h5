<template>
  <div>
    <h2>class</h2>
    <p class="y-node">字符串绑定</p>
    <p class="y-html">
      {{msg1}}
    </p>
    <p class="y-node">对象绑定</p>
    <p>1.内联对象</p>
    <p class="y-html">
      {{msg2}}
    </p>
     <p>2.非内联对象</p>
    <p class="y-html">
      {{msg3}}<br>
      {{msg4}}
    </p>
    <p class="y-node">数组绑定</p>
    <p class="y-html" :class="[atr1,atr2,{'atr3':atr3v}]">
      {{msg5}}
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