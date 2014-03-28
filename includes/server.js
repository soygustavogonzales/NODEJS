var html = require('html'),
				express = require('express'),
				jade = require('jade'),
				app = express(),
				routes = require('./routes/index.js')
				server = http.createServer(app);
				app.configure(function(){
					app.set(express.static(__dirname+"/public"));
					app.set('port',4530);
					app.use(app.router);
					app.use(express.bodyParser());
					app.use(function(err,req,res,next){
						res.status(err.status||404);
						res.send(err.message||"<h1>OOPS!!page not found</h1>");
					})
				})



				server.listen(app.get('port'),function(){
					l('Server runing in port: '+app.get('port'))
				})
