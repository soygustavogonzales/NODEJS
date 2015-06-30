
	var ctrlMain = function($scope){
		$scope.name = "mama.."
	};

	var myapp = angular.module('myapp',[]);
	//var ctrlMain = require('controllers')
	myapp.controller('ctrlMain', ['$scope', ctrlMain]);
