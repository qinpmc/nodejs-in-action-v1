var http = require("http");
var connect = require("connect");
var bodyParser = require("body-parser");

//搭配 limit4.js 同时运行
var app = connect()
    .use(bodyParser.text())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .listen(3000,function(){
        console.log("server started.....");
    })


