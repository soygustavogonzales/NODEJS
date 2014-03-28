var http = require('http'),
express = require('express'),
app = express(),
l = console.log,
server = http.createServer(app);
app.configure(function(){
	app.set('port',4560||process.env.PORT)
	app.use(app.router)
	app.use(express.static("public"))
	app.use(function(req,res){
		res.send(404,"OOPS page not found!!")
	})
	/*
	app.use(function(err,req,res,next){
		res.status = err.status||404;
		res.send(err.message);
	})
	*/
})

var users = [
	{name:"Neo"},
	{name:"Robin"},
	{name:"Bruno"},
	{name:"Clark"},
];

function loadUser(req,res,next){
	var user = users[parseInt(req.params.userId,10)];
	//if(user){
		req.user = user; 
		next(req.user);
		//l(req.user)

	//}
	/*
	else{
		var err = new Error('user not found');
		err.status = 404;
		next(err);
	}
	*/
}

app.get("/users/:userId",loadUser,function(req,res){
	//l("user: "+ req.user)
	res.json(req.user)
})

server.listen(app.get('port'),function(){
	l("Server runing in port: "+app.get('port'))	
});