var http = require("http");

module.exports = http.createServer(function(req,res){
    res.end("hello form expressjs.dev\n");
})