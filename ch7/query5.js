var connect = require("connect");
var qs= require("qs");
var url = require("url");

var app = connect()
             //请求 http://localhost:3000?artist=Bob Marley&track=Jammin
            //.use(connect.query()) // 使用qs替代
            .use(function(req,res,next){
                res.setHeader("Content-Type","application/json");
                //var urlObj = url.parse(req.url,true);  //加true 选项，则已经解析query 字符串为对象
                var queryUrl = url.parse(req.url).query;
                res.end(JSON.stringify(qs.parse(queryUrl)));  //{"artist":"Bob Marley","track":"Jammin"}
            })
            .listen(3000);