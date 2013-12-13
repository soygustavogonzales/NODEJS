
/***AUTO RELOAD***
	EL objetivo de este ejericio es ante cualquier modificacion a un
	archivo que sea relevante para la index, este se refreze sin necesidad de hacer [f5]
	o dandole reload manualmente, todo se hace desde el servidor
*/
!function(){

	var l = console.log;//solo paa efectos de agilizar el debug durante el desarrollo, omitir si ya esta terminado
	var net = new Object();
function autoReload(ops) {

	net.autoReload = function(options){
		/*
		this.defaults = {
			listWatchFiles:[]//lista de archivos en observacion de cambios
			,HOST:'127.0.0.1'//localhost
			,PORT : 8080//el puerto por defecto
			,index : 'index.jade'//Lista de archivos(paginas web) que se recargaran.
			,publicDirectory : 'public'//en este directorio se guardaran los subdirectorios o archivos estaticos(stylos,.css,.less,.js,imagenes,.png,.jpg,fuentes,woff)
		}
		*/
		var self = this;
		;this.modules = {
			http:require('http')
			,express : require('express')
			,fs : require('fs')
			,less : require('less')
			,path : require('path')
	    ,toCss : require('./serverLess.js')
	    ,socket : require('socket.io')
		}
		;this.parameters = {//parametros que podra configurar el desarrollador
			 HOST : options.HOST||this.defaults.HOST
			,PORT : options.PORT||this.defaults.PORT
			,index : options.index||this.defaults.index
			,publicDirectory : options.publicDirectory||this.defaults.publicDirectory//en este directorio se guardaran los subdirectorios o archivos estaticos(stylos,.css,.less,.js,imagenes,.png,.jpg,fuentes,woff)
			,listWatchFiles : options.listWatchFiles||this.defaults.listWatchFiles
		}
		;this.statics = {//para variables que no pueden ser sobreescritas por el desarrollador, desde el api
			app : null
			,io : null
		}
		;this.init = !function(){
			//l(self);
			self.initConf();
			self.routes();
			self.startSocketOn();
		}()
		;
	};

	net.autoReload.prototype = {//los metodos

		initConf: function(){//iniciara las primeras configuraciones
			this.statics.app = this.modules.express();
			var server = this.modules.http.createServer(this.statics.app);
			var self = this;
			this.statics.io = this.modules.socket.listen(server);
			this.statics.io.sockets.setMaxListeners(0);//Para evitar los warning por mas de 10 listenners por evento.
			server.listen(this.parameters.PORT,function(){
	    	l("server runing in PORT: "+self.parameters.PORT);
	    	self.statics.io.set('log level',1);
			});
			/*Configurando el app*/
			var self = this;
		  this.statics.app.configure(function(){
		  	//l(self)
		  	self.statics.app.set('view options',{//NO usamos loyouts, aun no se que rayos significa, creo q son plantillas
		  		layout:false
		  	})
		  	self.statics.app.use(self.modules.express.static( __dirname + '/' + self.parameters.publicDirectory));//Establezco mi carpeta para los arichivos estaticos < igual a> app.use(express.static('./public'));
	  		});

		}
		,routes : function(){
			var self = this;			
			this.statics.app.get('/',function(req,res){
				var index = self.parameters.index;
	    	var ext = index.substring(index.lastIndexOf('.')+1,index.length);
	    	if(ext=='jade'){
		    	res.render(self.parameters.index,{
		    		pageTitle:'el index'
		    		,pretty:true//para que no comprima el documento html.
		    	});
	    	}else{
	    		res.sendfile(__dirname + '/views/' + index);
	    	}
	    });
	    this.statics.app.get('/:pagina',function(req,res){
	    	var pag = req.params.pagina.toString();
	    	var ext = pag.substring(pag.lastIndexOf('.')+1,pag.length);
	    	if(ext=='jade'){
		    	res.render(pag,{
		    		pageTitle:'el contactme'
		    		,pretty:true//para que no comprima el documento html.
		    	});
	    		
	    	}else{
	    		res.sendfile(__dirname + '/views/' + pag);
	    	}
	    });
		}
		,startSocketOn : function(){
			var nroConections = 0;
			var self = this;
			this.statics.io.sockets.on('connection',function(socket){
				nroConections++;
				l("Nueva conexion: "+nroConections);
				self.watchingFiles();
				socket.on('disconnect',function(){
					l("Un socket desconectado");
				})
			});
		}
		,reloading : function(){
			l("Recargando pagina...");
			this.statics.io.sockets.emit('reload');	
		}
		,triggerWatchings : function(filePath,precompiler){
			/*
				filePath:la ruta al archivo
				precompiler: si es necesario preprocesar
			*/
			var self = this;
			this.modules.fs.watchFile(filePath
				,function(current,before){
					if(precompiler){//si esta definido(!undefined o !null) la variable precompiler
					l("precompiler: "+precompiler);
						switch(precompiler){
							case 'less':
								var pathFileCss = self.modules.toCss(filePath,{
									 	less:self.modules.less//le paso el modulo less
									 ,path:self.modules.path//le paso el modulo path
									 ,fs:self.modules.fs//le paso el modulo fs
						    });
						    l("archivo less modificado")
							break;
							case 'stylus':
							//precompilate by stylus code.
							break;
						}

					}else{
						
		    		l("archivo !.less modificado: .");
					}
						self.reloading();//ejecuto la recarga
			});
		}
		,watchingFiles : function(){
			var wathFiles = this.parameters.listWatchFiles;
			for (var i = 0,longi = wathFiles.length; i < longi; i++) {
				l("i: "+i)
				var filePath =  wathFiles[i];//ruta del archivo actual
				var file = filePath.substring(filePath.lastIndexOf('/')+1,filePath.length);//el nombre dle archivo incluida extension
				l("file: "+file)
				var extension = file.substring(file.lastIndexOf('.')+1,file.length);//extension
			 	if(extension == 'less'){//si es un archivo .less, lo preprocesamos (compilamos)
			 		this.triggerWatchings(filePath,'less');
			 	}else{
			 		this.triggerWatchings(filePath);
			 	}
			};

		}
	}//end net.clsPadre.prototype

	net.autoReload.prototype.defaults = {//variable que estaran en el prototype y por tanto no pueden sobreescribirse
			listWatchFiles:[]//lista de archivos en observacion de cambios
			,HOST:'127.0.0.1'//localhost
			,PORT : 8080//el puerto por defecto
			,index : 'index.jade'//Lista de archivos(paginas web) que se recargaran.
			,publicDirectory : 'public'//en este directorio se guardaran los subdirectorios o archivos estaticos(stylos,.css,.less,.js,imagenes,.png,.jpg,fuentes,woff)
	};

var o = new net.autoReload(ops);
	return (o)

}//end function autoReload()
	/*
	var objReload = new net.autoReload({
		listWatchFiles:[
			'./public/stylessheet/less/styles.less'
			,'./public/js/myscript.js'//un script en el frontend
			,'./app.js'//el servidor...
			,'./views/index.jade'//el index(obvio)
		]
		,index:'index.jade'
	});
	*/
module.exports = autoReload;

}()//end closure

