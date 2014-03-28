var http = require('http'),
express = require('express'),
firebase = require('firebase'),
app = express(),
l = console.log,
server = http.createServer(app);

app.configure(function(){
	app.set('port',8081||process.env.PORT)
	//app.set('views','views')
	app.set('view engine','jade')
	app.use(app.router);
	app.locals.pretty = true;//por default es false, true es para que no comprima el .html resultante y pueda visualizarse y leerse el archivo.
	app.use(express.static(__dirname+'/public'))
	app.use(express.bodyParser());

	//app.use('/views',express.static(__dirname+'/views'))
		app.use(function(err,req,res,next){
	 	res.status(err.status||404)
			res.send(err.message)
	 });
	/*
	*/
			app.use(function(req,res){
				res.send(404,"<h1>OOPS!! PAGE NOT FOUND </h1>")
			});
})
/*
*/
app.get('/',function(req,res){
	res.render('index.jade');
})

server.listen(app.get('port'),function(){
	l("Server runing in port: %s ",app.get('port'));
});