<template>
<div>
  <p class="y-title">data</p>
  <p>一个组件的<code>data</code> 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。</p>
  <p class="y-html">
    <pre>
<span class="line">data: <span class="function"><span class="keyword">function</span> (<span class="params"></span>) </span>{</span>
<span class="line">  <span class="keyword">return</span> {</span>
<span class="line">  }</span>
<span class="line">}</span>
        </pre>
  </p>

  <p class="y-title">node</p>
  <p>单个根元素，并且遵循原生<code>html</code>嵌套逻辑。</p>

  <p class="y-title">slot</p>
  <p class="y-title">node</p>
  <p>1.data必须是函数</p>
  <keep-alive>
    <component :is="temp_k" @click=clickFun></component>
  </keep-alive>
  <button @click=temp(1)>按钮1</button>
  <button @click=temp(2)>按钮2</button>
  <div>{{count}}</div>
</div>
</template>

<script>
import c1 from "./z-com-base-dmeo1";
import c2 from "./z-com-base-dmeo2";
import {
  mapState
} from "vuex";
export default {
  data() {
    return {
      counts: 11,
      bl: true,
      temp_k: "c1"
    };
  },
  methods: {
    fun() {
      console.log("1");
    },
    temp(e) {
      this.$store.commit("increment", {
        val: 10
      });
    },
    clickFun() {
      console.log("clickFun");
    }
  },
  // computed: {
  //   m(){
  //    return this.$store.state.count;
  //   }
  // },
  computed: mapState({
    count: function (state) {
      return this.$store.state.count;
    }
  }),
  components: {
    c1,
    c2
  }
};
</script>
