<template>
  <div>
    <h2>文本</h2>
    <p class="y-node">Mustache 语法</p>
    <p class="y-html">
      {{msg1}}
    </p>
    <p class="y-node">v-once 一次性插值</p>
    <p class="y-html">
      {{msg2}}
    </p>
    <p class="y-node">原始html</p>
    <p class="y-html">
      {{msg3}}
    </p>
    <h2>特性</h2>
    <p>Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用<code> v-bind</code> 指令</p>
    <p class="y-html">
      {{msg4}}
    </p>
    <p>js单个表达式</p>
    <p class="y-html">
      {{msg5}}<br> {{msg6}}
      <br> {{msg7}}
      <br>
    </p>
  
    <p>v-bind 缩写</p>
    <p class="y-html">
      {{msg8}}<br> {{msg9}}
    </p>
    <p>v-on 缩写</p>
    <p class="y-html">
      {{msg10}}<br> {{msg11}}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg1: "<span>{{ VAR }}</span>",
      msg2: "<span v-once>{{ VAR }}</span>",
      msg3: '<span v-html="VAR"></span>',
      msg4: '<div v-bind:id="VAR"></div>',
      msg5: "{{ VAR + 1 }}",
      msg6: "{{ VAR.split('').reverse().join('') }}",
      msg7: `<div v-bind:id="'list-' + VAR"></div>`,
      msg8: `<a v-bind:href="VAR">...</a>`,
      msg9: `<a :href="VAR">...</a>`,
      msg10: `<a v-on:click="FUN">...</a>`,
      msg11: `<a @click="FUN">...</a>`
    };
  },
  computed: {}
};
</script>