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
		res.send(404,"<strong>OOPS!! Page not found</strong>");//respondera con este aviso o pagina.
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
	//l(__dirname);
	var username = req.params.username;
	l(username + " is enter");
	req.session.username = username;
	res.render('chat-1.jade',
		{username:username});
});

app.get('/chat',function(req,res){
	res.render('chat-1.jade',
		{username:"tavito"});
});

io.sockets.on('connection',function(socket){
	l("nueva coneccion...")
	socket.on("new_user",function(data){
		socket.set("username",data.username.toString())
		l("*New user: "+ data.username);
		socket.emit("showUsers",{
			listUsers:getListUsersnames(io.sockets.sockets)
		});
	});
	socket.on("window.insertarMsj",function(data){
		l("escuchado desde servidor...")
		io.sockets.emit('window.insertarMsj',data);//emitimos el metodo window.insertarMsj
	});

	socket.on("showMyId",function(data){
		/*
		io.sockets.emit("showUsers",
		{
			listUsers:getListUsersnames(io.sockets.sockets)
		});
		*/
		var username = data.username.toString();//el username del usuario;
		var _id = findIdUser(io.sockets.sockets,username);//el _id registrado por socket.io del username del usuario
		io.sockets.sockets[_id].emit("showUsers",{
			idUser:findIdUser(io.sockets.sockets,username)
		});

	});
	l("clients...");
	l(io.sockets.clients());
	l("****sockets...")
	l(io.sockets.sockets);
	/*
	*/
});
	var getListUsersnames = function(listSockets){
		/*
		*/
		var listUsers = [];
		for(var id in listSockets){
			listSockets[id].get('username',function(err, username){
			 	listUsers.push(username)
				});
		};
		return listUsers;
	}

	var findIdUser = function(listSockets,username){
		/*Este metodo obtiene el _id de un usuario espedifico 
		conociendo previamente su username
		
		*username : El nombre del usuario que se esta buscando
		*/
		var _id = null;
		for(var id in listSockets){
			l(id);
			listSockets[id].get("username",function(err,un){
				l(un)
				if(username == un)
					_id = id;
			});
		};
		return _id.toString();
	}
		

server.listen(app.get('port'),function(){
	l("Server runing in port: "+app.get('port'));
})
