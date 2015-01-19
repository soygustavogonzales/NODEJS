var myapp = angular.module('myapp', []);

var svrPersons = function($http){
	this.getAllPersons =  function(){
		var config = {
   params: {
    'rows': 10,
    'id': '{index}',
    'fname': '{firstName}',
    'lname': '{lastName}',
    'street': '{streetAddress}',
    'email': '{email}',
    'born':'{date|1-1-1996,1-1-2015}',
    'bonus':'{numberRange|80, 500}',
    'salary':'{numberRange|1200, 8000}',
    'callback': "JSON_CALLBACK"
   }
  };
  
  return $http.jsonp("http://www.filltext.com", config, {})
	  							.then(function(response){
	  								return response.data
	  							}, function(httpErr){
	  								throw httpErr.status + " - " +httpErr.status;
	  								console.log(httpErr)
	  							})
	};
	
};

svrPersons.$injector = ['$http'];
myapp.service('svrPersons',svrPersons);

var ctrlMyData = function(svrPersons,$scope,$filter){
	$scope.personsList = null
	svrPersons.getAllPersons()
	.then(function(data){
		//esto se ejecuta cuando exista una respuesta
		$scope.users = data
			//console.log($scope.users)
	})
	.then(function(){
		$scope.users = orderBy($scope.users,'bonus','!false')
		
	})

	$scope.total = function(user){
		return user.salary + user.bonus
	}

	var orderBy = $filter('orderBy');
		
};

ctrlMyData.$injector = ['svrPersons','$scope','$filter'];
myapp.controller('ctrlMyData',ctrlMyData)

var initials = function(){
	return function(text){
		//console.log(text)
		var names = text.split(' ')
		//console.log(names)
		var holder = [];
		angular.forEach(names,function(item){
			holder.push(item.substring(0,1)+'.')
		});
		//console.log(holder.join(''))
		return holder.join('')
	}
}

myapp.filter('initials',initials)