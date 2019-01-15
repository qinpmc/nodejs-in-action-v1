var connect = require("connect");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

function edit(req,res,next){
    if("GET" !=req.method){
        return next();
    }
    res.setHeader("Content-Type","text/html");
    res.write('<form method="POST" action="/resource?_method=DELETE">');
    res.write('<button type="submit">Delete resource</button>');
    res.write("</form>");
    res.end();
}

function update(req,res,next){
    if("PUT" !=req.method){
        return next();
    }
    res.end("Update name to "+ req.body.username);
}

var app = connect()
            .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
            .use( bodyParser.urlencoded({  // 提交的数据则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
                extended: false
            }) )
            .use(methodOverride("_method"))
            .use(edit)
            .use(update)
            .listen(3000);