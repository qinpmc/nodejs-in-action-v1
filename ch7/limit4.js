var http = require("http");
var connect = require("connect");
var bodyParser = require("body-parser");

// 该示例 limit4 搭配 limit4-1.js 和 limit4-2.js 同时运行
var req = http.request({  //http模块提供了两个函数 http.request和 http.get，功能是作为客户端向http服务器发起请求。
    method:"POST",
    port:3000,
    headers:{
        "Content-Type":"application/json"
    }
});

req.write("[");
var n = 300000;
while(n--){
    req.write("'foo,'");
}
req.write("'bar]'");
req.end();

