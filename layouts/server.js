var http = require('http'),
				express	= require('express'),
				PORT = 4530,
				app = express();
				
				app.configure(function(){

					app.set("port",process.env.PORT||PORT);
					app.set("views","views");//error al coocar asi: /views
					app.set("view engine","jade");

					app.use(express.cookieParser());
					app.use(app.router);
					app.use(express.static(__dirname +"/public"));
					app.locals.pretty = false;
				});

				app.get('/',function(req,res){
					res.render('index.jade');	
				});
				app.get('/admin/:name',function(req,res){
					var name = req.params.name;
					if(name){
					res.render('admin.jade'
						,{name:name,
							lastname:'gonzales',
						 age:23}
						);
					}
				})
				var server = http.createServer(app);
				server.listen(app.get("port"),function(){
					console.log("server running in :"+app.get("port"));
				});



