
/***AUTO RELOAD***
	EL objetivo de este ejericio es ante cualquier modificacion a un
	archivo que sea relevante para la index, este se refreze sin necesidad de hacer [f5]
	o dandole reload manualmente, todo se hace desde el servidor
*/
	var http = require('http'),
    express = require('express'),
    fs = require('fs'),
		less = require('less'),
    path = require('path'),
    toCss = require('./serverLess.js'),
   	app = express(),
    PORT =8080,
    server = http.createServer(app);
    io = require('socket.io').listen(server);
    var l = console.log;
   	server.listen(PORT,function(){
    	l("server runing in PORT: "+PORT);
    });
    io.set('log level',1);
    //l(toCss.toCss);//arroja [Function]

    app.configure(function(){
    	app.set('view options',{//NO usamos loyouts, aun no se que rayos significa, creo q son plantillas
    		layout:false
    	})
    	//l(__dirname);//nos arroja la ruta del directorio donde se encuentra el app.js
    	app.use(express.static( __dirname + '/public'));//Establezco mi carpeta para los arichivos estaticos < igual a> app.use(express.static('./public'));
    	

    	//app.use(app.router);
    });
	var pathFileCss = null;
 
	var wathFiles =
	[
		'./public/stylessheet/less/styles.less'
		,'./public/js/myscript.js'//un script en el frontend
		,'./app.js'//el servidor...
		,'./views/index.jade'//el index(obvio)
	]
    app.get('/',function(req,res){
    	res.render('index.jade',{
    		pageTitle:'el index'
    		,pretty:true
    	});
    });

    var conectados = 0;
	  io.sockets.on('connection',function(socket){//cada vez que se conecta un socket
		  conectados++;

		 	//io.sockets.setMaxListeners(0)
		 	l("io.sockets: ")
		 	//l(io.sockets.setMaxListeners)//arroja [Function]
		 	l("Nuevo cliente conectado: "+conectados + ", en total");
		 //vigilando el archivo LESS
		 //vigilando resto de archivos
			var triggerWatchs = function(filePath,precompiler){
				/*
				filePath:la ruta al archivo
				precompiler: si es necesario preprocesar
				*/
				fs.watchFile(filePath
					,function(current,before){
						l("precompiler: "+precompiler);
						if(precompiler){
							switch(precompiler){
								case 'less':
										pathFileCss = toCss.toCss(filePath,{
											 	less:less
											 ,path:path
											 ,fs:fs
								    });
								    l("archivo less modificado")
								break;
								case 'stylus':
								//preciompilate by stylus code.
								break;
							}

						}else{
							
			    		l("archivo !.less modificado: .");
						}
							reloaded();
				});
			}
			var triggerReload = function(wathFiles,method){
				for (var i = 0,longi = wathFiles.length; i < longi; i++) {
					l("i: "+i)
							var filePath =  wathFiles[i];//ruta del archivo actual
							var file = filePath.substring(filePath.lastIndexOf('/')+1,filePath.length);//el nombre dle archivo incluida extension
					l("file: "+file)
							var extension = file.substring(file.lastIndexOf('.')+1,file.length);//extension
						  	if(extension == 'less'){//si es un archivo .less, lo preprocesamos (compilamos)
						  		triggerWatchs(filePath,'less');
						  	}else{
						  		triggerWatchs(filePath);
						  	}
				};
				
			}//end triggerReload;
			triggerReload(wathFiles);
			//metodo que envia el reload
			var reloaded = function(){
			  		l("Recargando pagina...");
			  		io.sockets.emit('reload');
			}

	  });//end socket.io connection

  		


