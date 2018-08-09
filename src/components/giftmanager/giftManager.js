import vueHttp from "../../commons/vueHttp";
import _ from "lodash";

let allPromise;
let allGifts = null;
const giftManager = {};
const imageRoot = '//img.plures.net/live/props/';

giftManager.getAllItems = () => {
  if (!allPromise) {
    allPromise = vueHttp.getAllItems()
      .then(items => {
        allGifts = {};
        _.forEach(items, function (item) {
          let name = item['name'];
          allGifts[name] = {
            id: item['id'],
            type: item['type'],
            name: name,
            title: item['title'],
            description: item['description'],
            category: item['category'],
            kind: item['kind'],
            tag: item['tag'],
            moneyCost: item['moneyCost'],
            beanCost: item['beanCost'],
            onlineTimeCost: item['onlineTimeCost'],
            comboInteval: item['comboInteval'],
            contribution: item['contribution'],
            experience: item['experience'],
            maxInventory: item['maxInventory'],
            maxLimit: item['maxLimit'],
            targetUrl: item['targetUrl'],
            bannerIcon: [imageRoot, name, '/gift-control-n-', name, item['bannerIcon'], '.png'].join(''), //道具栏图标
            backgroundIcon: [imageRoot, name, '/background-', name, item['backgroundIcon'], '.png'].join(''), //横幅背景
            consumeIcon: [imageRoot, name, '/gift-n-', name, item['consumeIcon'], '.gif'].join(''), //聊天消息图标
            smallIcon: [imageRoot, name, '/gift-small-', name, item['smallIcon'], '.png'].join(''), //历史聊天消息图标
            newBannerIcon: [imageRoot, name, '/gift-control-b-', name, item['newBannerIcon'], '.png'].join(''), //item['newBannerIcon'],
            bannerIconLarge: [imageRoot, name, '/gift-control-b-', name, item['bannerIcon'], '.png'].join(''), //item['bannerIconLarge'],
            backgroundAppIcon: item['backgroundAppIcon'],
            options: item['options']
          }
        })
        return (allGifts);
      })
  };
  return allPromise;
}

giftManager.getGiftItem = (name) => {
  return new Promise((resolve, reject) => {
    giftManager.getAllItems().then(d => {
      resolve(giftManager.clone(d[name]));
    });
  })
}
giftManager.clone = (item) => {
  return {
    id: item['id'],
    type: item['type'],
    name: item['name'],
    title: item['title'],
    description: item['description'],
    category: item['category'],
    kind: item['kind'],
    tag: item['tag'],
    moneyCost: item['moneyCost'],
    beanCost: item['beanCost'],
    onlineTimeCost: item['onlineTimeCost'],
    comboInteval: item['comboInteval'],
    contribution: item['contribution'],
    experience: item['experience'],
    maxInventory: item['maxInventory'],
    maxLimit: item['maxLimit'],
    targetUrl: item['targetUrl'],
    bannerIcon: item['bannerIcon'], //道具栏图标
    backgroundIcon: item['backgroundIcon'], //横幅背景
    consumeIcon: item['consumeIcon'], //聊天消息图标
    smallIcon: item['smallIcon'], //历史聊天消息图标
    newBannerIcon: item['newBannerIcon'], //item['newBannerIcon'],
    bannerIconLarge: item['bannerIconLarge'], //item['bannerIconLarge'],
    backgroundAppIcon: item['backgroundAppIcon'],
    options: item['options']
  };
}
export default giftManager;