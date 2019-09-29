
if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}


var c1 = chrome.contextMenus.create({"title": "我是插件按钮1","onclick":hi});
var c2 = chrome.contextMenus.create({"title": "我是插件按钮2","onclick":hi});
// var a = chrome.contextMenus.create(contextMenuItem);




chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    alert('你笑起来真可爱，像春天的花一样');
    // chrome.tabs.executeScript({
    //   code: 'document.body.style.backgroundColor="red"'
    // });
  });

  function hi(){
    alert('最幸福的事，就是在喜欢你的每一天里，被你喜欢');
  }

 