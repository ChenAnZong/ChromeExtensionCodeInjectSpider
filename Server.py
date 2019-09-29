from flask import Flask,request
import codecs,os

app = Flask(__name__)

@app.route("/record",methods=["POST"])
def _record():
    url = request.values.get("url")
    title =  request.values.get("title")
    source =  request.values.get("source")
    content = request.values.get("content")
    write_path = os.path.join(os.getcwd() ,"articles/{}_{}.html".format(source,title))
    print("当前文章：",title)
    # 以 文章标题.html 为目标写出文件名
    with codecs.open(write_path, mode="w+",encoding="utf-8",errors="ignore") as f:
        # 写出网页内容
        f.writelines(content)
        f.flush()
    return "200"


if __name__  == '__main__':
    app.run(host='0.0.0.0',port="4499",debug=True,threaded=True,ssl_context="adhoc")

