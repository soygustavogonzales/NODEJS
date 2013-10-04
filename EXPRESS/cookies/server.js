var express = require("express"),
http = require("http"),
PORT = 3000;

var app = express();

app.configure(function(){
	app.set("port", process.env.PORT || PORT);
	app.set("views","/views");
	app.set("view engine","jade");

	app.use(express.cookieParser());
	app.use(app.router);
	app.use(express.static("/public"));

});
app.get('/name',function(req,res){
	res.send('<h1>'+req.cookies.name+'</h1>'+'<a href="/delete">borrar cookie</a>');
});
app.get('/name/:name',function(req,res){
	res.cookie('name',req.params.name).send('<p>To see cookie in action, <a href="/name">GO TO <a/></p>')
});
app.get('/delete',function(req,res){
	res.clearCookie('name')//name es el nombre asignado de la cookie lineas arriba
	/*
	Tambien podriamos haber hecho:
	 res.clearCokkie(req.cookies.name)//y borraba la cookie que tenia asignada ese valor y que traia del route anterior
	*/
	res.send("name :"+req.cookies.name)
});
app.listen(app.get('port'),function(){
	console.log("Servidor escuchando en puerto:"+app.get("port") );
});

//response.cookie(name, value,[expires: new Date() +9000000, masAge:9000000])