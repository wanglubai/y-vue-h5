<template>
	<div class="lists">
		<div class="event">
			<router-link :to="getHerf" class="event-img report-rbi-click" data-label="H5-list-of-navigation" data-cate="" data-action="click"></router-link>
			<router-link :to="getHerf" class="event-title report-rbi-click" data-label="H5-list-of-navigation" data-cate="" data-action="click">{{title}}</router-link>
			<p><i>{{subTitle}}</i></p>
		</div>
		<div class="sport-list">
			<div class="sport-list-warp flex">
				<template v-for="n in sportList">
					<a :href="`//${pre}m.longzhu.com/${n.room.domain}`" class="defult-list-item report-rbi-click flex-item" :data-label="`H5-list-games`"
					   data-cate="" data-action="click">
						<span class="list-item-img">
            <img :src="n.room.snapshot" v-if="n.room.snapshot != ''" />
            <i class="list-item-img-info text-nowrap">{{n.room.title}}</i>
          </span>
						<span class="list-item-bottom">
              <span class="list-item-bot-name">{{n.user.username}}</span>
						<span class="list-item-bot-right">
                  <i class="list-item-hot-icon"></i>
                  <i class="list-item-hot-num">{{formatNum_(n.room.views)}}</i>
                </span>
						</span>
					</a>
				</template>
			</div>
			<div class="list-all">
				<div class="loading-more" @click="loadMoreSports_()" v-if="clickMore != '1'">请给我更多吧！</div>
				<div class="loading-none" v-if="clickMore == '1'">(´・ω・)ﾉ没有更多咯~</div>
			</div>
		</div>
	</div>
</template>
<script>
  import vueHttp from '../../commons/vueHttp.js';
  import _ from "lodash";
  import Vue from "vue";
  import "./css/list.css";
  import parser from 'ua-parser-js';
  export default {
    props:{
      rid: {
        type: String,
		default: 'lz_web_sport_home_streams_1st'
	  }
	},
    data() {
      return {
		sportList: [],
        busy: false,
        title: '',
        subTitle: '',
        clickMore: '',
        pre: window["_GLOBAL_prefix_"],
		pages: 30
      }
    },
    computed: {
      getHerf() {
        return '/m'
      },
    },
    methods:{
      formatNum_(num) {
        let text = parseInt(num);
        if (text > 10000) {
          text = (text / 10000).toFixed(1) + '万';
        }
        return text;
      },
	  loadMoreSports_() {
        if(this.busy == true) return;
        if(this.busy == false) {
          this.busy = true;

          vueHttp.listSportPages({
            rid: this.rid,
            startindex: this.sportList.length,
            maxresults: this.pages,
            device:6,
            packageId:1
          }).then(d => {
            if (!_.isEmpty(_.result(d, 'data.streams'))){
              this.sportList = _.concat(this.sportList, _.result(d, 'data.streams'));
            }
            if(_.isEmpty(_.result(d, 'data.streams')) || this.sportList.length % this.pages !=0){
              this.clickMore='1';
            }
            this.busy = false;
          })
        }
	  },
	  getTitle_(rid) {
        this.title = '全部体育';
		if(rid == 'lz_web_sport_home_streams_1st') {
          this.subTitle = '正在直播';
		} else if(rid == 'lz_web_sport_home_streams_2nd') {
		  this.subTitle = '体育游戏';
		} else if(rid == 'lz_web_sport_home_streams_3rd') {
		  this.subTitle = '足球达人'
		}
	  },
	  getData_(rid) {
        this.$nextTick(() => {
          this.getTitle_(rid);
          vueHttp.listSportPages({
            rid: this.rid,
            startindex: 0,
            maxresults: this.pages,
            device:6,
            packageId:1
          }).then(d => {
            this.sportList = d.data.streams;
            if( this.sportList.length < this.pages){
              this.clickMore='1';
            }
          });
        })
	  }
    },
    mounted() {
      this.$nextTick(()=> {
        this.getData_(this.rid);
	  });
    }
  }
</script>