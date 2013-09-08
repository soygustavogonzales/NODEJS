var fs=require("fs");
console.log("starting");
fs.readFile("sample.txt",function(error,data){
	console.log("Contents of file: "+data);
});
console.log("Finished...");