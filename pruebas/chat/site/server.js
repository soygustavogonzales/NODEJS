var http = require('http'),
express = require('express'),
less = require('less'),
path = require('path'),
fs = require('fs'),
toCss = require('./serverLess.js'),
app = express(),
l = console.log,
server = http.createServer(app),
io = require('socket.io').listen(server);

app.configure(function(){
	app.set('port',process.env.PORT||8080);
	app.set('view engine','jade');
	app.set('views','./views');

	app.use(express.cookieParser());
	app.use(express.session({secret:"my secret"}));
	//app.use(express.cookieSession({secret:"my secret"}));
	//app.use(express.static(__dirname+'/site/public'));
	app.use(express.static('./public'));
	app.use(app.router);
	app.use(function(req,res){//cada vez que se lanze error de pagina no encontrada 
		res.send(404,"OOPS!! Page not found");//respondera con este aviso o pagina.
	});
	/*
	app.use(express.bodyParser());//lanza un aviso de advertencia
	*/
})

var lessFile = './site/public/less/styles.less';
fs.watchFile(lessFile,function(after,current){	
	var cssFile = toCss(lessFile,{
		less:less,
		fs:fs,
		path:path
	})
})

app.get('/',function(req,res){
	res.render("index.jade");
});

app.get('/chat/:username',function(req,res){
	l(__dirname);
	var username = req.params.username;
	l(username);
	req.session.username = username;
	res.render('chat-1.jade',
		{username:username});
});

app.get('/chat',function(req,res){
	res.render('chat-1.jade',
		{username:"tavito"});
});


server.listen(app.get('port'),function(){
	l("Server runing in port: "+app.get('port'));
})
