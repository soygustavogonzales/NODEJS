var fs = require("fs");
console.log("starting...");
/*
	writeFileSync(ruta_del_archivo,contenido);
*/
var files = [
	'./files/file1.txt',
	'./files/file2.txt',
	'./files/file3.txt',
	'./files/file4.txt',
	'./files/file5.txt'
]
files.forEach(function(val,index){
		fs.writeFile(val, "Feliz dia a todos!!", function(){
			console.log("WRITE ON FILES succefull!!");
		});
});
console.log("end");