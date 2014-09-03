var myapp = angular.module('myapp',['ngAnimate']);
myapp.controller('ctrl1', ['$scope', function ($scope) {
	$scope.items = [];
	
	$scope.addItems = function(){
		for (var i = 10; i --;) {
			$scope.items.push({
				'title':'item'+i
			})
		};
		$scope.clearItems = function(){
			$scope.items.length = 0;
		}
		$scope.removeItems = function(index){
			$scope.items.splice(index,1);
		}

	}

}])