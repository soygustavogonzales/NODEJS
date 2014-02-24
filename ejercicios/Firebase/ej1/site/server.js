var http = require('http'),
express = require('express'),
firebase = require('firebase'),
rootRef = new firebase('https://app2.firebaseIO.com');
/*
rootRef.set({
	users:{
		"erick":{
			name:"erick",
			lastname:"gonzales",
			age:21
		},
		"omar":{
			name:"Omar",
			lastname:"Gonzales",
			age:21
		}
	}
});
*/

app = express(),
l = console.log,
server = http.createServer(app);


app.configure(function(){
	app.set('port',process.env.PORT||4530);
	app.set('views','views');
	app.set('view engine','jade');

	app.use(express.static("public"));
	app.use(app.router);
	app.use(function(req,res){
		res.send(404,"<strong>OOPS !! Page not found :)</strong>");
	});
});

app.get('/',function(req,res){
	res.render('index.jade',{
		pretty:true//true:comprime, false:no comprime; Para que comprima el .html resultante aunque por default es false
	})
})
server.listen(app.get('port'),function(){
	l("Server runing in PORT:" + app.get('port'));
})
