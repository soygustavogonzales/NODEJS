var fs = require("fs"),
port = 8080,
host = "127.0.0.1",
express = require("express")
app = express(),
users = JSON.parse(fs.readFileSync("users.json"));//traigo y parseo un archivo .json
app.use(app.router);
app.use(express.static("/public"));
app.get("/",function(req,res){
	res.send("hello!!");
});
/*
	app.get("/public/:text",function(req,res){
		res.send("hello " + req.params.text);
	});
*/
app.get("/public/:id",function(req,res){//recogemos un parametro de la ruta
	var user = users[req.params.id];
	if(user){
		res.send("<a href='http://twitter.com/"+user.twitter+"'>follow "+ user.name+ " on twitter</a>");
	}else{
		res.send("OOPS user not found!!!WTF");
	}
	res.send("hello " + req.params.text);
});
app.listen(port,host);