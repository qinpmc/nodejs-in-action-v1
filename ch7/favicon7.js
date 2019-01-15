var connect = require("connect");
var favicon = require("serve-favicon");
var path = require("path");

function hello(req,res,next){
    console.log("hello function");
    next();
}

/*var app = connect()
            .use(favicon(path.join(__dirname,"public","favicon.ico")))
            .use(hello)
            .listen(3000,function(){
                console.log("listening on port 3000")
            })*/

var connect = require('connect')
var favicon = require('serve-favicon')
var path = require('path');

var app = connect();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(function(req,res,next){
        res.end("ok");
    })
// Add your middleware here, etc.

app.listen(3000)