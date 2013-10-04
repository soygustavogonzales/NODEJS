var fs = require("fs");
var pathFile = "./files/config.json";
fs.watchFile(pathFile, function(current,previous){
	/*
	cada vez que se cambie el contenido del archivo pasado en la ruta,
	se ejecutara el metodo este callback
	*/

	console.log("File changed...");
	config = JSON.parse(fs.readFileSync(pathFile));//pido al archivo y lo parseo para que lo convierta a un obj JSON
	console.log("New content file: \n",config);

});