var connect = require("connect");
var cookieParser = require("cookie-parser");

var app = connect()
    .use(cookieParser("tobi is a cool ferret"))
    .use(function(req,res){
        //res.setHeader("Set-Cookie","tobi=ferret;Expires=Tue,08 Jun 2019 10:18:14 GMT");
        res.setHeader("Set-Cookie","foo=bar"); //只能设置一遍？ 后面的会覆盖前面设置的cookie
        res.end("hello\n");
    })
    .listen(3000,function(){
        console.log("server is listening on port 3000");
    })


/*
postman 传递 cookie：
Headers 中增加如下：
key固定为Cookie，value是cookie具体的k=v

*/
