var connect = require("connect");

// 挂载点
function logger(req,res,next){
    console.log("%s %s",req.method,req.url);
    next();
}

function restrict(req,res,next){
    var authorization = req.headers.authorization;
    if(!authorization) return next(new Error("Unauthorized"));
    var parts = authorization.split(" ");
    var schema = parts[0];
    //var user = parts[1];
    //var pass = parts[2]; // 书中 parts[2]总为undefined
    var userAndPwd = new Buffer(parts[1], 'base64').toString();
    var userAndPwdAry = userAndPwd.split(":");
    var user = userAndPwdAry[0];
    var password = userAndPwdAry[1];
/*    authoricateWithDatabase(user,pass,function(err){
        if(err) return next(err);
        next();
    })*/
    next();
}

function admin(req,res,next){
    switch (req.url){
        case "/":
            res.end("try /users");
            break;
        case "/users":
            res.setHeader("Content-Type","application/json");
            res.end(JSON.stringify(["tobi","loki","jane"]));
            break;
    }
    next();
}
function hello(req,res,next){
    console.log("************");
    console.log(req.url);
    next();
}

//http://localhost:3000/admin/users
// 使用postman： 配置Authorization ，Username：tobi，Password：fff
// 使用fiddler： composer时，请求头中添加 Authorization: Basic dG9iaTpmZmY=   （注释：dG9iaTpmZmY=为tobi:fff的base64编码）
var app = connect()
        .use(logger)
        .use("/admin",restrict)
        .use(hello)    //请求为 http://localhost:3000/admin/users ，输出 /admin/users
        .use("/admin",admin)
        .listen(3000);
