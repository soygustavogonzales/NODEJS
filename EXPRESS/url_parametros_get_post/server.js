var http = require('http'),
	express = require('express'),
	app = express(),
	l = console.log; //obly development
app.configure(function(){
	app.use(app.router);
	app.use(express.bodyParser());
	app.use(express.static('public'));
	app.set('port',process.env.PORT||8080);
	app.set('view engine','jade');
});

app.get('/',function(req,res){
	res.render('index.jade',{
		title:'My index'
		,pretty:true
	});
});


 app.get('/product',function(req,res){
	"request template:/product?order=desc&shoe[color]=blue&shoe[type]=converse"
	/*
	*/
	l(req.query);
	var producto = req.query.producto,//un string
	color = req.query.color,//un string
	tipo = req.query.tipo,//un string
	multiple = req.query.multiple,//un array
	check = req.query.check,//un array
	radio = req.query.radio;//un string

	//Envio los valores parseados como un JSON.
	res.json({
		producto:producto,
		color:color,
		tipo:tipo,
		multiple:multiple,
		check:check,
		radio:radio
	});
});

//app.post('/users')
http.createServer(app).listen(app.get('port'),function(){
	l("SERVER RUNINIG IN :_"+app.get('port'))
});