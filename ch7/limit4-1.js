var http = require("http");
var connect = require("connect");
var bodyParser = require("body-parser");

var app = connect()
    .use(bodyParser.text())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .listen(3000,function(){
        console.log("server started.....");
    })


