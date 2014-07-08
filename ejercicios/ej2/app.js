var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uncss = require('uncss');
var ucss = require('ucss');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
/*
var files   = ['my', 'array', 'of', 'HTML', 'files'],
    options = {
       // ignore       : ['#added_at_runtime', /test\-[0-9]+/],
       // media        : ['(min-width: 700px) handheld and (orientation: landscape)'],
       // csspath      : '../public/css/',
       // raw          : 'h1 { color: green }',
       // stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
       // ignoreSheets : [/fonts.googleapis/],
       // urls         : ['http://localhost:3000/mypage', '...'], // Deprecated
       // timeout      : 1000,
       // htmlroot     : 'public'
    };
  var file = [__dirname+'/views/index.html'];
  var opts = {
        csspath:'./public/stylesheets/',
        stylesheets:['styles.css']
        //,htmlroot:'public'
    }

uncss(file, opts, function (error, output) {
  if(error){
    console.log(error);
  }else{
    console.log(output);
  }
    
  
  
});
*/

// css can be an array of strings, file paths, or URLs
var css = [".foo {} .bar {} .baz {}"];

// html can be an array of strings, file paths, or URLs
//var html = ["<html><head></head><body class='foo'></body></html>"];
var html = ['http://example.com/']
var context = {
    //whitelist: [], // CSS selectors to ignore
    auth: null, // For login (please se example elsewhere)
    timeout: 400 // Request timeout (defaults to 400ms)
};
var logger = null; // Function for logging HTTP requests

// Do the magic
ucss.analyze(html, css, context, logger, function(result) {
    // Do something to the result object
    console.log(result);
});

module.exports = app;
