/**
 * Created by Administrator on 2017/1/23.
 */
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) !="micromessenger") {
  location.href = 'http://longzhu.com';
}