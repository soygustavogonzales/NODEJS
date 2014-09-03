var myapp = angular.module('myapp', ['ngAnimate']);
myapp.controller('ctrl1', ['$scope', function ($scope) {
	this.toggle = true;
	this.toggle_ = true;
}])