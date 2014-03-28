var myBoard = angular.module('myBoard',['firebase']);
myBoard.service('svsBoard', ['$firebase',function ($firebase) {
		var ref = new Firebase('https://senseiapp.firebaseio.com/');
		this.ref = $firebase(ref);
}]);

myBoard.controller('ctrlBoard', ['$scope','svsBoard', function ($scope,svsBoard) {
	//var board = angular.element('#board');
	var canvas = angular.element('canvas');
	var ctx = canvas.getContext('2d');
	
	$scope.boardRef = svsBoard.ref;	
	$scope.boardRef.$bind($scope,'coords');
	console.log($scope);
	console.log($scope.coords);
}]);