<template>
	<div class="lists" :class="{newLiveClass: type=='4'}">
		<topbar></topbar>
		<template v-if="type!= '4'">
			<div class="event">
				<a :href="getHerf" class="event-img report-rbi-click" data-label="H5-list-of-navigation" data-cate="" data-action="click"></a>
				<a :href="getHerf" class="event-title report-rbi-click" data-label="H5-list-of-navigation" data-cate="" data-action="click">{{title}}</a>
				<p v-if="type != '1'"><i>{{subTitle}}</i></p>
			</div>
		</template>
		<template v-if="type== '4'">
			<div class="event">
				<a :href="getHerf" class="event-img event-img-live report-rbi-click" data-label="H5-list-of-navigation" data-cate="" data-action="click"></a>
				<a :href="getHerf" class="event-title report-rbi-click" data-label="H5-list-of-navigation" data-cate="" data-action="click">{{title}}</a>
			</div>
		</template>

		<div class="home-list">
			<div class="home-list-warp flex" :class="{newClass: type=='4'}">
				<template v-for="n in listAll" v-if="type == '1'">
					<a :href="`//${pre}m.longzhu.com/${n.domain}`" class="defult-list-item report-rbi-click flex-item" data-label="H5-list-all"
						data-cate="" data-action="click">
						<span class="list-item-img">
            <img :src="n.avtar" />
            <i class="list-item-img-info text-nowrap">{{n.tags}}</i>
          </span>
						<span class="list-item-bottom">
            <span class="list-item-bot-name">{{n.name}}</span>
						<span class="list-item-bot-right">
            <i class="list-item-hot-icon"></i>
            <i class="list-item-hot-num">{{formatNum_(n.matchid)}}</i>
          </span>
						</span>
						<div class="list-item-hot-live" v-if="n.process != '已结束'"></div>
					</a>
				</template>

				<template v-for="n in generalList" v-if="type == '2'">
					<template v-if="suipai > '-1'">
						<a :href="`//${pre}m.longzhu.com/${n.room.domain}`" class="defult-list-item entertainment report-rbi-click flex-item" :data-label="`H5-list-games-${gameName}`"
							data-cate="" data-action="click">
							<span class="list-item-img entertainment-img">
                <img :src="n.covers.square" v-if="n.covers.square != ''" />
                <img :src="n.snapshot" v-if="n.covers.square == ''" />
                <i class="list-item-img-info text-nowrap">{{n.room.title}}</i>
              </span>
							<span class="list-item-bottom">
                <span class="list-item-bot-name">{{n.user.name}}</span>
							<span class="list-item-bot-right">
                    <i class="list-item-hot-icon"></i>
                    <i class="list-item-hot-num">{{formatNum_(n.viewers)}}</i>
                  </span>
							</span>
						</a>
					</template>
					<template v-else>
						<a :href="`//${pre}m.longzhu.com/${n.room.domain}`" class="defult-list-item report-rbi-click flex-item" :data-label="`H5-list-entertainment-${gameName}`"
							data-cate="" data-action="click">
							<span class="list-item-img">
              <img :src="n.covers.rectangle" v-if="n.covers.rectangle != ''" />
              <img :src="n.snapshot" v-if="n.covers.rectangle == ''" />
              <i class="list-item-img-info text-nowrap">{{n.room.title}}</i>
            </span>
							<span class="list-item-bottom">
              <span class="list-item-bot-name">{{n.user.name}}</span>
							<span class="list-item-bot-right">
              <i class="list-item-hot-icon"></i>
              <i class="list-item-hot-num">{{formatNum_(n.viewers)}}</i>
            </span>
							</span>
						</a>
					</template>
				</template>

				<template v-for="n in generalList" v-if="type == '3'">
					<a :href="`//${pre}m.longzhu.com/${n.room.domain}`" class="defult-list-item report-rbi-click flex-item" :data-label="`H5-list-games-${gameName}`"
						data-cate="" data-action="click">
						<span class="list-item-img">
            <img :src="n.covers.rectangle" v-if="n.covers.rectangle != ''" />
            <img :src="n.snapshot" v-if="n.covers.rectangle == ''" />
            <i class="list-item-img-info text-nowrap">{{n.room.title}}</i>
          </span>
						<span class="list-item-bottom">
              <span class="list-item-bot-name">{{n.user.name}}</span>
						<span class="list-item-bot-right">
                  <i class="list-item-hot-icon"></i>
                  <i class="list-item-hot-num">{{formatNum_(n.viewers)}}</i>
                </span>
						</span>
					</a>
				</template>
			</div>
      	<template v-if="type == '4'">
          <div class="ulStyle">
            <ul ref='oU1' class="ulClass1">
            </ul>
            <ul ref='oU2' class="ulClass2">
            </ul>
          </div>
				</template>
			<template>
				<div class="list-all" v-if="type != '1'">
					<div class="loading-more" @click="loadMore()" v-if="clickMore != '1'">请给我更多吧！</div>
					<div class="loading-none" v-if="clickMore == '1'">(´・ω・)ﾉ没有更多咯~</div>
				</div>
			</template>

			<template>
				<div class="list-all" v-if="type == '1'">
					<div class="loading-more" @click="loadMoreEvents()" v-if="clickMore != '1'">请给我更多吧！</div>
					<div class="loading-none" v-if="clickMore == '1'">(´・ω・)ﾉ没有更多咯~</div>
				</div>
			</template>
		</div>
		<foot></foot>
		<scrolldownload></scrolldownload>
	</div>
