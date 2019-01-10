var connect = require("connect");

// 挂载点
function logger(req,res,next){
    console.log("%s %s",req.method,req.url);
    next();
}
function hello(req,res){
    res.setHeader("Content-Type","text/plain");
    res.end("hello world");
}

function restrict(req,res,next){
    console.log("restrict");
    next();
}

function admin(req,res,next){
    console.log("admin");
    next();
}

var app = connect()
        .use(logger)
        .use("/admin",restrict)
        .use("/admin",admin)
        .use(hello)
        .listen(3000);
