var http = require("http");
var qs = require("querystring");
var items = [];

var server  = http.createServer(function(req,res){
    if("/" == req.url){
        switch (req.method){
            case "GET":
                show(res);
                break;
            case "POST":
                add(req,res);
                break;
            default:
                badRequest(res);
        }
    }else{
        notFound(res);
    }
}).listen(3000);
function show(res){
    var html = "<html><head><title> Todo List</title></head><body>"+
            "<h1>Todo List </h1>"+
            "<ul>"+ items.map(function(item){
                    return "<li>"+item+"</li>"
                 }).join("")
            +"</ul>"
            +"<form method='post' action='/'>"
            +"<p><input type='text' name='item'></p>"
            +"<p><input type='submit' value='Add Item'>"
            +"</form></body></html>";
    res.setHeader("Content-type","text/html");
    res.setHeader("Content-Length",Buffer.byteLength(html));
    res.end(html);
}

function notFound(res){
    res.statusCode = 404;
    res.setHeader("Content-type","text/plain");
    res.end("Not Found");
}
function badRequest(res){
    res.statusCode = 400;
    res.setHeader("Content-type","text/plain");
    res.end("Bad Request");
}
function add(req,res){
    var body = "";
    req.setEncoding("utf-8");
    req.on("data",function(chunck){
        body+= chunck;
    })
    req.on("end",function(){
        console.log(body); // item=buy+fruit
        var obj = qs.parse(body);
        console.log(obj); // { item: 'buy fruit' }
        items.push(obj.item);
        show(res);
    })
}
