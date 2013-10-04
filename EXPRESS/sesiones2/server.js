var express =require("express"),
	app=express(),
	server=require('http').createServer(app),
	cons= require('consolidate'),
	path = require("path");
	app.engine('.jade',cons.jade);//utilizo consolidate
	app.set('view engine','jade');
	
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({secret: 'mi secreto'}));

	app.use(express.static('./public'));
	
	app.get('/',function  (req, res) {
		res.render("index.jade");
	});
	
	app.post('/ver',function (req,res) {
		req.session.mivariable=req.body.nombre;
		res.render('ver.jade',{Titulo:'Ver variable', Nombre:req.session.mivariable});
		/*
	Notar que a la pagina que se esta renderizando le estoy pasando
	una variable, Nombre: req.session.mivariable
		*/
	});
	app.get('/ver',function (req,res) {
		if(typeof req.session.mivariable!='undefined'){
			res.render('ver.jade',{Titulo:'Ver variable', Nombre:req.session.mivariable});
		}else{
			res.render('ver.jade',{Titulo:'Ver variable', Nombre:'la variable no existe'});
		}
	});
	app.get('/cerrar',function (req,res) {
		delete req.session.mivariable;
		res.render('destruir.jade');
	});
	server.listen(3000);