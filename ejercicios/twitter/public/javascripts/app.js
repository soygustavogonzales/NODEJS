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
}]);

myapp.controller('ctrlListTwitts', ['svcSocket','$scope', function(svcSocket,$scope){
			svcSocket.on('connect', function(){
					$scope.find = function(query,$event,list){
						console.log(list)
						//console.log($event.keyCode)
						if($event.keyCode==13&&query){
							console.log("searching >")
										svcSocket.emit('search',{query:query,list:list})
										$scope[list] = new Array()
						}
					}
			})
	svcSocket.on('new_tweet',function(opt){
		//console.log(opt)
		//console.log($scope)

		$scope[opt.list].push(opt.text)
	})

}]);
/*
myapp.directive('', ['', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);

*/
/*
var socket = io.connect(location.host)

socket.on('connect',function(){
	socket.emit('search',{query:'justin'})
});
socket.on('new_tweet',function(data){
	console.log(data)
})
*/