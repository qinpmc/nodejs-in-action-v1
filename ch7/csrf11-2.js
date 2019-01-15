var cookieSession = require('cookie-session');
var connect = require("connect");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require('csurf')
var express = require('express')


// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express()

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

app.get('/form', csrfProtection, function(req, res) {
    // pass the csrfToken to the view
    res.setHeader("Content-Type","text/html");
    res.write('<form action="/process" method="POST">')

    res.write('<input type="hidden" name="_csrf" value="{{csrfToken}}">');
    res.write('Favorite color: <input type="text" name="favoriteColor">')
    res.write('<button type="submit">Submit</button>');
    res.write('</form>');
   // res.render('send', { csrfToken: req.csrfToken() });
    res.end();
})

app.post('/process', parseForm, csrfProtection, function(req, res) {
    res.send('data is being processed')
})
app.listen(3000)