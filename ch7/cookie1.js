var connect = require("connect");
var cookieParser = require("cookie-parser");

var app = connect()
    .use(cookieParser("tobi is a cool ferret"))
    .use(function(req,res){
        console.log(req.cookies);
        console.log("-------------");
        console.log(req.signedCookies);
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
