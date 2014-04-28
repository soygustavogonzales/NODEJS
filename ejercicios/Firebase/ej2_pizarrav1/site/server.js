var http = require('http'),
express = require('express'),
app = express(),
server = http.createServer(app);
app.configure(function(){
	app.set('port',4380||process.env.PORT);
	app.use(express.static("public"))
	app.use("views","views");
	app.set("view engine","jade");
})



app.get('/',function(req,res){
	res.render('index.jade');
})

server.listen(app.get('port'),function(){
	console.log("Server runing in port %d ",app.get('port'));
});

