var myapp = angular.module("myapp",[]);
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
			$scope.contact = $scope.data
		},
		restrict: 'E',
		link: function($scope, iElm, iAttrs, controller) {
			var parent = iElm.parent()
			//console.log(parent);
			var htmlDOM = null,$htmlDOM = null;
			$scope.clean = function(){
				console.log($scope.name)
			}
				$http.get('/partials/drv-card.jade')
				.then(function(response){
					htmlDOM = $compile(response.data)($scope)[0]
					$htmlDOM = $(htmlDOM);
					$htmlDOM.find('h3').click(function(event) {
						console.log("click en H3")
					});
					//console.log($htmlDOM)
				}, function(err){console.log(err.data)})
				.then(function(data){
						//$('.ocontent').append(iElm)

					var XFoo = document.registerElement('drv-card',{
						  prototype: Object.create(HTMLButtonElement.prototype),
	  					extends: 'div'
					});
					var xfoo = new XFoo()
					iElm.append(xfoo)
					var root = xfoo.createShadowRoot()
					$(root).append($htmlDOM)
					var son = iElm.children('[is]');
					iElm.remove()
					parent.append(son)
				})
		}
	};
}]);