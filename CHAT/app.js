var app=module.exports=express.createServer(),
io=require('socket.io').listen(app);

app.listen(3000);
ap.get('/',function(req,res){
	res.sendfile(__dirname+'index.html');
});

io.sockets.on('connection',function(socket){
	socket.emit('bienvenido',{text:'YA STAS CONECTADO'});
});