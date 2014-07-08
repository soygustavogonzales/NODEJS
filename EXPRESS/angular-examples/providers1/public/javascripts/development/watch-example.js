var myapp = angular.module('myapp',['ngResource'])
myapp.controller('ctrlOne', ['$scope','$http', '$resource',function ($scope,$http,$resource) {
	/*
		$resource('http://www.filltext.com/?callback=JSON_CALLBACK&rows=1&fname={firstName}').get(function(res){
			$scope.people = res
		console.log($scope.people);
		});
	*/
	$scope.getPeople = function(count){
		$http.jsonp("http://www.filltext.com/?callback=JSON_CALLBACK&rows="+count+"&fname={firstName}&lname={lastName}&company={business}")
		.success(function(data){
			$scope.people = data
				console.log($scope.people);
				if(count==1){
					$scope.theOne = $scope.people[0]
					console.log($scope.theOne);
				}
		})
	}
	$scope.countSelection = 1;
	$scope.getPeople($scope.countSelection)
	$scope.$watch('countSelection',function(newValue,oldValue){
		$scope.getPeople(newValue)
	},true)
}])
