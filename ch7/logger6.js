var connect = require("connect");
var morgan = require("morgan");

function hello(req,res,next){
    console.log("hello function");
    next();
}

var app = connect()
           // .use(morgan("short"))
             .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
            .use(hello)
            .use(function(req,res,next){
                res.end("ok");
            })
            .listen(3000,function(){
                console.log("listening on port 3000")
            })






