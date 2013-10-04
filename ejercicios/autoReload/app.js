
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
   	server.listen(PORT,function(){
    	console.log("server runing.in.."+PORT);
    });
    io.set('log level',1);
    console.log(toCss.toCss);

    app.configure(function(){
    	app.set('view options',{//NO usamos loyouts, aun no se que rayos significa, creo q son plantillas
    		layout:false
    	})
    	app.use(express.static('public'));
    	//app.use(app.router);
    });
	var pathFileLess = './public/stylessheet/less/styles.less';
	var pathFileCss = null;
 
	var wathFiles =
	[
		pathFileCss
		,'./public/js/myscript.js'//un script en el frontend
		,'./app.js'//el servidor
		,'./views/index.jade'//el index(obvio)
	]
    app.get('/',function(req,res){
    	res.render('index.jade',{
    		pageTitle:'el index'
    		,pretty:true
    	});
    });

    
	  io.sockets.on('connection',function(socket){
	  	//vigilando el archivo LESS
	    fs.watchFile(pathFileLess,function(ahora,antes){
	    	pathFileCss = toCss.toCss(pathFileLess,{
					    		less:less
					    		,path:path
					    		,fs:fs
					    });
	    	reloaded();
	    	//console.log("css file :"+pathFileCss);
	    })
	    //vigilando resto de archivos
		var triggerReload = function(wathFiles,method){
			for (var i = wathFiles.length - 1; i >= 0; i--) {
				    fs.watchFile(wathFiles[i],function(ahora,antes){
	    				reloaded();
	    				console.log("archivo modificado");
	    			})
			};
		}
		triggerReload(wathFiles);

		//metodo que envia el reload
		var reloaded = function(){
		  		console.log("Recargar pagina");
		  		io.sockets.emit('reload');
		}

	  })

  		


