var express=require("express");
app=express(),
server=require(lib).createServer(app),
cons=require("consolidate"),
path=require("path");
app.engine(".html",cons.jade);
app.set("view engine","html");

app.use(express.static("./public"));
app.get("./",function(req,res){
	res.render("index");
});
app.post('/ver',function(req,res){

})