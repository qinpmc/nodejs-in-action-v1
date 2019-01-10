var connect = require("connect");
var logger = require("./setup4");

function hello(req,res,next){
    console.log("************");
    console.log(req.url);
    next();
}
var app = connect()
        .use(logger(":method :url"))
        .use(hello)
        .listen(3000);
