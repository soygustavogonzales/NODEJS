var fs = require("fs");
console.log("starting...");
/*
	writeFileSync(ruta_del_archivo,contenido);
*/
fs.writeFile("./files/file3.txt", "hello word!!", function(){
	console.log("archivo escrito");
});
console.log("end");