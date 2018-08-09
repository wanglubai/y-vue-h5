import vueHttp from './vueHttp';
let moblinkErrTimes = 0;
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


//设置单个按钮的moblink
//参数
/**
 * 设置单个按钮的moblink
 * @param domId  需要设置dom的id
 *         linkParams.type: 类别  1:房间页  0:非房间页
 *         linkParams.roomId:
 */
const setMoblink = (domId) => {


    //linkParams.el: dom的id,必须是id
    //linkParams.type: 类别  1:房间页  0:非房间页
    //linkParams.roomId:
    let linkParams = {};
    if (!window['roomId']) {
      linkParams.params = {
        type: '0'
      };
      linkParams = {
        el: '#'+domId,  //高清加速不会卡，下载按钮
        path:'/main',
        params: {
            type: '0'
        }
      };
    } else {
      linkParams.params = {
        type: '1',
        roomId: window['roomId']
      };
      linkParams = {
        el: '#'+domId,  //高清加速不会卡，下载按钮
        path:'/main',
        params: {
          type: '1',
          roomId: window['roomId']
        }
      };
    }

    //调用moblink方法
    loadMoblink(linkParams, domId);

};

const loadMoblink = (linkParams, domId) => {
  //如果有这个方法,则使用
  if (window.moblinkFn && window.moblinkFn.reqInit) {
    const domEl = document.getElementById(domId);
    //判断dom是否存在
    if(domEl) {
      // console.log(`设置moblink${JSON.stringify(linkParams)}`)
      window.moblinkFn.reqInit(linkParams);
    } else {
      //todo 如果当前设置的dom不存在，是否需要处理
    }
  } else {
    moblinkErrTimes++;
    //重试60次
    if (moblinkErrTimes <= 60){
      setTimeout(() => {
        loadMoblink(linkParams,domId);
      }, 500);
    } else {
      //todo 如果尝试20次后。还没有此方法
      console.log('moblink方法调用20次，不成功')
    }
  }
};

const getDownloadLink = (elementName) => {
    let utm_sr = getParam('utm_sr');
    if (navigator.userAgent.toUpperCase().match(/ANDROID/) != null) {
        //仅用于cmf官方合作的项目的下载包
        if (utm_sr == "15cf82cb4ab" || utm_sr == "71aa95838f1f3a") {
            location.href = "//updateplulive.plu.cn/4.3.0/chanel_10011.apk";
        //百度聚合
        } else if (utm_sr == "45b9be32f6b") {
            location.href = "//updateplulive.plu.cn/3.9.5/chanel_200.apk";
        } else {
            // getMobLink(elementName)
            location.href = "//a.app.qq.com/o/simple.jsp?pkgname=com.longzhu.tga";
        }
    } else {
        // getMobLink(elementName)
        if (utm_sr == "45b9be32f6b") {
            location.href = "//at.umeng.com/eKHDGD";
        } else {
            location.href = "//at.umeng.com/bu8bCa";
        }
    }
}
export default {
    getDownloadLink,
    getParam,
    setMoblink
}