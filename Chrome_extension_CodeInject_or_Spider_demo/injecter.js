
/*
    inject 本函数实现js代码注入
    js 文件名
    is_pre 是否插入在 html前面，一般来说，我们希望它早点执行（比如是渲染完毕前，我们就填是，否则放最后执行，爬虫一般放最后执行，因为需要等待数据加载和渲染完毕），
*/
function inject(js,is_pre){
    var jse = document.createElement('script'); 
    jse.src = chrome.extension.getURL(js);
    if(is_pre){
        jse.async = "true";
        //jse.async = is_async.toString();
        (document.head || document.documentElement).appendChild(jse);
    }else{
        jse.defer = "defer";
        document.getElementsByTagName("body")[0].appendChild(jse);
    }
}


inject("jquery.js",true);
inject("injectee.js",false);

