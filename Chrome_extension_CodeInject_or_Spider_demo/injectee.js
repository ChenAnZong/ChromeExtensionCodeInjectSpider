
function UnicodeToText(data) {
    if (data == '') return '请输入十六进制unicode';
    data = data.split("\\u");
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i], 16).toString(10));
    }
    return str;
}


setTimeout(() => {
    var URL = document.URL;
    function blobToDataURL(blob, callback) {
        let a = new FileReader();
        a.onload = function (e) {
            callback(e.target.result);
        }
        a.readAsDataURL(blob);
    }

    // *********************************************************************************************************************
    // 搜狗搜索页面 作用是当前所有文章页并自动打开下一页
    var sougou_search_reg = new RegExp('https://weixin\.sogou\.com/weixin');
    var enter_link = new RegExp("weixin\.sogou\.com/api/share");
    var sg_links = [];
    if (sougou_search_reg.test(document.URL)) {
        $('a').each(function (index, element) {
            let link = $(this)[0].dataset.share;
            // console.debug("INJECTEE>>" + link);
            if (link && enter_link.test(link)) {
                sg_links.push(link);
            }
        });
        // 去重
        sg_links = Array.from(new Set(sg_links));
        let time = 1;
        // 遍历打开所有文章，进入到文章页面后采集代码自动执行
        for (let sg_link of sg_links) {
            (function (time) {
                setTimeout(() => {
                    console.log(sg_link);
                    window.open(sg_link);
                }, time * 1 * 1001);
            })(time++);
        }

        // 自动进入下一页，下一页又会自动进入下一页，直到最后一页
        if ($("#sogou_next").length != 0){
            setTimeout(() => {
                window.open("https://weixin.sogou.com/weixin" + $("#sogou_next").attr("href"));
            }, 60 * 1000);
        }
    }

    // **************************************************************************************************************************

    // 搜狗微信文章页面注入
    // let sougou_find_group_reg = new RegExp("weixin\.sogou\.com/weixin\\?type=");
    let sougou_find_group_reg = new RegExp("mp\.weixin\.qq\.com/s\\?src=");
    if (sougou_find_group_reg.test(URL)) {
        // alert("代码注入成功!");
        $(() => {
            var fetches = [];
            $("img").each(function (i, e) {
                var img = $(this);
                let src = img.attr("data-before-oversubscription-url");
                if (!src){
                    src = img.attr("data-src");
                }
                if (src && (src.indexOf("mmbiz.qpic.cn/mmbiz") != -1 || src.indexOf("mmbiz.qlogo.cn/mmbiz"))) {
                    fetches.push(
                        fetch(src).then(function (res) {
                            return res.blob();
                        }).then(function (res) {
                            blobToDataURL(res, function (result) {
                                img.attr("src", result);
                                // 可以类似这样移除一些没用的内容，压缩整个html
                                img.removeAttr("data-src");
                                // 实测没有下面这句的话 在手机下浏览html会变形
                                img.attr("style", "width: 100% !important; height: auto !important; visibility: visible !important;")
                            });
                        })
                            .catch(status, err => {
                                return console.log(status, err);
                            })
                    );
                } else {
                    // 正常来说，公众号所有图片符合以上的匹配
                    console.error("INJECTEE:>>未成功处理图片>>:" + src);
                }
            });
            // 确保所有图片加载完毕
            Promise.all(fetches).then(function () {
                setTimeout(() => {
                    data = {
                        "url":URL,
                        "title": $(".rich_media_title").eq(0).text().replace(/\s+/g,""),
                        "source": $("#js_name").text().replace(/(^\s*)|(\s*$)/g, ""), // 采集的公众号名字
                        "content": $('html').html()
                    };
                    // 额外修剪
                    $("#js_view_source").remove();
                    console.log("INJECTEE:>>文章处理完毕，开始发送文章数据！");
                    $.ajax({
                        url: "https://172.16.5.71:4499/record",
                        type: "post",
                        data: data,
                    });
                }, 2 * 1000);
            })

            // 采集完毕了 10秒后自动强制关闭页面
            function AUTOCLOSE() {
                window.opener = null;
                window.open('', '_self');
                window.close();
            }

            setTimeout(() => {
                AUTOCLOSE();
            }, 5 * 1000);

        });
    }
}, 3 * 1000);

