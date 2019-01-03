var http = require("http");
var urlModule = require("url");
var pathModule = require("path");
var fs = require("fs");

var server = http.createServer(function(req,res){
    var url = urlModule.parse(req.url);
    console.log(__dirname);
    console.log(url.pathname);

    var path = pathModule.join(__dirname,url.pathname);
    fs.stat(path,function(err,stat){
        if(err){
            if("ENOENT" == err.code){
                res.statusCode = 404;
                res.end("Not Found");
            }else{
                res.statusCode = 500;
                res.end("Internal Server Error");
            }
        }else{
            res.setHeader("Content-Length",stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on("error",function(){
                res.statusCode = 500;
                res.end("Internal Server Error");
            })
        }
    })
}).listen("3000",function(){
    console.log("listening on port 3000");
})
