var http=require('http');
var sa=require('fs');
var ruta=require('path');
function ejecutar(){
	function onRequest(req,res){
		console.log('peticion');
		console.log("req.url: "+req.url);
		var rutaArchivo='./views'+((req.url=='/')?'/index.html':req.url)
		console.log("rutaArchivo: "+rutaArchivo);
		var extension=ruta.extname(rutaArchivo);
		console.log("extension: "+extension)
		var tipoContenido='text/html';
		switch(extension){
			case '.css':
			tipoContenido='text/css';
			break;
			case '.js':
			tipoContenido='text/javascript';
			break;
			case '.woff':
			tipoContenido='font/woff';
			break;
			default:console.log("file unknown...");
		}
		ruta.exists(rutaArchivo,function(existe){
			if(existe){
				sa.readFile(rutaArchivo,function(error,contenido){	
					console.log(error);
					if(error){
						res.writeHead(500);
						res.end();
					}else{
						res.writeHead(200,{'Content-type':tipoContenido});
						res.end(contenido);
					}
				});
			}else{
				res.writeHead(404);
				res.end();
			}
		})
		/*
		console.log("rutaArchivo: "+rutaArchivo);
		res.writeHead(200,{'Content-type':'text/html'});
		res.write('<h1>hola mundo</h1>');
		res.end();
		*/

	}
	var server=http.createServer(onRequest).listen(4646,'127.0.0.1');//creo el servidor
	console.log('servidor corriendo en el puerto 4646');
}	

exports.ejecutar=ejecutar;
/*Forma de exportar una funcion en node
con el objeto exports exporto la funcion ejecutar, para que sea
ejecutada cuando desde otro archivo sea invocada con el metodo require();
Las variables dentro de ejecutar() son privadas en 
*/
//ejecutar();