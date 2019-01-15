var connect = require("connect");
var serveStatic = require('serve-static')

var app = connect()
    .use(serveStatic("public"))
    .listen(3000);
