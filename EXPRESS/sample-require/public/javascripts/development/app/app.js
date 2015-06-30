define(['angular','controllers/ctrlMain'],function(angular,ctrlMain){
	var myapp = angular.module('myapp',[]);
	myapp.controller('ctrlMain', ['$scope', ctrlMain]);
	//return myapp;
});