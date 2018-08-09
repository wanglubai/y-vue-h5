import vueHttp from './vueHttp';
export default function (tileName, pcImg, desc,dataUrl,shareRoomType) {
    let jsonData={
        title:tileName,
        imgUrl:pcImg,
        description:desc || "",
        dataUrl:dataUrl || "",
        shareRoomType: shareRoomType || ""
    }
    let first = document.body.firstChild;
    let body = document.querySelector("body");
    let shareDiv = document.createElement("div");
    shareDiv.style.display = 'none';
    shareDiv.innerHTML = `<p>${jsonData.description}</p><img src="${jsonData.imgUrl}">`;
    body.insertBefore(shareDiv, first);
    if (navigator.userAgent.toUpperCase().match(/MICROMESSENGER/) != null) {
        let wxScript = document.createElement("script");
        wxScript.setAttribute('src', "//res.wx.qq.com/open/js/jweixin-1.2.0.js");
        body.appendChild(wxScript);
        share(jsonData);
    }

    //app分享逻辑
    window.getShareInfo = getShareInfo;

    //返回app需要的分享逻辑
    function getShareInfo() {
        const data = JSON.stringify({
          shareTitle: jsonData.title,
          shareContent: jsonData.description,
          shareImgUrl: jsonData.imgUrl,
          shareUrl: jsonData.dataUrl || location.href,       //ios分享必须传地址
          shareRoomType: jsonData.shareRoomType || 'live'  //分享房间的类型（区分竞猜房间和直播房间）
        });
        //      this.userInfo = JSON.stringify({a:2})
        return data;
    }
    function shareTextModule(infoData) {
        let data = {
            title: infoData.title, // 分享标题
            desc: infoData.desc, // 分享描述
            link: infoData.link, // 分享链接
            imgUrl: infoData.imgUrl, // 分享图标
            type: infoData.type, // 分享类型,music、video或link，不填默认为link
            dataUrl: infoData.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: infoData.success,
            cancel: infoData.cancel
        }
        return data;
    }
    function share(jsonData) {
        vueHttp.weixinJsdk({
             'url': location.href
        }).then(res => {  
            let token = res.data;
            wx.config({
                debug: false,
                appId: token.appId,
                timestamp: token.timestamp,
                nonceStr: token.nonceStr,
                signature: token.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
            });
            wx.ready(() => {
                let infoData = {
                    title: jsonData.title,
                    link: jsonData.dataUrl || token.url,
                    desc: jsonData.description,
                    imgUrl: jsonData.imgUrl,
                    type: "link",
                    dataUrl: jsonData.dataUrl,
                    success: function () {
                        // alert("分享成功！");
                    },
                    cancel: function () {
                        //alert("取消分享了")
                    }
                }
                //“分享到朋友圈”
                wx.onMenuShareTimeline(

                    shareTextModule(infoData)
                );
                //“分享给朋友”
                wx.onMenuShareAppMessage(
                    shareTextModule(infoData)
                );
                //“分享到QQ”
                wx.onMenuShareQQ(
                    shareTextModule(infoData)
                );
                //“分享到腾讯微博”
                wx.onMenuShareWeibo(
                    shareTextModule(infoData)
                );
                //“分享到QQ空间”
                wx.onMenuShareQZone(
                    shareTextModule(infoData)
                );

            })
            wx.error(function(res){
             });
        })
    }
}