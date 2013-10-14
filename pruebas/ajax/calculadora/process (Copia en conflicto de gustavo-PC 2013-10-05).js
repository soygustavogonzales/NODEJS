var process = function(ops){
	var Operaciones = function(ops){
		ops = ops || {
			a:0
			,b:0
		}
		var a = ops.a;
		var b = ops.b;

		Object.defineProperty(this,'a',{
			get : function(){
				return a;
			}
			,set : function(value){
				a = value;
			}
		});
		Object.defineProperty(this,'b',{
			get : function(){
				return b;
			}
			,set : function(value){
				b = value;
			}
		})
	}
	Operaciones.prototype = {
		sumar : function(){
			return (this.a+this.b)
		}
		,restar : function(){
			return (this.a-this.b)
		},multiplicar : function(){
			return (this.a*this.b)
		}
		,dividir : function(){
			if(this.b==0){this.b=1;this.a=0}
			return (this.a/this.b)
		}
	}
	
	var operador = new Operaciones(ops);
	return operador; 
}
module.exports = process;