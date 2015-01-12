var myapp = angular.module('myapp', []);

var ctrlApp = function($scope,$q){
	
		var defer  = $q.defer();
		defer.promise.then(function(weapon){
			alert(["I promise you",weapon].join('\u0020'))
			return "bow"
		})
		.then(function(weapon){
			alert(["me too",weapon].join('\u0020'))
			return "axel"
		})
		.then(function(weapon){
			alert(["and i",weapon].join('\u0020'))
		})
		defer.resolve("sword");

		$scope.model = {
			message:"This is my app!!"
		}

};

ctrlApp.$injector = ['$scope','$q']
myapp.controller('ctrlApp', ctrlApp)