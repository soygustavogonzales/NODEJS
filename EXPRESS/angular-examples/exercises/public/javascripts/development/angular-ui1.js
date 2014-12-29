var myapp = angular.module('myapp', ['ui.utils']);
myapp.controller('ctrlForm', [function(){
	
}])
myapp.controller('ctrlScroll', ['$scope',function($scope){
	$scope.datasource = [
			"eric",
			"omar",
			"gustavo",
			"gloria",
			"antenor",
			"nicolas",
			"sully",
			"diego"
	]
}])