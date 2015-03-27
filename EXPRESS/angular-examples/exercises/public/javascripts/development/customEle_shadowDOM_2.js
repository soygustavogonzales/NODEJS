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
									  prototype: Object.create(HTMLElement.prototype),
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
myapp.directive('drvCard',['$compile',function($compile){
	return {
			restrict:'E',
			template:'<div><h3>My passport</h3></div>',
			link:function($scope, iElm, iAttrs){
					console.log(iElm);
					// Create a new object based of the HTMLElement prototype
					var CardProto = Object.create(HTMLElement.prototype);

					// Set up the element.
					CardProto.createdCallback = function() {
					    // Create a Shadow Root
					    console.log(this.dataset);
					    var shadow = this.createShadowRoot();
					    var html_ = []
					    html_.push('<img class="product-img" src="'+this.dataset.img+'"></img>')
					    html_.push('<a class="product-name" href="'+this.dataset.url+'">click here</a>')
					    var html = html_.join('')
					    //var f = document.createDocumentFragment()
					    var f = document.createElement('div')
					    f.innerHTML = html
					    console.log(f);
					    //var  node = document.createElement(html)
					    shadow.appendChild(f);
					    /*
					    */
					};

					// Register the new element.
					var card = document.registerElement('drv-card', {
					    prototype: CardProto
					});

					var drvCard = document.createElement('drv-card');
					var $drvCard = $(drvCard)
					drvCard.dataset.name = "Ruby";
					drvCard.dataset.img = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/ruby.png";
					drvCard.dataset.url = "http://example.com/1";
					iElm.append($drvCard)
			}
	}
}]);	