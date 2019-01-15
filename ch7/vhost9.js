var connect = require("connect");
var server = connect();
var vhost = require("vhost");
var app = require("./sites/expressjs.dev");

// demo 未走通！！
/*server.use(vhost("expressjs.dev",function(req,res){
    app.emit("request",req,res);
}));
server.listen(3000);*/

// demo 未走通！！
var app = connect()

app.use(vhost('mail.example.com', function (req, res) {
    // handle req + res belonging to mail.example.com
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello from mail!')
}))
app.listen(3000)