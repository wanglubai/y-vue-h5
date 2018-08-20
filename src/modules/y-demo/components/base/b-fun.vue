<template>
  <div>
    <p class="y-title">data</p>
    <p>属性</p>
    <p class="y-title">methods</p>
    <p>方法</p>
    <p class="y-title">computed</p>
    <p>get</p>
    <p>更像是<code>data</code>下属性的<code>getter</code>，可同时关联多个属性。常用于通过多个原始数据获得组合数据。</p>
    <p class="y-title">watch</p>
    <p>set</p>
    <p>更像是<code>data</code>下某个属性的<code>setter</code>。常用于侦听这个属性改变，触发一些方法，比如某个数据改变->请求服务器。</p>
    <div class="b-fun-img"></div>
    <button @click="clickFun">点击</button>
    <div>data->{{count}}</div>
    <div>{{methodsCount()}}</div>
    <div>{{computedCount}}</div>
  </div>
</template>

<script>
import "../css/b-fun.css";

export default {
  data: function() {
    return {
      count: 0
    };
  },
  methods: {
    clickFun() {
      this.count++;
    },
    methodsCount(){
      return `methods->${this.count}`;
    }
  },
  watch: {
    count() {
      alert(`watch->change`);
    }
  },
  computed: {
    computedCount(){
      return `computed->${this.count}`;
    }
  }
};
</script>

