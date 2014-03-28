var myChatRoom = angular.module('myChatRoom',["firebase"]);
myChatRoom.service('serviceChat', ['$firebase',function ($firebase) {
	var ref = new Firebase('https://angularfire-demo.firebaseio.com/');
	this.ref = $firebase(ref);
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
  console.log($scope.messages);
  $scope.addMessage = function() {
    $scope.messages.$add({from: $scope.user, content: $scope.message}).then(function(ref){
    	console.log(ref.name())
    });
    $scope.message = "";
  };
  /*
		De la forma anterior se esta guardando automaticamente un objeto {from:'',content:''} 
		identificado con un id unico autogenerado por Firebase en su bd.
		JIlCto9562siPT3Z7Xj :{
		 content:  'mi mensaje'
		 from: 'tavito'
		}
  */
  $scope.messages.mensajito = { //el id sera 'mensajito'
  //se podra acceder mediante: https://angularfire-demo.firebaseio.com/mensajito
  	from:"Gustavito",
  	content:"Este es un secreto"
  };
  /*
			mensajito : {
				from:"Gustavito",
	  	content:"Este es un secreto"
			}
  */
  $scope.messages.$save("mensajito");
}])