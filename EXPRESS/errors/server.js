var http = require('http')
	express = require('express'),
	app = express(),
	l=console.log,
	PORT = process.env.PORT||8080,
	server = http.createServer(app);
	server.listen(PORT,function(){
		l("Servidor corriendo en el puerto: "+PORT);
	});
	/*
		http.createServer(app).listen(PORT);
	*/

app.configure(function(){
	 //app.set('port',PORT);
	 app.set(express.static(__dirname + "/public"));
	 app.set('view engine','jade');
	 app.use(app.router);
	 app.use(express.bodyParser());
	 app.use(function(req,res){
	 	res.send(404,"page not found")
	 });
});

app.get('/',function(req,res){
	res.send("index");
});

