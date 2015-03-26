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
myapp.service('svcShadowDOM',['$http','$q','$compile',function($http,$q,$compile){
	var htmlDOM = null,$htmlDOM = null, Shadow = null, shadow = null,root = null,son = null;
	this.getShadowDOM = function(urlDOM,iElm,$scope){
			var q = $q.defer()
				$http.get(urlDOM)
				.then(function(response){
							htmlDOM = $compile(response.data)($scope)[0]
							//$htmlDOM = $(htmlDOM);
				}, function(err){console.log(err.data)})
				.then(function(data){
								Shadow = document.registerElement('drv-card',{
									  prototype: Object.create(HTMLButtonElement.prototype),
				  					extends: 'div'
								});
								shadow = new Shadow()
								iElm.append(shadow)
								root = shadow.createShadowRoot()
								$(root).append(htmlDOM)
								son = $(iElm.children('[is]'));
								iElm.replaceWith(son)
								q.resolve(htmlDOM)
					})

			return q.promise;
	}
}]);
myapp.directive('drvCard', ['$http','$compile','svcShadowDOM', function($http,$compile,svcShadowDOM){
	return {
		scope: {
			data:"="
		}, 
		controller: function($scope, $element, $attrs) {
			$scope.contact = $scope.data
		},
		restrict: 'E',
		link: function($scope, iElm, iAttrs, controller) {
				svcShadowDOM.getShadowDOM('/partials/drv-card.jade',iElm,$scope)
				.then(function(html){
						
						$(html).find('figure').hover(function() {
								console.log('on')
						}, function() {
								console.log('out')
						});
				})
		}
	};
}]);