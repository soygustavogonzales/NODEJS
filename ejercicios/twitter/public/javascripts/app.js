"use stritc";

var myapp = angular.module('myapp',['ngMaterial']);
myapp.service('svcSocket', ['$rootScope', function($rootScope){
	var socket = io.connect(location.host)
	this.on = function(eventName,callback){
		 socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
   					});
   })
	};
	this.emit = function(eventName,data,callback){
   socket.emit(eventName, data, function () {
     var args = arguments;
     $rootScope.$apply(function () {
       if (callback) {
         callback.apply(socket, args);
       }
     });
   })
	};
}])

myapp.controller('ctrlListTwitts', ['svcSocket','$scope', function(svcSocket,$scope){
	$scope.twitts = []

	svcSocket.on('connect', function(){
			svcSocket.emit('search',{query:'justin'})
	})
	svcSocket.on('new_tweet',function(data){
		//console.log(data)
		$scope.twitts.push(data)
	})

}])

/*
var socket = io.connect(location.host)

socket.on('connect',function(){
	socket.emit('search',{query:'justin'})
});
socket.on('new_tweet',function(data){
	console.log(data)
})
*/