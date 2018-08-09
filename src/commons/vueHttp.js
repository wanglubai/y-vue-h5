import Vue from "vue";
import _ from "lodash";
import crypto from "crypto-js";
import queryString from 'query-string';
import VueResource from './vue-resource.common';

Vue.use(VueResource);

const hasPrefix = /^https?:\/\/(test\d?|rc)\./.test(document.location.href);
window['_GLOBAL_prefix_'] = hasPrefix ? `${RegExp.$1}.` : '';
//默认不设置cdn的时候为true，不需要为true的时候请设置cdn为false
const configApis = {
  "getUserInfo": {
    url: `//${_GLOBAL_prefix_}userapi.longzhu.com/user/getcurrentuserinfo`,
    type: 'jsonp',
    cdn: false
  },
  // tobar 用户信息面板.
  "getUserInfoRes": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/user/getcurrentuserinfo`,
    type: 'jsonp',
    cdn: false
  },
  //房间页广告
  "getRoomAds": {
    url: `//${_GLOBAL_prefix_}roomapicdn.longzhu.com/RecommendAd/GetRecommendAdInfo`,
    type: 'jsonp',
    cdn: true
  },
  // 拉取游戏分类列表
  "getGameList": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/home`,
    type: 'jsonp',
    cdn: true
  },
  // 获取视频接口
  "getLiveUrl": {
    url: `//${_GLOBAL_prefix_}liveapi.plu.cn/liveapp/roomstatus`,
    type: 'jsonp',
    cdn: true
  },
  // 精分视频获取接口
  "getVideoUrl": {
    url: `//${_GLOBAL_prefix_}joyd-api.longzhu.com/api/MediaDataApi/GetMediaData`,
    type: 'jsonp'
  },
  // 精分通过id获取视频接口
  "getVideoUrlbyID": {
    url: `//${_GLOBAL_prefix_}joyd-api.longzhu.com/api/MediaDataApi/GetMediaDataById`,
    type: 'jsonp'
  },
  "getCode": {
    url: `//${_GLOBAL_prefix_}login.plu.cn/mobile/seccode`,
    type: 'post',
    cdn: false
  },
  "getCodetest": {
    url: `//${_GLOBAL_prefix_}login.plu.dev/mobile/seccode`,
    type: 'post',
    cdn: false
  },
  //获取图片验证码
  "getCaptcha": {
    url: `//${_GLOBAL_prefix_}login.plu.cn/api/geetest`,
    type: 'jsonp',
    cdn: false
  },
  "joinRoom": {
    url: `//${_GLOBAL_prefix_}mbtga.longzhu.com/chatroom/joinroom`,
    type: "jsonp",
    cdn: true
  },
  "getAllItems": {
    url: `//${_GLOBAL_prefix_}configapi.longzhu.com/item/getallitems`,
    type: "jsonp",
    cdn: true
  },
  "homeHot": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/home`,
    type: 'jsonp',
    cdn: true
  },
  "listPages": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/streams/search`,
    type: 'jsonp'
  },
  "listOfEvents": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/matches/all`,
    type: 'jsonp'
  },
  "sendMsg": {
    url: `//${_GLOBAL_prefix_}mbgo.longzhu.com/chatroom/sendmsg2`,
    type: 'jsonp',
    cdn: false
  },
  "sendGift": {
    url: `//${_GLOBAL_prefix_}giftapi.longzhu.com/chatroom/sendgift`,
    type: 'jsonp',
    cdn: false
  },
  "getItemConfig": {
    url: `//${_GLOBAL_prefix_}configapi.longzhu.com/item/getitemconfigsV2`,
    type: 'jsonp'
  },
  "getWxPay": {
    url: `//${_GLOBAL_prefix_}pay.plu.cn/pay/genwxofficialpayorder`,
    type: 'jsonp',
    cdn: false
  },
  "getWxPayV2": {
    url: `//${_GLOBAL_prefix_}pay.plu.cn/pay/newgenwxofficialpayorder`,
    type: 'jsonp',
    cdn: false
  },
  "getYZCMAnchorList": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/rank/rooms`,
    type: 'jsonp',
    cdn: true
  },
  "getYZCMPreVideoUrl": {
    url: `//api.v.plu.cn/CloudMedia/GetInfoForPlayer?mediaId=1974811&supplier=3`,
    type: 'jsonp',
    cdn: true
  },
  "getYZCMUserRank": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/rank/users`,
    type: 'jsonp',
    cdn: true
  },
  "getYZCMGuildRank": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/rank/families`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringVote": {
    url: `//${_GLOBAL_prefix_}vote.plu.cn/api/lottery/nurvuj5m`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringVoteList": {
    url: `//${_GLOBAL_prefix_}vote.plu.cn/api/getPrizeList/nurvuj5m`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringMyRank": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/room`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringMyVote": {
    url: `//${_GLOBAL_prefix_}vote.plu.cn/api/getUserPrizeRecord/becpu52l`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringWinnerAnchors": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/win/rooms`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringWinnerUsers": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/win/users`,
    type: 'jsonp',
    cdn: true
  },
  "yzcm2017SpringWinnerGuilds": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/yzcm/win/families`,
    type: 'jsonp',
    cdn: true
  },
  "getPayList": {
    url: `//${_GLOBAL_prefix_}star.api.plu.cn/user/pay`,
    type: 'jsonp',
    cdn: false
  },
  "getTradeList": {
    url: `//${_GLOBAL_prefix_}star.api.plu.cn/user/trade`,
    type: 'jsonp'
  },
  "getLbPay": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/vip/buy`,
    type: 'jsonp',
    cdn: false
  },
  "getVipRes": {
    url: `//${_GLOBAL_prefix_}configapi.longzhu.com/config/getvipres`,
    type: 'jsonp',
    cdn: false
  },
  "sendVipEmoji": {
    url: `//${_GLOBAL_prefix_}mbtga.longzhu.com/chatroom/sendemoji`,
    type: 'jsonp',
    cdn: false
  },
  "getWxPayVip": {
    url: `//${_GLOBAL_prefix_}pay.plu.cn/pay/DirectBuyVipWx`,
    type: 'jsonp',
    cdn: false
  },
  "getYZCMGift": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/property/item`,
    type: 'jsonp',
    cdn: true
  },
  "validateUid": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/user/getuserinfobyid`,
    type: 'jsonp'
  },
  "footballBabyRooms": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/football/rooms?source=h5`,
    type: 'jsonp'
  },
  "footballgame": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/football/games`,
    type: 'jsonp'
  },
  "footballbabyOneDay": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/football/current`,
    type: 'jsonp'
  },
  "footballbabyHistory": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/football/history`,
    type: 'jsonp'
  },
  "weixinJsdk": {
    url: `//wxmp-api.longzhu.com/v1/jssdk`,
    type: 'jsonp',
    cdn: false
  },
  "keepLoveRank": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/activity520/GetRankList`,
    type: 'jsonp'
  },
  "keepLoveAnchorInfo": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/activity520/GetAnchorInfo`,
    type: 'jsonp',
    cdn: true
  },
  "xlxGetUserInfo": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/actcray/GetUserInfo`,
    type: 'jsonp',
  },
  "xlxGiveGrayItems": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/actcray/GiveGrayItems`,
    type: 'jsonp',
  },
  "xlxGetRankList": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/actcray/GetRankList`,
    type: 'jsonp',
  },
  "xlxGetAnchorScore": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/actcray/GetAnchorScore`,
    type: 'jsonp',
  },
  "xlxGetAnchorInfo": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/actcray/GetAnchorInfo`,
    type: 'jsonp',
  },
  "xlxGetConfig": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/actcray/GetConfig`,
    type: 'jsonp',
  },
  "roomHeartbeat": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/online/ticket`,
    type: 'jsonp',
  },
  "suixingpaiRecruits": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/suixingpai/recruits`,
    type: 'jsonp',
  },
  "suixingpaiQuestions": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/suixingpai/questions`,
    type: 'jsonp',
  },
  "suixingpaiFeedback": {
    url: `//${_GLOBAL_prefix_}stark.longzhu.com/api/suixingpai/questions/add`,
    type: 'jsonp',
  },
  "uploadImg": {
    url: `//${_GLOBAL_prefix_}mservice.longzhu.com/picture/upload`,
    type: 'post',
  },
  //回放按钮
  "liveReplay": {
    url: `//${_GLOBAL_prefix_}liveapi.plu.cn/liveapp/getliveshareinfo`,
    type: 'jsonp',
  },
  //周杰伦一键订阅
  "subscribebyids": {
    url: `//${_GLOBAL_prefix_}mservice.longzhu.com/relationship/follow`,
    type: 'jsonp',
  },
  //获取周杰伦活动文案配置
  "getJteamRules": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/active/document`,
    type: 'jsonp',
  },
  //获取周杰伦活动广告
  "getJteamBanner": {
    url: `//${_GLOBAL_prefix_}api.plu.cn//topic/active/adbanner`,
    type: 'jsonp',
  },
  //获取周杰伦底部合作媒体
  "getJteamAds": {
    url: `//${_GLOBAL_prefix_}api.plu.cn//topic/active/ads`,
    type: 'jsonp',
  },
  //获取周杰伦头图配置
  "getJteamKvpic": {
    url: `//${_GLOBAL_prefix_}api.plu.cn//topic/active/kvpic`,
    type: 'jsonp',
  },
  //周杰伦领取红包接口
  "jteamBsnvkrbc": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/lottery/znbe89yg`,
    type: 'jsonp',
  },
  //周杰伦页面渲染红包个数
  "jteamChance": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/userLotteryChance/znbe89yg`,
    type: 'jsonp',
  },
  //周杰伦阵营
  "jteamChallenge": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/active/present`,
    type: 'jsonp',
  },
  //冠名礼物初始化话
  "guanminginit": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/NamedGift/GetCurNamedInfo`,
    type: 'jsonp',
  },
  //冠名礼物周期排行
  "guanmingrank": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/NamedGift/GetCurRankList`,
    type: 'jsonp',
  },
  //获取本场赛事的相关直播房间信息
  "GetMatchRelateRoomList": {
    url: `//${_GLOBAL_prefix_}sportsapi.longzhu.com/sportV2/GetMatchRelateRoomList`,
    type: 'jsonp',
  },
  //获取体育赛事精彩直播间
  "GetMatchAwesomeRoomList": {
    url: `//${_GLOBAL_prefix_}sportsapi.longzhu.com/sportV2/GetMatchAwesomeRoomList`,
    type: 'jsonp',
  },
  //KPL订阅列表
  "kplSubscribeList": {
    url: `//${_GLOBAL_prefix_}mservice.longzhu.com/relationship/stars`,
    type: 'jsonp',
  },
  //KPL人气榜
  "kplPopularity": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/kpl/hotmessage`,
    type: 'jsonp',
  },
  //KPL发祝福
  "kplSendText": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/kpl/sendmessage`,
    type: 'jsonp',
  },
  //KPL点赞
  "kplThumbUp": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/kpl/admire`,
    type: 'jsonp',
  }, //KPL祝福墙
  "kplWall": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/kpl/messages`,
    type: 'jsonp',
  },
  //KPL抽奖
  "kplVote": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/lottery/hyxpjh8k`,
    type: 'jsonp'
  },
  //KPL抽奖次数
  "kplVoteChance": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/userLotteryChance/hyxpjh8k`,
    type: 'jsonp'
  },
  //KPL获奖名单
  "kplVoteList": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getPrizeList/hyxpjh8k`,
    type: 'jsonp'
  },
  //KPL分享
  "kplShare": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getSharetime/hyxpjh8k`,
    type: 'jsonp'
  }, //KPL获得次数
  "kplAddChance": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getNewUsertime/hyxpjh8k`,
    type: 'jsonp'
  },
  //请求服务器时间
  "kplServerTime": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/online/servertimestamp`,
    type: 'jsonp'
  },
  "serverTime": {
    url: `//${_GLOBAL_prefix_}mservice.longzhu.com/timing/getcurtime`,
    type: 'jsonp',
    cdn: false
  },
  //用户的抽奖次数
  "newUserLotteryChance": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/userLotteryChance/vyn3ejug`,
    type: 'jsonp',
    cdn: false
  },
  //跑马灯
  "newUsergetPrizeList": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getPrizeList/vyn3ejug`,
    type: 'jsonp',
    cdn: false
  },
  //用户抽奖接口
  "newUserlottery": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/lottery/vyn3ejug`,
    type: 'jsonp',
    cdn: false
  },
  //获奖列表
  "getNewUserPrizeRecord": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getUserPrizeRecord/vyn3ejug`,
    type: 'jsonp',
    cdn: false,
    params: true
  },
  //获取是否领取
  "hasrealprize": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/bdapp/hasrealprize`,
    type: 'jsonp',
    cdn: false,
  },
  //提交实物奖励地址
  "pushRealprize": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/bdapp/realprize`,
    type: 'jsonp',
    cdn: false,
  },
  "pptvAds": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/football/kvpic`,
    type: 'jsonp'
  },
  "pptvFootball": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/football/streams`,
    type: 'jsonp'
  },
  "getWeekSignMission": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/GetWeekSignMission`,
    type: 'jsonp'
  },
  "getWeekSignMission": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/GetWeekSignMission`,
    type: 'jsonp'
  },
  "getSignInfo": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/GetSignInfo`,
    type: 'jsonp'
  },
  "weekSignReceiveV2": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/WeekSignReceiveV2`,
    // url: `//test6.tasku.longzhu.com/MissionV2/WeekSignReceiveV2`,
    type: 'jsonp'
  },
  "weekSignReceive": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/WeekSignReceive`,
    type: 'jsonp'
  },
  "weekSignGapReceive": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/WeekSignGapReceive`,
    type: 'jsonp'
  },
  "weekSignGapReceiveV3": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/WeekSignGapReceiveV3`,
    type: 'jsonp'
  },
  "getWeekSignStep": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/GetWeekSignStep`,
    type: 'jsonp'
  },
  "getWeekSignMoneyCost": {
    url: `//${_GLOBAL_prefix_}tasku.longzhu.com/MissionV2/GetWeekSignMoneyCost`,
    type: 'jsonp'
  },
  "goddessRanks": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/ranks`,
    type: 'jsonp',
    cdn: true
  },
  "goddessDraw": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/user/draw`,
    type: 'jsonp'
  },
  "goddessRanksGroup": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/ranks/group`,
    type: 'jsonp'
  },
  "goddessUserInfo": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/user/info`,
    type: 'jsonp'
  },
  "goddessShuaiQiang": {
    url: `//${_GLOBAL_prefix_}giftapi.plu.cn/chatroom/getiteminventory`,
    type: 'jsonp',
    cdn: true
  },
  "goddessRoomList": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/ranks`,
    type: 'jsonp',
    cdn: true
  },
  "goddessFinalRank": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/ranks/rooms`,
    type: 'jsonp',
    cdn: true
  },
  "goddessFinalUser": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/topic/gw/ranks/users`,
    type: 'jsonp',
    cdn: true
  },
  "goddessBiuGift": {
    url: `//${_GLOBAL_prefix_}giftapi.plu.cn/chatroom/sendgift`,
    type: 'jsonp',
    cdn: true
  },
  // 手游势力榜 接口 start
  "progressbar": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/mgame/progressbar`,
    type: 'jsonp'
  },
  "roomslist": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/mgame/roomslist`,
    type: 'jsonp'
  },
  "rules": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/mgame/rules`,
    type: 'jsonp'
  },
  "needonlinetime": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/mgame/needonlinetime`,
    type: 'jsonp',
    cdn: false
  },
  "livedata": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/mgame/livedata`,
    type: 'jsonp',
    cdn: false
  },
  // 手游势力榜 接口 end

  //决战平安京接口 start
  //获取剩下CDKEY数
  "GetActivationCodeCount": {
    url: `//${_GLOBAL_prefix_}eventapi.plu.cn/extend/GetActivationCodeCount`,
    type: 'jsonp',
    cdn: false
  },
  //获取CDKEY
  "GetActivationCode": {
    url: `//${_GLOBAL_prefix_}eventapi.plu.cn/extend/GetActivationCode`,
    type: 'jsonp',
    cdn: false
  },
  //决战平安京接口 end



  //cfm活动接口start
  "getPrizeListCfm": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getPrizeList/yxs5ypxx`,
    type: 'jsonp'
  },
  "userLotteryChanceCfm": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/userLotteryChance/yxs5ypxx`,
    type: 'jsonp',
    cdn: false
  },
  "lotteryCfm": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/lottery/yxs5ypxx`,
    type: 'jsonp',
    cdn: false
  },
  "getUserPrizeRecordCfm": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getUserPrizeRecord/yxs5ypxx`,
    type: 'jsonp',
    cdn: false,
    params: true
  },
  "getUserPrizeRecordByIdCfm": {
    url: `//${_GLOBAL_prefix_}vote.longzhu.com/api/getUserPrizeRecordById/yxs5ypxx`,
    type: 'jsonp'
  },
  //cfm活动接口end
  "GetRoomRankList": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/RankList/GetRoomRankList`,
    type: 'jsonp'
  },
  //校园女神接口start
  "scheduleList": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/topic/schoolgoddess/schedules`,
    type: 'jsonp',
    cdn: false
  },
  "schoolgoddessFromAppRoom": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/topic/schoolgoddess/room`,
    type: 'jsonp'
  },
  "schoolgoddessHostList": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/topic/schoolgoddess/rooms`,
    type: 'jsonp'
  },
  "schoolgoddessAdvert": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/topic/schoolgoddess/h5advert`,
    type: 'jsonp'
  },
  "schoolgoddessSuning": {
    url: `//${_GLOBAL_prefix_}userapi.plu.cn/Account/AddSchoolGirlItemForSuingAccount`,
    type: 'jsonp'
  },
  "schoolgoddessPrizelist": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/prizelist/3`,
    type: 'jsonp'
  },
  "schoolgoddessMyrecord": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/vote/user/record/3`,
    type: 'jsonp'
  },
  "schoolgoddessLottery": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/getrand/3`,
    type: 'jsonp'
  },
  "schoolgoddessChance": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/chances/3`,
    type: 'jsonp'
  },
  "schoolgoddessWenan": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/topic/schoolgoddess/copywriter`,
    type: 'jsonp'
  },
  "schoolgoddessRegister": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/topic/schoolgoddess/register`,
    type: 'post'
  },
  "schoolgoddessTj": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/prizelist/161`,
    type: 'jsonp'
  },
  //校园女神接口end
  // 获取详情回放流
  "GetReplayForDisplay": {
    url: `//${_GLOBAL_prefix_}liveapi.longzhu.com/livereplay/GetReplayForDisplay`,
    type: 'jsonp'
  },
  "GetAnchorInfo": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/ActivityValentines/GetAnchorInfo`,
    type: 'jsonp'
  },
  "GetUserRankList": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/RankList/GetUserRankList`,
    type: 'jsonp'
  },
  //cfm活动接口end
  "teacher2017": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/teacher2017/gettop10`,
    type: 'jsonp'
  },
  //国庆中秋活动
  "nationalday2017pageinfo": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/nationalday/GetCurActivityInfo`,
    type: 'jsonp',
  },
  "nationalday2017exchangeMap": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/nationalday/ExchangeMap`,
    type: 'jsonp',
  },
  "nationalday2017exchangeMapFragment": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/nationalday/ExchangeMapFragment`,
    type: 'jsonp',
  },
  //国庆中秋活动end

  //2017台历活动start

  "calendar2017UserRank": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/ActivityCalendarGirls/GetTotalUserRank`,
    type: 'jsonp',
    cdn: true
  },
  "calendar2017HostRank": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/ActivityCalendarGirls/GetTotalAnchorRank`,
    type: 'jsonp',
    cdn: true
  },
  "calendar2017PersonalWawa": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/ActivityCalendarGirls/GetAllItemsInfo`,
    type: 'jsonp',
    cdn: true
  },
  "calendar2017GetMonthlyGirls": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/ActivityCalendarGirls/GetMonthlyGirls`,
    type: 'jsonp',
    cdn: true
  },
  "calendar2017GetFinalMonthlyGirls": {
    url: `//${_GLOBAL_prefix_}roomapicdn.plu.cn/ActivityCalendarGirls/GetFinalMonthlyGirls`,
    type: 'jsonp',
    cdn: true
  },
  //我的等级 
  "mygrade": {
    url: `//${_GLOBAL_prefix_}mservice.longzhu.com/user/mylevel`,
    type: 'jsonp',
  },

  //
  "GetJteamRankList": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/jteam/userrank`,
    type: 'jsonp'
  },
  //周杰伦活动榜单end,
  "GetJteamMember": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/jteam/rooms`,
    type: 'jsonp'
  },
  //周杰伦活动成员end
  //一战成名秋季赛接口
  "yzcmautumnGetEventInfo": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/ranklist/GetEventInfo`,
    type: 'jsonp',
  },
  "yzcmautumnGetEventRoomRankList": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/ranklist/GetEventRoomRankList`,
    type: 'jsonp',
  },
  "yzcmautumnGetEventUserRankList": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/ranklist/GetEventUserRankList`,
    type: 'jsonp',
  },
  "yzcmautumnGetEventFamilyRankList": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/ranklist/GetEventFamilyRankList`,
    type: 'jsonp',
  },
  "yzcmautumnGetCurrentUserRoomRankInfo": {
    url: `//${_GLOBAL_prefix_}liveapi.plu.cn/ranklist/GetCurrentUserRoomRankInfo`,
    type: 'jsonp'
  },
  "yzcmautumnGetEventRoomSimpleRankInfo": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/ranklist/GetEventRoomSimpleRankInfo`,
    type: 'jsonp',
  },
  "yzcmautumnVote": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/getrand/10`,
    type: 'jsonp'
  },
  "yzcmautumnVoteList": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/prizelist/10`,
    type: 'jsonp'
  },
  //APPKPL赛程详情
  "appKpl": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/schedules/schedule`,
    type: 'jsonp',
    cdn: true
  },
  //APPKPL龙珠精选
  "appKplVideo": {
    url: `//star.apicdn.plu.cn/api/media/listbytag`,
    type: 'jsonp',
    cdn: true
  },
  //APPKPL比赛数据
  "appKplMatch": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/kpl/kplmatchdata`,
    type: 'jsonp',
    cdn: true
  },
  //APPKPL战队信息
  "appKplTeam": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/kpl/teamsurl`,
    type: 'jsonp',
    cdn: true
  },
  "cfmNarrate": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/cfm/getcommentary`,
    type: 'jsonp',
    cdn: true
  },
  "cfmTeams": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/cfm/getteams`,
    type: 'jsonp',
    cdn: true
  },
  "cfmEveryTeam": {
    url: `//${_GLOBAL_prefix_}api.plu.cn/topic/cfm/getmember`,
    type: 'jsonp',
    cdn: true
  },
  "cfmWinningList": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/prizelist/7`,
    type: 'jsonp',
    cdn: true
  },
  "cfmMyWinList": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/vote/user/record/7`,
    type: 'jsonp',
    cdn: true
  },
  "cfmDrawChances": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/chances/7`,
    type: 'jsonp',
    cdn: true
  },
  "cfmRotating": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/getrand/7`,
    type: 'jsonp',
    cdn: true
  },
  //单身节接口
  "singlesDayHost": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/RankList/GetRoomRankList?ruleId=60`,
    type: 'jsonp',
    cdn: true
  },
  "singlesDayUser": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/RankList/GetUserRankList?ruleId=60`,
    type: 'jsonp',
    cdn: true
  },
  "getWheelInfo": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/vote`,
    type: 'jsonp',
    cdn: true,
    dataType: 'php'
  },
  'getUserInfotl': {
    url: 'http://giftapi.plu.cn/chatroom/getiteminventory?item=qtwawa',
    type: 'jsonp',
    cdn: false
  },
  'sendGift': {
    url: 'http://giftapi.plu.cn/chatroom/SendSunnyDoll',
    type: 'jsonp',
    cdn: false
  },
  'getMasterData': {
    url: 'http://roomapicdn.plu.cn/ActivityCalendarGirls/GetMonthlySunnyDoll',
    type: 'jsonp',
    cdn: false
  },
  //一战成名
  'getEventInfo': {
    url: `//rankapi.longzhu.com/ranklist/GetEventInfo`,
    type: 'jsonp',
    cdn: false
  },
  'getYzcmAds': {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/yzcm/picspring`,
    type: 'jsonp',
    cdn: false
  },
  'getYzcmRules': {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/yzcm/finalrules`,
    type: 'jsonp'
  },
  'GetEventUserRankList': {
    url: `//rankapi.longzhu.com/ranklist/GetEventUserRankList`,
    type: 'jsonp'
  },
  'GetEventFamilyRankList': {
    url: `//rankapi.longzhu.com/ranklist/GetEventFamilyRankList`,
    type: 'jsonp'
  },
  'GetRoomRankListFinal': {
    url: `//rankapi.longzhu.com/ranklist/GetRoomRankListFinal`,
    type: 'jsonp'
  },
  'GetEventRoomRankListSpring': {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/ranklist/GetEventRoomRankList`,
    type: "jsonp"
  },
  'findHostFromId': {
    url: `//family.longzhu.com/api/familys/rooms`,
    type: 'jsonp'
  },
  'GetCurrentUserRankInfo': {
    url: `//liveapi.longzhu.com/ranklist/GetCurrentUserRankInfo`,
    type: 'jsonp',
    cdn: false
  },
  'getCurrentUserFamilyRankInfo': {
    url: `//liveapi.longzhu.com/ranklist/GetCurrentUserFamilyRankInfo`,
    type: 'jsonp',
    cdn: false
  },
  'GetEventRoomRankInfo': {
    url: `//rankapi.longzhu.com/ranklist/GetEventRoomRankInfo`,
    type: 'jsonp',
    cdn: false
  },
  'getFamilyname': {
    url: `//family.longzhu.com/api/family/info`,
    type: 'jsonp'
  },
  'getRoomsdiary': {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/roomsdiary`,
    type: 'jsonp'
  },
  'sendGiftV2': {
    url: `//giftapi.longzhu.com/chatroom/sendgiftv2`,
    type: 'jsonp'
  },
  'sendGiftV1': {
    url: `//giftapi.longzhu.com/chatroom/sendgift`,
    type: 'jsonp'
  },
  'getInventoryApi': {
    url: `//giftapi.longzhu.com/chatroom/getiteminventory`,
    type: 'jsonp'
  },
  'geteventroomsimplerankinfo': {
    url: `//rankapi.longzhu.com/ranklist/geteventroomsimplerankinfo`,
    type: 'jsonp'
  },
  'getYzcmPrizeList': {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/prizelist/${window.lotteryId}`,
    type: 'jsonp',
    cdn: true
  },
  "getYzcmRand": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/getrand/${window.lotteryId}`,
    type: 'jsonp'
  },
  "getLuckydog": {
    url: `//${_GLOBAL_prefix_}vote-api.longzhu.com/api/lottery/prizelist/${window.lotteryId}?level=10&maxCounts=1`,
    type: 'jsonp'
  },
  "getExchangeCheck": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchange/check`,
    type: 'jsonp'
  },
  "getExchangeTicket": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchange/ticket`,
    type: 'jsonp'
  },
  "getExchangeMypoint": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchange/mypoint`,
    type: 'jsonp'
  },
  "getExchangeInventory": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchange/inventory`,
    type: 'jsonp',
    cdn: false
  },
  "getExchangeList": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchangelist`,
    type: 'jsonp'
  },
  "myUserList": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchange/userlist`,
    type: 'jsonp'
  },
  "adduserident": {
    url: `//${_GLOBAL_prefix_}event-api.longzhu.com/yzcm/exchange/adduserident`,
    type: 'jsonp'
  },
  //感恩节
  "thankingGivingHost": {
    url: `//${_GLOBAL_prefix_}rankapi.longzhu.com/RankList/GetRoomRankList`,
    type: 'jsonp',
    cdn: true
  },
  "yzcmticketuserlist": {
    url: `//${_GLOBAL_prefix_}api.longzhu.com/yzcm/ticket/userlist`,
    type: 'jsonp',
    cdn: true
  },
  "getuseryearlyreport": {
    url: `//${_GLOBAL_prefix_}eventapi.longzhu.com/extend/GetUserYearlyReport`,
    type: 'jsonp',
    cdn: true
  },
  "getBaiwanMatchInfo": {
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/million/getmatchinfo`,
    type: 'jsonp',
    cdn: true
  },
  "getBaiwanAccount": {
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/serial/getaccount`,
    type: 'jsonp',
    cdn: false
  },
  "getBaiwanRankWeek": {
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/million/getWeekRanking`,
    type: 'jsonp',
    cdn: false
  },
  "getBaiwanRankTotal": {
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/million/getTotalRanking`,
    type: 'jsonp',
    cdn: false
  },
  //获取手机验证码
  "getPhoneCode": {
    url: `//${_GLOBAL_prefix_}login.longzhu.com/lz/sendsms`,
    type: 'post',
    cdn: true
  },
  //手机登录
  "getPhoneLogin": {
    url: `//${_GLOBAL_prefix_}login.longzhu.com/lz/login`,
    type: 'post',
    cdn: true,
    credentials: true
  },
  //当前用户是否正在提现
  "getWithdrawalStatus":{
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/Transfer/IsTransfering`,
    type: 'jsonp'
  },
  //微信提现
  "getMoneyWeChat": {
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/Transfer/TransferOrder`,
    type: 'jsonp'
  },
  "millionExchangeCoin": {
    url: `//${_GLOBAL_prefix_}fq-api.longzhu.com/million/increaseChance`,
    type: 'jsonp',
    cdn: false
  },
  "getWithdrawal": {
    url: `//fq-api.longzhu.com/serial/getWithdrawal`,
    type: 'jsonp'
  },
   //元宵节
  "getLanternAnchorRank": {
    url: '//eventapi.plu.cn/LanternFestival/GetAnchorRank',
    type: 'jsonp'
  },
  "getLanternUserRank": {
    url: '//eventapi.plu.cn/LanternFestival/GetUserRank',
    type: 'jsonp'
  },
  "getLanternusersignin": {
    url: '//event-api.longzhu.com/lanternfes/usersignin',
    type: 'jsonp'
  },
  "getmysignin": {
    url: '//event-api.longzhu.com/lanternfes/mysignin',
    type: 'jsonp'
  },
  "getAnchorPointRank": {
    url: `//eventapi.plu.cn/SpringFestival/GetAnchorPointRank`,
    type: 'jsonp'
  },
  "getSpringUserRank": {
    url: `//eventapi.plu.cn/SpringFestival/GetUserRank`,
    type: 'jsonp'
  },
  "getAnchorLiveRank": {
    url: `//eventapi.plu.cn/SpringFestival/GetAnchorLiveRank`,
    type: 'jsonp'
  },
  "getCurUserRank": {
    url: `//eventapi.plu.cn/SpringFestival/GetCurUserRank`,
    type: 'jsonp'
  }, 
  "getCurLiveRank": {
    url: `//eventapi.plu.cn/SpringFestival/GetCurAnchorLiveRank`,
    type: 'jsonp'
  },
  "getCurAnchorPointRank": {
    url: `//eventapi.plu.cn/SpringFestival/GetCurAnchorPointRank`,
    type: 'jsonp'
  },
  "getCurRoomPoint": {
    url: `//eventapi.plu.cn/SpringFestival/GetCurRoomPoint`,
    type: 'jsonp'
  },
  "getUserInfoByRoomId": {
    url: `//eventapi.plu.cn/extend/GetUserInfoByRoomId`,
    type: 'jsonp'
  },
  "checkUserIdRes": {
    url: `//test.pay.plu.cn/common/GetInfoByUid`,
    type: 'jsonp'
  },
  "createdSnOrder": {
    url: `//test.pay.plu.cn/pay/CreateSuningPayOrderForJs`,
    type: 'jsonp'
  },
  "getLongzhuAd": {
    url: `//api.longzhu.com/pptv/pic`,
    type: 'jsonp'
  },
  /**
   * 获取宣誓人数, 宣誓状态
   */
  "getRejectcheatVows": {
    url: `//api.longzhu.com/topic/rejectcheat/getVows`,
    type: 'jsonp',
    cdn: true
  },
  "postRejectcheatVow": {
    url: `//api.longzhu.com/topic/rejectcheat/vow`,
    type: 'post',
    cdn: false,
    credentials: true
  },
  //白色情人节
  "whiteDayHost": {
    url: '//rankapi.longzhu.com/RankList/GetRoomRankList',
    type: 'jsonp'
  },
  "whiteDayUser": {
    url: '//rankapi.longzhu.com/RankList/GetUserRankList',
    type: 'jsonp'
  },
  //wss

  "idcgw":{
    url:`//idc-gw.longzhu.com/mbidc`,
    type: 'post',
    cdn: true
  },
  'recordVideo':{
    url: `//replay-api.longzhu.com/video/leadingactorlist`,
    type:'jsonp'
  },
  'recommendLive':{
    url: `//starapi.longzhu.com/room/nine`,
    type:'jsonp'
  },
  'videoinfo':{
    url: `//replay-api.longzhu.com/video/info`,
    type:'jsonp'
  },
  'yaplayvideo':{
    url: `//replay-api.longzhu.com/video/play`,
    type:'jsonp'
  }
}

