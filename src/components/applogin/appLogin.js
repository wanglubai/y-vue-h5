/**
 * Created by Administrator on 2017/3/22.
 */
export default function (returnUrl) {
  var ua = navigator.userAgent.toUpperCase();
  if(/(LONGZHU|TGA)/.test(ua)){
    var data={
      returnUrl: returnUrl
    };
    let dataString = JSON.stringify(data);
    if(/IPHONE|IPAD|IPOD/.test(ua)) {
      if (window.WebViewJavascriptBridge) {
        WebViewJavascriptBridge.callHandler('startLogin', dataString)
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
          WebViewJavascriptBridge.callHandler('startLogin', dataString)
        }, false)
      }
    } else if(/ANDROID/.test(ua)) {
      window.Android.startLogin(dataString);
    }
  }
}