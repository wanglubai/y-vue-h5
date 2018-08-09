var isIOS = window.navigator.userAgent.match(/iphone/i);
var fontSize = 32;
var wWidth;
var wHeight;
var autoFontSize;
var html = document.getElementsByTagName('html')[0];



var setFontSize = function () {
  if (screen.width > 0) {
    if (window.innerWidth >= screen.width || window.innerWidth == 0) {
      wWidth = screen.width;
    } else {
      wWidth = window.innerWidth;
    }
  } else {
    wWidth = window.innerWidth
  }

  if (screen.height > 0) {
    if (window.innerHeight >= screen.height || window.innerHeight == 0) {
      wHeight = screen.height;
    } else {
      wHeight = window.innerHeight;
    }
  } else {
    wHeight = window.innerHeight;
  }
  if (isIOS) {
    wWidth = screen.width;
    wHeight = screen.height;
  }

  if (wWidth > wHeight) {
    wWidth = wHeight;
  }
  autoFontSize = wWidth > 1080 ? 144 : wWidth / (PIXEL / 100);

  if (autoFontSize > fontSize) {
    fontSize = autoFontSize;
  }
  html.style.fontSize = fontSize + 'px';
};

setFontSize();

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
  setTimeout(function(){setFontSize()}, 500);
  setTimeout(function(){setFontSize()}, 300);
});