var myapp = angular.module('myapp', ['ngMaterial']);

myapp.controller('ctrlData', ['$scope','$mdSidenav', function($scope,$mdSidenav){
	$scope.openLeft = function(){
		 $mdSidenav('left').toggle();
	}
}])