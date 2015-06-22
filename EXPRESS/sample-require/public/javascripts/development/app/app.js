define(['angular','controllers/ctrlMain'],function(angular,ctrlMain){
	var myapp = angular.module('myapp',[]);
	//var ctrlMain = require('controllers')
	myapp.controller('ctrlMain', ['$scope', ctrlMain])
	return myapp;
});