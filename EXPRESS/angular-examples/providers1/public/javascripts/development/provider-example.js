/*
Problemas para que funcione el provider:
El provider por teoria se ejecuta antes que la propia aplicacion .
*/
var myapp = angular.module('myapp',[]);
myapp.provider('game', ['$http',function ($http) {
  var data_ = false;
  this.useTinfoilShielding = function(value) {
    data_ = !!value;
  };
  this.$get = function() {
    return data_;
  };
}])

myapp.config(['gameProvider',function (gamePrdr) {
	gamePrdr.useTinfoilShielding(true)	
}])

myapp.controller('ctrlOne', ['$scope','$http','gameProvider', function ($scope,$http,game) {
		$http.jsonp("http://www.filltext.com/?callback=JSON_CALLBACK&rows=5&fname={firstName}&lname={lastName}").
    success(function (data) {
					console.log(data);
        //data = data
   	})
}])