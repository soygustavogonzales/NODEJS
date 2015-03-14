var myapp = angular.module('myapp',[]);
myapp.directive('drvHello', [function(){
	return {
		restrict:'E',
		controller: function($scope, $element, $attrs) {
				console.log($element.find('template'))
		},
		templateUrl: 'partials/ele-hello',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])