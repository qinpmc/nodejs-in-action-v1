var http = require("http");
var connect = require("connect");
var bodyParser = require("body-parser");

var req = http.request({  //ttp模块提供了两个函数 http.request和 http.get，功能是作为客户端向http服务器发起请求。
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

