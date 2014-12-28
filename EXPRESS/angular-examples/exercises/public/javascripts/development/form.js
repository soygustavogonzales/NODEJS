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
			//console.log(attrs)
			var input = ele.find('input')
			var js = JSON.parse(eval(JSON.stringify(attrs.ngg)))
			for(ngAttr in js){
					input.attr(ngAttr, js[ngAttr])
			}
			myapp["drv-dni"] = new Array()
			myapp["drv-dni"].push(attrs)
			for(key in attrs.$attr){
				if(key==="ngg"||key==="opts")
					continue
				//console.log(key)
				input.attr(key, attrs[key])
			}
		}
		,templateUrl:"/partials/dni-input"
		,controller:function($scope,$sce){
			/*
			*/
			var lastItem = myapp["drv-dni"][myapp["drv-dni"].length-1]
			var opts = JSON.parse(eval(JSON.stringify(lastItem.opts)))
			var form = opts.nameForm
			//console.log(opts.nameForm)
			var maxlength = lastItem.maxlength
			var js = JSON.parse(eval(JSON.stringify(lastItem.ngg)))
			//console.log(js)
			var ngModel_ = js["ng-model"]
			//$scope[form][ngModel_].$setValidity("minlength",false)
			console.log($scope[form].dni)
			$scope.clear = function(){
				//console.log($scope[form])
				console.log($scope[ngModel_])
				if($scope[ngModel_]&&lastItem.required!=undefined) {
					$scope[ngModel_] = $scope[ngModel_].replace(/[^0-9]/ig,'');
					if(lastItem.maxlength)
						if($scope[ngModel_].length==maxlength)
							$scope[form][ngModel_].$setValidity("minlength",true)
						else
							$scope[form][ngModel_].$setValidity("minlength",false)
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