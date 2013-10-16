!function(){

	var autoReload = require('./serverAutoReload.js');
	autoReload({
		listWatchFiles:[//lista de archivos en observacion
			'./public/stylessheet/less/styles.less'
			,'./public/js/myscript.js'//un script en el frontend
			,'./app.js'//el servidor...
			//,'./views/index.jade'//el index(obvio)
			,'./views/index.html'//el index(obvio)
			,'./views/home.html'//
		]
		,index:'index.html'//la pagina por default: localhost:PORT/index.jhtml
	});
}()