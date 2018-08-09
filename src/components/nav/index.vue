<template>
  <nav class="top-nav">
    <a class="top-nav-item report-rbi-click" :href="`//${pre}m.longzhu.com/index`">
      <span class="top-nav-item-txt" :class="{'top-nav-item-txt-select':getUrl('index') }" data-action='click' data-cate='' data-label='tab-recommend'>推荐</span>
    </a>
    <a :href="`//${pre}m.longzhu.com/i/game`" class="top-nav-item">
      <span class="top-nav-item-txt" :class="{'top-nav-item-txt-select':getUrl('game') }" data-action='click' data-cate='' data-label='tab-game'>游戏</span>
    </a>
    <a :href="`//${pre}m.longzhu.com/i/play`" class="top-nav-item">
      <span class="top-nav-item-txt" :class="{'top-nav-item-txt-select':getUrl('play') }" data-action='click' data-cate='' data-label='tab-recreation'>娱乐</span>
    </a>
    <a :href="`//${pre}sports.longzhu.com/m`" class="top-nav-item">
      <span class="top-nav-item-txt" :class="{'top-nav-item-txt-select':getUrl('sports') }" data-action='click' data-cate='' data-label='tab-recreation'>体育</span>
    </a>
  </nav>
</template>
<script>
import "./css/index.css";
export default {
  data() {
    return {
      pre: window['_GLOBAL_prefix_']
    }
  },
  methods: {
    getUrl(urlitem) {
      return location.href.indexOf(urlitem) > -1;
    }
  }
}
</script>