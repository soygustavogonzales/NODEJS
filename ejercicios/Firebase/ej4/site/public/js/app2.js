/*
NOTA: EL METODO $bind NO SURTE EFECTO
ver : https://www.firebase.com/docs/angular/reference.html#bind-scope-model
para detalles de sus ventajas
*/var myChatRoom = angular.module('myChatRoom',["firebase"]);
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
  console.log($scope.messages);
  //$scope.privates.$add({from:'tavito',content:'bla bla'});
  $scope.messages.$bind($scope,'remote');
  console.log($scope);
  console.log($scope['remote']);

}])