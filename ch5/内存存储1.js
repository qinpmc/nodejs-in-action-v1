var http = require("http");
var count = 0;

http.createServer(function (req,res) {
    count ++ ;
    res.write("I hava been visited "+count +"times");
    res.end();
}).listen(8888,function(){
    console.log("listening on port 8888");
})