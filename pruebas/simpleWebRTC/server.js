var http = require('http'),
express = require('express'),
app = express(),
server = http.createServer(app);

app.get('/',function(req,res){
	res.sendfile(__dirname+'/prueba.html')
	console.log();
})

server.listen(8080,function(){
	console.log("server runing in port: "+8080);
})
