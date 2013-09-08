/*
Como el metodo ejecutar fue exportado, ahora puedo utilizarlo
desde aqui con require('/ejecutar');
*/
var miServer=require('./server.js');
miServer.ejecutar();//ejecuto la funcion ejecutar que fue creada
//dentro de server.js