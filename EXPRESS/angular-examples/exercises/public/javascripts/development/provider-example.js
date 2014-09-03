/*
Problemas para que funcione el provider:
El provider por teoria se ejecuta antes que la propia aplicacion .
*/

var myapp = angular.module('myapp',[]);
/*

NOTAS: 
Existen dos fases en el ciclo de vida de una aplicacion en angularjs
Fase1: fase de configuracion.
  Se configuran e inicializan todos los providers,
   los servicios no estan disponibles pues aun no estan creados.
Fase2: fase de arranque.
  Aqui ya se crean los servicios
*/
myapp.constant('tweets', [
  {
    id:1
    ,tweet:"hello word"
  },
  {
    id:2
    ,tweet:"fuck you us"
  }
])

myapp.service('svcData', ['$http',function ($http) {

  this.reload = function(metodo){
    $http.get('/users/luis').then(metodo(data))
  }

}])

myapp.provider('play', [function () {

  var data = null;

  this.loadData = function(value){
    data = value
  }

  this.$get = [function() {

    return {
      data:data   
    };

  }];

}])

myapp.provider('game', [function () {

  var data_ = null

  this.reloadData = function(value) {
    data_ = value;
  }

  this.$get = function() {
    return data_
  };

}])

myapp.config(['gameProvider','playProvider','tweets',function (game,play,tweets) {
  //svcData.reload(play.loadData)
  $.get('/users/luis', function(data) {
    play.loadData(data)  
  });

  game.reloadData({
      name:"gustavo",
      lastName:"gonzales"
    })  
}])
/*
*/

myapp.controller('ctrlOne', ['$scope','$http','game','play', function ($scope,$http,game,play) {
  //"http://www.filltext.com/?callback=JSON_CALLBACK&rows=5&fname={firstName}&lname={lastName}"
  /*
    $http.jsonp().
    success(function (data) {
          console.log(data);
        //data = data
    })
  */
  console.log(play)
}])