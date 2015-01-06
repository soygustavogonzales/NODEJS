var myapp = angular.module('myapp', []);

var ctrlApp = function($scope,$q){
	 $scope.addOne = function(num){
	 	var q = $q.defer()
	 	if(angular.isNumber(num))
	 		q.resolve(num+1)
	 	else
	 		q.reject('NaN')
	 	return q.promise
	 } 	
	 $scope.myValue = 0;
	 $scope.promise = $scope.addOne($scope.myValue)
	 $scope.promise
	 .then(function(v){return $scope.addOne(v)})
	 .then(function(v){return $scope.addOne(v)})
	 .then(function(v){return $scope.addOne(v)})
	 .then(function(v){return $scope.addOne(v)})
	 .then(function(v){$scope.myValue = v},
	 	function(err){
	 			$scope.myValue = err
	 	})
};

ctrlApp.$injector('$scope','$q')
myapp.controller('ctrlApp', ctrlApp)