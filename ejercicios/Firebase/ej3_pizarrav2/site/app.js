var http = require('http'),
express = require('express'),
firebase = require('firebase'),
app = express(),
l = console.log,
server = http.createServer(app);

app.configure(function(){
	app.set('port',8080||process.env.PORT)
	app.set('views','views')
	app.set('view engine','jade')
	app.locals.pretty = true;//por default es false, true es para que no comprima el .html resultante y pueda visualizarse y leerse el archivo.
	app.use(express.static('public'));
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
	l("Server runing in port: %D "+app.get('port'));
});