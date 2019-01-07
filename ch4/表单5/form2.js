var http = require("http");
var qs = require("querystring");
var formidable = require("formidable");
var items = [];

var server  = http.createServer(function(req,res){
    switch (req.method){
        case "GET":
            show(res);
            break;
        case "POST":
            upload(req,res);
            break;
        default:
            badRequest(res);
    }

}).listen(3000,function(){
    console.log("listening on port 3000");
});
function show(res){
    var html = "<html><head><title> Todo List</title></head><body>"+
        "<h1>Todo List </h1>"+
        "<ul>"+ items.map(function(item){
            return "<li>"+item+"</li>"
        }).join("")
        +"</ul>"
        +"<form method='post' action='/' enctype='multipart/form-data'>"
        +"<p><input type='text' name='name'></p>"
        +"<p><input type='password' name='pwd'></p>"
        +"<p><input type='file' name='file'></p>"
        +"<p><input type='submit' value='Upload'>"
        +"</form></body></html>";
    res.setHeader("Content-type","text/html");
    res.setHeader("Content-Length",Buffer.byteLength(html));
    res.end(html);
}

function upload(req,res){
    if(!isFormData(req)){
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }
    var form = new formidable.IncomingForm();
    form.on("field",function(field,value){
/*        console.log("field................");
        console.log(field);
        console.log(value);*/
    })
    form.on("file",function(name,file){
/*        console.log("file................");
        console.log(name);
        console.log(file);*/
    });
    form.on("end",function(){
        res.end("over.................");
    });
    form.parse(req,function(err,fields,files){
        console.log(fields);
        console.log(files);
    });
    form.on("progress",function(bytesReceived,bytesExpected){
        var percent = Math.floor(bytesReceived/bytesExpected*100);
        console.log(percent);
    })
}
function isFormData(req){
    //console.log(req);
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf("multipart/form-data");
}