var http = require("http");
var express = require("express");
var operaciones = require('./process.js');

var PORT = 4646;
var app = express();
var server = http.createServer(app).listen(PORT,function(){
	console.log("Server runing in PORT: "+PORT);
});

app.configure(function(){
	app.use(express.static("public"));
});
app.get('/',function(req,res){
	res.render('index.jade');

});

app.post('/calcular',function(req,res){

	//console.log(req);
	var operacion = "sumar";//recoger la operacion;
	var rpta = operaciones({
		 a:5//recoger 1er numero
		,b:8//recoger 2do numero
	})[operacion]().toString();
	/*
	Sucede que envia la rpta en blanco cuando lo 
	dejo solo como entero, por tanto , debo concatenarlo
	como (''+rpta), cuando rpta es entero o convertirlo a
	String como lo lo hago ahora
	*/
	//console.log(process({a:3,b:5}).sumar());
	res.send(rpta);//devolvemos la respuesta
});
