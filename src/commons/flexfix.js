var fix = window.navigator.userAgent.match(/WebKit\/534\.30/i);
if (fix) {
  var body = document.getElementsByTagName('body')[0];
  body.className += ' fix-flex';
}