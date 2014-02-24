var http = require('http'),
express = require('express'),
firebase = require('firebase'),
less = require('less'),
jade = require('jade');

var app = express(),
server = http.createServer(app),
l = console.log;

app.configure(function(){
	app.set('port',process.env.PORT||4530)
	app.set('view engine','jade')
	app.use(express.static('/public'))
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(app.router)
})

server.listen(app.get('port'),function(){
	l("Server runing in posrt %a "+ app.get('port'));
})
;
