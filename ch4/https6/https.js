var https = require("https");
var fs = require("fs");
var options = {
    key:fs.readFileSync("./key.pem"),
    cert:fs.readFileSync("./key-cert.pem")
}

var server = https.createServer(options,function(req,res){
    res.writeHead(200);
    res.end("https-----server");
});
server.listen(3000,function(){
    console.log("listening port 3000");
});