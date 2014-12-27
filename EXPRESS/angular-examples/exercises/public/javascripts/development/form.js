/**
* myapp Module
*
* Description
*/
var myapp = angular.module('myapp', []);
myapp.controller('ctrlForm', ['$scope', function($scope){
	$scope.validate = function(){
		console.log("validando")
	}

}]);

myapp.directive('dni', [function(){
	// Runs during compile
	return {
		require: 'ngModel',
		controller:function($scope){
			$scope.clear = function(){
				if($scope.dni)
					$scope.dni = $scope.dni.replace(/[^0-9]/ig,'');
				//console.log($scope)
			}
		},
		link: function($scope, ele, attrs, ngModel) {
			ele.bind('keydown',function(event) {
				if($scope.dni&&$scope.dni.length<8){
						console.log($scope.dni.length<8)
						//ngModel.$setValidity(false)
				}
				else{

						ngModel.$setValidity(true)
						console.log($scope.dni.length<8)
				}
						/*
								$scope.$apply(function(){
									console.log($scope)
									ngModel.$setViewValue("123")
									ngModel.$render()

								})
						*/
				
			});
		}
	};
}]);