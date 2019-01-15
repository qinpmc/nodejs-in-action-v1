var connect = require("connect");
var morgan = require("morgan");
var urlModule = require("url");

function hello(req,res,next){
    console.log("hello function");
    next();
}

//自定义format
morgan.format("joke","[joke] :method :url :status :query-string");

//自定义token
morgan.token("query-string",function(req,res){
    return urlModule.parse(req.url).query;
});

var app = connect()
            .use(morgan("joke"))  //http://localhost:3000/funcition?333   输出：[joke] GET /funcition?333 200 333
            .use(hello)
            .use(function(req,res,next){
                res.end("ok");
            })
            .listen(3000,function(){
                console.log("listening on port 3000")
            })






