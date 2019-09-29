本项目实现微信文章采集（搜狗），实现文章离线保存，包括文章里面的图片。
需要搭配后台,后台用于接收数据并持久化，或者是调度插件，你也可以试下（使用基于Python的flask）。

同时，你可以把它看成一个插件模板，或者作为你学习插件的开始!
本模版包含了插件常用的开发知识，包括cookie读取，菜单，popup，引入其它css，引入其它js，引入图片资源.....

*最重要的是，本插件提供了一种利用插件控制浏览器，通过XHR或者直接操纵DOM获取网页数据的思路。*

Thanks 
https://github.com/jaubourg/ajaxHooks


运行步骤：

1.启动浏览器
```chrome.exe --disable-web-security  --allow-insecure-localhost  --ignore-certificate-errors-spki-list```

2.加载插件

3.启动Server端
  ```python3 server.py```

4.手工进入目标页，在匹配的URL下触发插件运行
  如 
  https://weixin.sogou.com/weixin?type=2&query=%E5%9B%BD%E5%BA%86+%E7%A5%96%E5%9B%BD&ie=utf8&s_from=input&_sug_=n&_sug_type_=


This is a chrome extension spider simple,
You can regard this project as a common chrome extension template，and this is a nice project to help you start Chrome Extension!