</template>
<script>
  import scrolldownload from "../scrolldownload/index.vue";
  import topbar from "../topbar/index.vue";
  import foot from "../footer/index.vue";
  import vueHttp from '../../commons/vueHttp.js';
  import _ from "lodash";
  import Vue from "vue";
  import "./css/list.css";
  import parser from 'ua-parser-js';
  export default {
    props: ["type"],
    data() {
      return {
        generalList: [],
        listAll: [],
        busy: false,
        title: '',
        subTitle: '',
        gameName: '',
        clickMore: '',
        pre: window["_GLOBAL_prefix_"],
        states: window['__states__'],
        suipai:'',
        data:[]
      }
    },
    computed: {
      getHerf() {
        switch(this.type){
          case "1": return `//${this.pre}m.longzhu.com/i/matches`;
          case "2": return `//${this.pre}m.longzhu.com/i/play`;
          case "3": return `//${this.pre}m.longzhu.com/i/game`;
          case "4": return `//${this.pre}m.longzhu.com/i/all`;
        }
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
      show(data){
        let oU=document.getElementsByTagName('ul');
	      let arroU=[];
        let that=this;
        let oULeft = this.$refs.oU1;
        let oURight = this.$refs.oU2;
          _.forEach(data, function (n) {
          let viewers=that.formatNum_(n.viewers);
          let id=n.game.id;
          let oLi=document.createElement('li');
          let big=""
          if([ '119', '127', '128', '129'].indexOf(id) > -1) big='big'
          oLi.innerHTML =`<a href='//${that.pre}m.longzhu.com/${n.room.domain}' data-label="H5-list-${n.room.domain}" 
          data-cate="" class="moren ${big}" data-action="click">
                <span class="list-item-img2">
                  ${n.covers.rectangle == "" ? `<img src="${n.snapshot}"/>` : big != "" ?`<img src="${n.covers.square}" />` : `<img src="${n.covers.rectangle}" />`}
                  <i class="list-item-img-info text-nowrap">${n.room.title}</i>
                </span>
                </a> 
                <span class="list-item-bottom">
                  <span class="list-item-bot-name">${n.user.name}</span>
                  <span class="list-item-bot-right">
                  <i class="list-item-hot-icon"></i>
                  <i class="list-item-hot-num">${viewers}</i>
                  </span>
                </span>
              `;
          if(oULeft.offsetHeight - oURight.offsetHeight <= 0) {
           oULeft.appendChild(oLi); 
        }else {
            oURight.appendChild(oLi);
         }
        })   
      },
      loadMore(){
        let oU=document.getElementsByTagName('ul');
	      let arroU=[];
        let arr = [ "119", "127", "128", '129'];
        if(this.busy == true) return;
        if(this.busy == false) {
          this.busy = true;
          vueHttp.listPages({
            game: this.gameName,
            tag: this.subTitle,
            device:6,
            // version:'4.0.0',
            packageId:1,
            "sort-by":'views',
            "start-index": this.generalList.length,
            "max-result": 30
          }).then(d => {
            if (!_.isEmpty(_.result(d, 'data.items[0].streams'))){
              this.generalList = _.concat(this.generalList, _.result(d, 'data.items[0].streams'));
            }
            if(_.isEmpty(_.result(d, 'data.items[0].streams'))){
              this.clickMore='1';
            }
            if( d.data.items[0].rooms <=this.generalList.length ){
              this.clickMore='1';
            }
            this.busy = false;

          if( this.type==4 ){
            this.show(d.data.items[0].streams);
          }
        })
      }
      },
      loadMoreEvents(){
        if(this.busy == true) return;
        if(this.busy == false) {
          this.busy = true;
          vueHttp.listOfEvents({
            device:6,
            version:'4.0.0',
            packageId:1,
            "start-index": this.listAll.length,
            "max-results": 30
          }).then(d => {
            if (!_.isEmpty(_.result(d, 'data.items'))){
              this.listAll = _.concat(this.listAll, _.result(d, 'data.items')
              );
            }
            if(_.isEmpty(_.result(d, 'data.items'))){
              this.clickMore='1';
            }
            if(d.data.totalItems <= this.listAll.length){
              this.clickMore='1';
            }
            this.busy = false;
          })
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        switch (this.type) {
          case "1":
            this.title = "全部赛事";
            break;
          case "2":
            this.title = "全部娱乐";
            break;
          case "3":
            this.title = "全部游戏";
            break;
            case "4":
            this.title = "全部直播";
            break;
        }

        const queryString = require('query-string');
        const parsed = queryString.parse(location.search);
        //this.subTitle = decodeURIComponent(parsed.listTagName);
        //this.gameName = parsed.gameId;

        if(this.type == 2 || this.type == 3){
          this.subTitle= decodeURIComponent(this.states.listTagName);
          this.gameName=this.states.gameid;
          document.title = this.subTitle +'直播_龙珠直播';
        }
        let arr = [ "119", "127", "128", '129'];

        this.suipai = arr.indexOf(this.gameName);
        vueHttp.listPages({
          game: this.gameName,
          tag: this.subTitle,
          device:6,
          packageId:1,
          "sort-by":'views',
          "start-index": 0,
          "max-result": 30
        }).then(d => {
          this.generalList = d.data.items[0].streams;
          if( d.data.items[0].rooms <=this.generalList.length ){
            this.clickMore='1';
          }
          if( this.type==4 ){
           if(_.isEmpty(_.result(d, 'data.items[0].streams')))return;
            this.data=d.data.items[0].streams;
            this.show(d.data.items[0].streams);
          }
        })

        vueHttp.listOfEvents({
          device:6,
          // version:'4.0.0',
          packageId:1,
          "start-index": 0,
          "max-results": 30
        }).then(d => {
          this.listAll = d.data.items;
          if(d.data.totalItems <= this.listAll.length){
            this.clickMore='1';
          }
        })
      })
    },
    components: {
      topbar,
      foot,
      scrolldownload
    }
  }
</script>