var myapp = angular.module('myapp', ['ui.utils']);
myapp.controller('ctrlMyData', ['$scope','$sce',function($scope,$sce){
	$scope.paragraph = $sce.trustAsHtml("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, rem.")
}])