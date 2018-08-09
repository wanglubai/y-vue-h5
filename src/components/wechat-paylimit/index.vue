<template>
  <div>
    <ul class="flex recharge-ul">
      <li class="recharge-item flex-item" v-for="(item,key) in cashConfig" :class='{"recharge-item-current": currentItem == item.lb }'
        @click="chooseItem(item.lb)" :data-value="item.lb" data-action='click' :data-label="'cash-'+item.rmb" data-cate=''>
        <div class="recharge-item-virtual-coin"><em class="virtual-coin">{{item.lb}}</em><i class="i-unit"></i></div>
        <div class="recharge-item-coin"><em class="reality-coin">{{item.rmb}}</em>元</div>
        </li>
    </ul>
    <ul class="flex recharge-ul">
      <li class="recharge-item flex-item" v-for="(item,key) in cashConfig2" :class='{"recharge-item-current": currentItem == item.lb }'
        @click="chooseItem(item.lb)" :data-value="item.lb" data-action='click' :data-label="'cash-'+item.rmb" data-cate=''>
        <div class="recharge-item-virtual-coin"><em class="virtual-coin">{{item.lb}}</em><i class="i-unit"></i></div>
        <div class="recharge-item-coin"><em class="reality-coin">{{item.rmb}}</em>元</div>
        </li>
    </ul>
  </div>
</template>
<script>
  import _ from 'lodash';

  import "../../commons/css/reset.css";
  import "./css/index.css";

  export default {
    props: ["currentItem", "isEvent"],
    data() {
      return {
        cashConfig: [{
          lb: 1000,
          rmb: 10
        }, {
          lb: 5000,
          rmb: 50
        }, {
          lb: 20000,
          rmb: 200
        }],
        cashConfig2: [{
          lb: 50000,
          rmb: 500
        }, {
          lb: 200000,
          rmb: 2000
        }, {
          lb: 300000,
          rmb: 3000
        }]
      };
    },
    methods: {
      chooseItem(item) {
        if (this.isEvent != true) return;
        this.$emit("selectItem", item);
      }
    }
  }
</script>