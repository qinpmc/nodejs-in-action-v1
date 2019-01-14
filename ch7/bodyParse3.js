var connect = require("connect");
var bodyParser = require("body-parser");

var app = connect()
            .use(function(req,res,next){
                console.log("before body parse.......");
                console.log(req.body);
                next();
            })
            .use(bodyParser.json())  // 提交的数据为 json    "Content-Type:application/json"
            .use(bodyParser.text())  // 提交的数据为 text
            .use( bodyParser.urlencoded({  // 提交的数据则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
                extended: false
            }) )
            .use(bodyParser.raw())
    // 新接口使用： app.use(bodyParser.urlencoded());或 app.use(bodyParser.json());
            .use(function(req,res){
                res.end("Registered new user: "+ req.body.username);
            })
            .listen(3000);
