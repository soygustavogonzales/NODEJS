var myapp = angular.module("myapp",[]);
myapp.directive('drvCertificate',['$http','$compile',function($http,$compile){
	return {
		scope:{
			name:"="
		},
		template:'<div><h3>Sensei Inc. Certificated to {{name}} <h3></div>',
		replace:true,
		controller:function($scope,$element,$attrs){
			//console.log($scope)
		},
		link: function($scope,iElm,iAttrs,controller){
				var XFoo = document.registerElement('drv-certificate',{
					  prototype: Object.create(HTMLButtonElement.prototype),
  					extends: 'div'
				});
				var xfoo = new XFoo()
				var $xfoo = $(xfoo)
				$xfoo.append($compile(iElm.clone())($scope))
				iElm.replaceWith($xfoo);
		}
	}
}])