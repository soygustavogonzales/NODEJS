/*
	este script servira una pagina web completa sencilla.
*/
var http=require('http');
var sa=require('fs');
var ruta=require('path');
var host="localhost";
var port=4646;

function ejecutar(){
	function onRequest(req,res){
		console.log('peticion');
		console.log("req.url: "+req.url);
		var rutaArchivo='./web'+((req.url=='/')?'/index.html':req.url)
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
			case '.jpg':
				tipoContenido='image/jpg';
			break;
			case '.jpeg':
				tipoContenido='image/jpeg';
			break;
			case '.png':
				tipoContenido='image/png';
			break;
			case '.woff':
				tipoContenido='font/woff';
			break;
			case '.eot':
				tipoContenido='font/eot';//pendiente de correccion
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
	}
	var server=http.createServer(onRequest).listen(port,host);//creo el servidor
	console.log('servidor corriendo en el puerto 4646');
}	
ejecutar();