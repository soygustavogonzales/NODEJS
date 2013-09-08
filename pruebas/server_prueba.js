var http=require('http');/*importando el modulo http*/
function peticionServidor(req,resp){
	console.log("Peticion enviada");
	resp.writeHead(200,{'Content-type':'text/html'});
	resp.write("<h1>Bienvenido a node.js A.BONILLA</h1>");
	resp.end("hi mundo");

}

http.createServer(peticionServidor).listen(1337,'127.0.0.1');
console.log("server runing at http://127.0.0.1:1337/");