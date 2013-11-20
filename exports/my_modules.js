function hello(msj){
	return msj;
}
var obj={
	name:"gustavo",
	lastname:"gonzales",
	age:23,
	dni:"46463112"
}

module.exports.hello = hello;/*Hago publico el metodo hello*/
module.exports.gustavo=obj;//exportando al objeto JSON: obj