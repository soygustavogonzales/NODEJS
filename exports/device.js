var process = function(userAgent){
	//if(userAgent)
		var l = console;

		var Device = function(userAgent){
			this.userAgent = userAgent;
		}

		Device.prototype.getBrowser = function(){

			var resq=/(msie)|(firefox)|(chrome)|(opera)|(safari)/i.exec(this.userAgent);//resq sera una matriz que contendra las coincidencias encontradas en la cadena segun el patron
			if(resq)
				return (resq[0]);
			else
				return false;

		}

		Device.prototype.isMovile = function(){
			
			var resq=/(linux)|(macintosh)|(windows)/i.exec(this.userAgent);//resq sera una matriz que contendra las coincidencias encontradas en la cadena segun el patron

			if(resq){
				//console.log(resq[0]);
				switch(resq[0].toLowerCase()){
					case "linux":
						var resq1=/(android)/i.exec(this.userAgent);
						if(resq1)
							//l.log(resq1)
							//l.log("movile");
							return true
						else
							//l.log("pc")
						return false
					break;
				}
			}
			else{
				//l.log("movile");
				return true
			}
		}

		Device.prototype.isPc = function(){
			return !this.isMovile();
		}
		/* exec() es un metodo del objeto RegExp (Regular Expresion), En un nivel sintactico y semantico es mas eficaz
		*/

		var device = new Device(userAgent)
		return device
}		

		module.exports = process
