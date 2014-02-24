var http = require('http')
	express = require('express'),
  jade = require('jade'),
		fs =require('fs'),
	app = express(),
	l=console.log,
	server = http.createServer(app);
	/*
		http.createServer(app).listen(PORT);
	*/

app.configure(function(){
	 //app.set('port',PORT);
	 app.set(express.static(__dirname + "/public"));
	 app.set('view engine','jade');
	 //app.use('views','views')
	 app.set('port',8081||process.env.PORT);
	 app.use(app.router);
	 app.use(express.bodyParser());
	 app.use(function(req,res){
	 	res.send(404,"<h1>OOPS!!page not found</h1>")
	 });
		app.use(function(err,req,res,next){
	 	res.status(err.status||404)
			res.send(err.message)
	 });
	 /*
	 */
});

app.get('/',function(req,res){
	res.render("index",{
		name:'Erick',
		lastname:'Gonzales'
	});
});


app.get('/users/:username/:userLastname',function(req,res,next){
	var name = req.params.username;
	var lastname = req.params.userLastname;

	if(name == 'andrew'){

			var error = new Error('User not exist')
			error.status = 500;
			 next(error);
	} else{
		var jadeTemp = jade.compile(fs.readFileSync(__dirname+'/views/index.jade','utf8'),{pretty:true});
				var html = jadeTemp({
					name:name,
					lastname:lastname
				})
				l(html)
				res.send(html)
	}
});

server.listen(app.get('port'),function(){
	l("Servidor corriendo en el puerto: "+app.get('port'));
});
