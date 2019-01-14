var http = require("http");
var connect = require("connect");
var bodyParser = require("body-parser");
var getRawBody = require("raw-body");

var app = connect()
    //.use(connect.limit("32kb")) // 已过时 使用 raw-body替代
    .use(function(req, res, next){
        getRawBody(req,{
            limit:"32kb"
        })
    })
    .use(bodyParser.text())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .listen(4000,function(){
        console.log("server started.....");
    })


