var express = require('express'),
app = express(),
PORT = 3001,
HOST = 'localhost';

app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.session({secret: 'this is a secret'}))//el objeto(HASH) dentro no tiene mucha relevancia
	app.use(app.router);
	app.use(express.static("/public"));
});

app.get('/name/:name',function(req,res){
	req.session.name = req.params.name;
	res.send('<p>To see the session in action,<a href="/name">GO HERE!</a></p>')
});

app.get('/name',function(req,res){
	res.send('el nombre es: <h1>'+req.session.name+'</h1>'+'<a href="/delete">CERRAR SESION</a>');

})

app.get('/delete',function(req,res){
	res.send('la sesion de <strong>'+req.session.name+'<strong> Se cerrará');
	delete req.session.name;
});

app.listen(PORT,function(){
	console.log("El server esta escuchando es "+PORT);
});