var myapp = angular.module('myapp', ['ngMaterial']);
myapp.controller('ctrlData'	, ['$scope','$timeout', 'svcPersons', DemoCtrl])
myapp.service('svcPersons',['$q','$http',function($q,$http){
	this.getPersonsByQuery = function(query){
  	 var config = {
        params: {
            'rows': 10,
            'value': query,
            'lname': '{lastName}',
            'tel': '{phone|format}',
            'callback': "JSON_CALLBACK"
        }
    }
    
    return $http.jsonp("http://www.filltext.com", config, {});
	}
}]);

function DemoCtrl ($scope,$timeout,svcPersons) {
	//console.log($scope)
	var fiction = false
		$scope.$watch('ctrl.searchText',function(current,old){
			if($scope.ctrl.searchText){
				//console.log($scope.ctrl.searchText)
				$scope.querySearch()
			}
		})
  var self = this;

  // list of `state` value/display objects
  self.selectedItem  = null;
  self.searchText    = null;
  //self.querySearch   = querySearch;
  self.simulateQuery = false;
  self.isDisabled    = false;
  $scope.ctrl.states_ = []
  $scope.querySearch = function(){
    var promise = svcPersons.getPersonsByQuery(angular.lowercase($scope.ctrl.searchText))
    promise.then(function(response){
    		$scope.ctrl.states_ = response.data
    }, function(err){
    	console.log(err);
    })

  }

}
