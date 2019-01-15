var cookieSession = require('cookie-session');
var connect = require("connect");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csrf");

// 未走通
var app = connect()
            .use(bodyParser.json())
            .use(cookieParser("tobi is a cool ferret"))
            .use(cookieSession({
                name: 'session',
                keys: ['key1', 'key2'],
                cookie:{
                    maxAge:60*1000
                }
            }))
            .use(csrf())
            .listen(3000)
