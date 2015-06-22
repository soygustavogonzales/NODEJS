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
					avatar:"http://st-listas.20minutos.es/images/2013-03/357977/3963449_640px.jpg?1376242191"
			},
						{
					name:"eduardo",
					lastname:"petersen",
					age:43,
					addres:"Av hon kong",
					email:"epetersen@xmen.com",
					avatar:"http://www.zonanegativa.com/imagen/1470.jpg"
			}
			,	{
					name:"eduardo",
					lastname:"petersen",
					age:43,
					addres:"Av hon kong",
					email:"epetersen@xmen.com",
					avatar:"http://sp3.fotolog.com/photo/19/17/7/kamila_1033/1243449631589_f.jpg"
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
			template:'<div></div>',
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