const vueHttp = {}
_.each(configApis, (v, k) => {
  vueHttp[k] = function (p) {
    let parseData = '';
    let url = v.url;
    if (v.params == true) {
      parseData = [`${v.url.replace(/\/$/, '')}/${p.join('/')}`];
    } else {
      if (v.dataType && v.dataType == 'php') {
        url = v.url + p;
      }
      if (v.type == "jsonp") {

        const queryStr = queryString.parse(location.search);
        const appInfo = {
          version: queryStr.version || '3.9.3',
          device: queryStr.device || 6,
          packageId: queryStr.packageId || ''
        }
        //通过url获取app版本号、设备号、平台，调用所有接口时需要传递过去
        p = _.assignIn(appInfo, p);
        if (v.dataType && v.dataType == 'php') {
          p = appInfo
        }
        let callback = "";
        if (v.cdn == false) {
          let tmpStr = _.map(p, (value, key) => [key, value].join('=')).join('&');
          let timestamp = new Date().getTime().toString(36);
          callback = crypto.SHA1(v.url + "?" + tmpStr).toString(crypto.enc.Hex);
          callback = "__plu" + callback.substr(parseInt(callback.length / 2)) + timestamp;
        } else {
          let tmpStr = _.map(p, (value, key) => [key, value].join('=')).join('&');
          callback = crypto.SHA1(v.url + "?" + tmpStr).toString(crypto.enc.Hex);
          callback = "__plu" + callback.substr(parseInt(callback.length / 2));
        }
        parseData = [url, {
          params: p,
          callback
        }];
        if (!_.isEmpty(v.timeout)) parseData.push({
          timeout: v.timeout
        });
      } else if (v.type == "post") {
        parseData = [url, p];
        //postType默认不配 就是true 就是表单，配了取反就是false 就是json格式
        Vue.http.options.emulateJSON = !v.postType;
        //credentials 
        Vue.http.options.credentials = v.credentials;

      } else {
        parseData = [url, {
          params: p
        }];
        Vue.http.options.emulateJSON = true;
      }
    }
    return Vue.http[v.type](...parseData).then(r => r.json());
  }
})

export default vueHttp;