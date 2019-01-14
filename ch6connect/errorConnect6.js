var connect = require("connect");
var router = require("./middleware/router");

connect()
    .use( function makeErr(){
        new err();
    })
    .use(function(){
        console.log("Hello");
        next();
    })
    .use(errorHandler())
    .listen(3000);


function errorHandler(){
    var env = process.env.NODE_ENV || "development";
    return function (err,req,res,next){
        res.statusCode = 500;
        switch (env){
            case "development":
                res.setHeader("Content-Type","application/json");
                res.end(err.toString());
                break;
            default:
                res.end("server error");
        }
    }
}
