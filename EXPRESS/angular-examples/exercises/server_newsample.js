var readline = require('readline'),rl = readline.createInterface(process.stdin,process.stdout);
var fs = require('fs');
var l = console.log;

rl.setPrompt('sample> ');
rl.prompt();

rl.on('line', function(line){
	var line_ = line.trim().split(' ')
	switch(line_[0]){
			case("create"):
				console.log(line)
				createLote(line_[2])
			break;
			case("remove"):
				removeLote(line_[2])
			default:
			 console.log('Escriba > create module {name_new_module}'+line.trim())
			break;
	}
	rl.prompt()
})
.on('close',function(){
		console.log("Have a great day");
		process.exit(0)
})
var createLote = function(name){
	['angularjs','css','jade'].forEach(function(type,index){
			createFile(name,type)
	})
}
var removeLote = function(name){
	['./public/javascripts/development/'+name+'.js','./public/stylesheets/'+name+'.css','./views/'+name+'.jade'].forEach(function(path,index){
		removeFile(path)
	})
}
var removeFile = function(path){
	fs.unlink(path,function(){
			l(path+" is removed")
	})
}
var createFile = function(name,type){
		var content = [],path = null;
	switch(type){
		case("angularjs"):
				content.push('var myapp = angular.module("myapp",[]);')
				path = ["./public/javascripts/development/",name,".js"].join('')
			break;
		case("jade"):
				content.push('extends layout')
				content.push('\n')
				content.push('block links')
				content.push('\tlink(rel="stylesheet",href="/stylesheets/#{app}.css/")')
				content.push('block content')
				content.push('\t#web')
				path = ["./views/",name,".jade"].join('')
			break;
		case("css"):
				path = ["./public/stylesheets/",name,".css"].join('')
			break;
	}
		content = content.join('\n')
		fs.writeFile(path,content,function(){l(path.split('/').pop()+" is created")})
}//./createFile
