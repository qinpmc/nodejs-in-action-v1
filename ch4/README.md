
## 1 http 模块

### 创建服务器

```
var http = require("http");
var server = http.createServer(function(req,res){
    ...
}
```


#### 1 req 请求

- setEncoding()
- on(); data、end事件等
- method;

```
switch (req.method){
        case "POST":
            var item = '';
            req.setEncoding("utf8");
            req.on("data",function(chunk){
                item+= chunk;
            });
            req.on("end",function(){
                items.push(item);
                res.end("OK\n");
            });
        break;
...
```


#### 2 res 响应
- setHeader()
- statCode;
- write();
- end();

```
var url = "http://google.com";
var body = "<p> Redirecting to <a href='"+url+"'>"+url+"</a></p>";
res.setHeader("Location",url);
res.setHeader("Content-Length",body.length);
res.setHeader("Content-Type","text/html");
res.statCode = 302;
res.write(body);
res.end();
...
```




curl -Uri 'https://api.weibo.com/oauth2/get_token_info' -Body 'access_token=2.00VtCfGEXWO
OKE229f72fa42wkzKAE' -Method 'POST'