/**
* myapp Module
*
* Description
*/
var myapp = angular.module('myapp', []);
myapp.controller('ctrlForm', ['$scope', function($scope){
	$scope.validate = function(){
		console.log("validando")
	}

}]);
myapp.factory('ftyConnections', [function(){
	return {
		getName : function(){
			return "GG"
		}	
	};
}]);

myapp.directive('dni', ['ftyConnections','$http',function(ftyConnections,$http){
	// Runs during compile
	return {
		restrict:"E"
		,require: 'ngModel'
		,compile:function(ele,attrs){
			console.log(attrs)
			var input = ele.find('input')
			var js = JSON.parse(eval(JSON.stringify(attrs.ngg)))
			for(ngAttr in js){
					input.attr(ngAttr, js[ngAttr])
			}
			myapp["drv-dni"] = attrs
			for(key in attrs.$attr){
				if(key==="ngg")
					continue
				console.log(key)
				input.attr(key, attrs[key])
			}
		}
		,templateUrl:"/partials/dni-input"
		,controller:function($scope,$sce){
			//console.log($sce)
			console.log($scope.form)
			console.log(myapp["drv-dni"].required!=undefined)
			$scope.clear = function(){
				if($scope.dni&&myapp["drv-dni"].required!=undefined) {
					$scope.dni = $scope.dni.replace(/[^0-9]/ig,'');
					if($scope.dni.length<8)
						$scope.form.dni.$setValidity("minlength",false)
					else
						$scope.form.dni.$setValidity("minlength",true)
				}
			}//.clear
		}
		,link: function($scope, ele, attrs, ngModel) {
			/*
			ele.bind('keydown',function(event) {
			});
			*/

		}
	};
}]);