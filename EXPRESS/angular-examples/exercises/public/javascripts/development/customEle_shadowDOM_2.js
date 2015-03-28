var myapp = angular.module("myapp",[]);
myapp.controller('ctrlData', ['$scope','$timeout',function($scope,$timeout){
	$scope.visitors = [
			{
					name:"xavier",
					lastname:"charles",
					age:43,
					addres:"Av gothika",
					email:"xcharles@xmen.com",
					avatar:"http://cdn.movieweb.com/img.news/NE3IBkFlPbuF6b_1_2.jpg"
			},
			{
					name:"eduardo",
					lastname:"petersen",
					age:43,
					addres:"Av hon kong",
					email:"epetersen@xmen.com",
					avatar:"http://cdn.movieweb.com/img.news/NE9YgLqVwzy2d9_1_2.jpg"
			},
						{
					name:"eduardo",
					lastname:"petersen",
					age:43,
					addres:"Av hon kong",
					email:"epetersen@xmen.com",
					avatar:"http://cdn.movieweb.com/img.news/NE9YgLqVwzy2d9_1_2.jpg"
			},
						{
					name:"eduardo",
					lastname:"petersen",
					age:43,
					addres:"Av hon kong",
					email:"epetersen@xmen.com",
					avatar:"http://cdn.movieweb.com/img.news/NE9YgLqVwzy2d9_1_2.jpg"
			}
			,	{
					name:"eduardo",
					lastname:"petersen",
					age:43,
					addres:"Av hon kong",
					email:"epetersen@xmen.com",
					avatar:"http://cdn.movieweb.com/img.news/NE9YgLqVwzy2d9_1_2.jpg"
			}
	]

	var timer = $timeout(function(){
		console.log($scope);
	},1000)
}])
myapp.service('svcShadowDOM',['$http','$q','$compile',function($http,$q,$compile){
	var htmlDOM = null,$htmlDOM = null, Shadow = null, shadow = null,root = null,son = null;
	this.getShadowDOM = function(urlDOM,iElm,$scope){
			var q = $q.defer()
				$http.get(urlDOM)
				.then(function(response){
							htmlDOM = $compile(response.data)($scope)[0]
				}, function(err){console.log(err.data)})
				.then(function(data){
								var Elemnt = Object.create(HTMLElement.prototype);
								Elemnt.createdCallback = function() {
								    var shadow = this.createShadowRoot();
								    shadow.appendChild(htmlDOM);
								};
								try{
										var elemnt = document.registerElement(iElm[0].localName, {
										    prototype: Elemnt
										});
								}catch(e){

								}

								var drvElemnt = document.createElement(iElm[0].localName);
								iElm.replaceWith(drvElemnt)
								q.resolve(htmlDOM)
					})

			return q.promise;
	}
}]);
myapp.directive('drvCard',['svcShadowDOM',function(svcShadowDOM){
	return {
			restrict:'E',
			scope:{
				data:'='
			},
			template:'<div><h3>My passport</h3></div>',
			controller: function($scope, $element, $attrs) {
				$scope.contact = $scope.data
			},
			transclude:true,
			link:function($scope, iElm, iAttrs){
				svcShadowDOM.getShadowDOM('/partials/drv-card.jade',iElm,$scope)
				.then(function(html){
						//console.log(html);
				})

			}
	}
}]);	