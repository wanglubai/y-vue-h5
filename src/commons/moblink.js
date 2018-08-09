/**
 * 初始化moblink
 */
let moblinkErrTimes = 0;
window.moblinkFn = null;
const getParam = (paramName) => {
    var paramValue = "",
        isFound = !1;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
        var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"),
            i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
};

const loadMoblink = () => {
  try {
    //初始化moblink
    window.moblinkFn = MobLink();
  } catch (e) {
    moblinkErrTimes++;
    //重试20次
    if (moblinkErrTimes <= 20){
      setTimeout(() => {
        loadMoblink();
      }, 500);
    } else {
      //todo 如果尝试20次后。还没有加载成功
      console.log('moblink加载20次，不成功');
    }
  }
};


export default () => {
    let utm_sr = getParam('utm_sr');
    let linkhref;
    //cfm活动不加moblink
    //15cf82cb4ab  cfm
    //71aa95838f1f3a  cfm
    //45b9be32f6b  百度聚合
    if (utm_sr != "15cf82cb4ab" && utm_sr != "71aa95838f1f3a" && utm_sr != "45b9be32f6b") {
        let mobLinkScript = document.createElement("script");
        mobLinkScript.setAttribute('src', "//f.moblink.mob.com/v2_0_1/moblink.js?appkey=1c807c73f82cf");
        mobLinkScript.setAttribute('id', '-moblink-js');
        document.querySelector("body").appendChild(mobLinkScript);

        //加载moblink
        loadMoblink();
    }
}