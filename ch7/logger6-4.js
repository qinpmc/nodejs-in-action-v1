var connect = require("connect");
var morgan = require("morgan");
var fs = require("fs");

function hello(req,res,next){
    console.log("hello function");
    next();
}

//自定义format
morgan.format("joke","[joke] :method :url :status :query-string");

// 创建日志输出流
var logStream = fs.createWriteStream("./test.log",{flags:"a"});
var app = connect()
            .use(morgan("combined",{
                stream:logStream
            }))  //http://localhost:3000/funcition?333   输出：[joke] GET /funcition?333 200 333
            .use(hello)
            .use(function(req,res,next){
                res.end("ok");
            })
            .listen(3000,function(){
                console.log("listening on port 3000")
            })






