var fs = require('fs');
var jade = require('jade');
var extend = require('extend');

var jade2html = function(opt){

	if(Object.prototype.toString.call(opt)=="[object Object]"){
		var default_ = {
			path:'',
			opts:{},
			data:{}
		}
	opt = extend(default_,opt);
	console.log(opt)

		switch(true){
			case(typeof(opt.path)!="string"):
				var err = new Error("WARNING! path option isn't a 'String'")
				console.error(err.message)
				break;
			case(!(Object.prototype.toString.call(opt.opts)=="[object Object]")):
				var err = new Error("WARNING! opts options isn't a Json object")
				console.error(err.message)
				break;
			case(!(Object.prototype.toString.call(opt.data)=="[object Object]")):
				var err = new Error("WARNING! data options isn't a Json object")
				console.error(err.message)
				break;
		}
			if(err&&err instanceof Error&&(err.message).trim())
				return err
			var path = opt.path
			opts = opt.opts
			data = opt.data;	
			var jadeTemp = jade.compile(fs.readFileSync(path,'utf8'),opts);
			var html = jadeTemp(data)
		return html
	}

		return new Error("WARNING! JSON obejct is required for jade2html(\n{\n\tpath:String,\n\topts:JSON,\n\tdata:JSON\n}\n)");
}
module.exports = jade2html