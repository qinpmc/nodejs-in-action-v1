var connect = require("connect");
var morgan = require("morgan");

function hello(req,res,next){
    console.log("hello function");
    next();
}

var app = connect()
            .use(
                morgan(function (tokens, req, res) {
                    return [
                        tokens.method(req, res),
                        tokens.url(req, res),
                        tokens.status(req, res),
                        tokens.res(req, res, 'content-length'), '-',
                    ].join(' ')
                })
            )
            .use(hello)
            .use(function(req,res,next){
                res.end("ok");
            })
            .listen(3000,function(){
                console.log("listening on port 3000")
            })






