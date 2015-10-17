var myapp = angular.module("myapp",[]);
myapp.controller('ctrlMain', ['$scope', function($scope){
	//var evento = document.createEvent('CustomEvent')
	//evento.initCustomEvent("on_",true,true,true);
	var hello = document.querySelector('hello-world');
	//console.log(hello)
	hello.addEventListener('say-hello',function(e){
		console.log(e.detail)
	},false)
	//console.log(hello.fire)
	hello.fire('on_',{data:'desde Angular>ctrlMain'})
	hello.addEventListener('new_val',function(e){
		console.log(e.detail)
	},false)
}])