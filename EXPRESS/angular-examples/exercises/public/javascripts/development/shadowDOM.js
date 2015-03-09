var myapp = angular.module('myapp', []);
myapp.controller('ctrlData', ['$scope',function($scope){
	$scope.visitor = {
		name:"xavier",
		lastname:"charles",
		age:43,
		addres:"Av gothika",
		email:"xcharles@xmen.com"
	}
}])
myapp.directive('drvCard', ['$http','$compile', function($http,$compile){
	return {
		scope: {
			data:"="
		}, 
		controller: function($scope, $element, $attrs) {
			//console.log($scope.data)
			$scope.contact = $scope.data
		},
		restrict: 'E',
		link: function($scope, iElm, iAttrs, controller) {
			var htmlDOM = null;
				$http.get('/partials/drv-card.jade')
				.then(function(response){
					htmlDOM = $compile(response.data)($scope)[0]
				}, function(err){console.log(err.data)})
				.then(function(data){
						var root = iElm[0].createShadowRoot()
						$(root).append(htmlDOM)
				})
		}
	};
}]);