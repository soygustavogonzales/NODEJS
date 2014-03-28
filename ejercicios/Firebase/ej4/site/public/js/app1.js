var myChatRoom = angular.module('myChatRoom',["firebase"]);
myChatRoom.service('serviceChat', ['$firebase',function ($firebase) {
	var ref = new Firebase('https://angularfire-demo.firebaseio.com/');
	this.ref = $firebase(ref);
  this.chatPrivate = this.ref.$child('privates');
}]);
/*
myChatRoom.factory('serviceChat', ['$firebase',function ($firebase) {
	var ref = new Firebase('https://angularfire-demo.firebaseio.com/');
	return $firebase(ref);
}]);
*/
myChatRoom.controller('chatCtrl', ['$scope','serviceChat', function ($scope,serviceChat) {
  $scope.user = "Guest " + Math.round(Math.random()*101);
  $scope.messages = serviceChat.ref;
  $scope.privates = serviceChat.chatPrivate;
  console.log($scope.privates);
  //var privates = $scope.messages.$child('privates');
  //console.log(privates);
  //$scope.privates.$bind($scope,'privates');
  //$scope.privates.$add({from:'tavito',content:'msjito'});
  var cont = 0;
  $scope.addMessage = function(){
    $scope.privates.$add({
      from:$scope.user,
      content:$scope.message
    })
    /*
    $scope.privates['msj-'+$scope.user+'-'+cont] = {
      from:$scope.user,
      content:$scope.message
    }
    */
    cont++;
  }
  $scope.mostrarIndices = function(){
    var keys = $scope.privates.$getIndex();
    angular.forEach(keys, function(value,keys){
      console.log(value);
    });
  
    $scope.privates.$transaction(function(a){
      console.log(a);
    });

  } 
  
  $scope.borrarMsjs = function(){
    $scope.privates.$set({});
  }
}])