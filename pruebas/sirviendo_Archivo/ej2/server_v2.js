/*
	Esta es una version mejorada del archivo server.js
	Haciando uso del modulo mime(que debemo instalar, no viene en node por default)
	npm install mime
*/	
var http=require('http');
var sa=require('fs');
var ruta=require('path');
var mime = require('mime');
var host="localhost";
var port=4646;

function ejecutar(){
	function onRequest(req,res){
		var rutaArchivo='./web'+((req.url=='/')?'/index.html':req.url)
		var extension=ruta.extname(rutaArchivo);
		var tipoContenido=mime.lookup(extension);

		console.log('peticion');
		console.log("req.url: "+req.url);
		console.log("rutaArchivo: "+rutaArchivo);
		console.log("extension: "+extension)
		
		ruta.exists(rutaArchivo,function(existe){
			if(existe){
				sa.readFile(rutaArchivo,function(error,contenido){	
					console.log(error);
					if(error){
						res.writeHead(500);
						res.end();
					}else{
						res.writeHead(200,{'Content-type':tipoContenido});
						console.log("tipoContenido: "+tipoContenido);
						res.end(contenido);
					}
				});
			}else{
				res.writeHead(404);
				res.end();
			}
		})
	}
	var server=http.createServer(onRequest).listen(port,host);//creo el servidor
	console.log('servidor corriendo en el puerto 4646');
}	
ejecutar();