var myapp = angular.module('myapp', ['ngResource'])
var l = console;
myapp.service('api', ['$http',function ($http) {
	var src = "https://api.mongolab.com/api/1/databases/",
	apiKey = "apiKey=0oCyMLZSK6EP9cmujUBHImYf2Pnh-bRT";
	var parserQuery = function(queryFirst,queryLast){
		return src+queryFirst+apiKey+(queryLast||"")
	}

	this.get = function(queryFirst,queryLast){
		return $http.get(parserQuery(queryFirst,queryLast))
	}

	this.post = function(queryFirst,queryLast,data){
		return $http.post(parserQuery(queryFirst,queryLast),data,
			{headers:{
			"Content-Type": "application/json"
		}})
	}
	this.put = function(queryFirst,queryLast,data){
		return $http.put(parserQuery(queryFirst,queryLast),data,
			{headers:{
			"Content-Type": "application/json"
		}})
	}
	this.delete = function(queryFirst,queryLast){
		return $http.delete(parserQuery(queryFirst,queryLast))
	}

}])

myapp.controller('ctrl1', ['$scope','api', function ($scope,api) {
	$scope.data = null;

	api.get("puls3/collections/admin?","&q={'nombre':'Mario'}").then(function(data){
		$scope.data = data
	})
/*
	api.post("puls3/collections/admin?","",
		
			{
				nombre:"Mario",
				apellido:"Rengifo"
			}
		)
	.then(function(){
		l.log("success")
	})

	api.put("puls3/collections/admin?","&q={'_id':{'$oid': '53bb213ce4b0929e353e1e80'}}",
		JSON.stringify({
					"$set":{
							"nombre":"Yoel",
							"apellido":"Chlimper"
						}
				})).then(function(data){
		l.log("success put")
	})

*/
//Un pseudo-borrado, no borra sino que reemplaza todo el campo por vacio, pero el _id se mantiene
	api.put("puls3/collections/admin?","&q={'nombre':'Mario'}",
				{}).then(function(data){
		l.log("success put")
	})

/*
	api.delete("puls3/collections/admin/53bb1eb1e4b0929e353e06b8?").then(function(){
		l.log("deleted successful")
	})
	api.delete("puls3/collections/admin?","&q={'nombre':'Mario'}").then(function(){
		l.log("deleted successful")
	}).then(function () {
		l.log("deleting error!!")
	})
*/
/*
	$.ajax( { url: "https://api.mongolab.com/api/1/databases/puls3/collections/admin/53bb2227e4b08d550956c50c?apiKey=0oCyMLZSK6EP9cmujUBHImYf2Pnh-bRT",
		  type: "delete",
		  async: true,
		  timeout: 300000,
		  success: function (data) { },
		  error: function (xhr, status, err) {l.log("error deleting") } } );

*/
	/*
		$.ajax({
			url: 'https://api.mongolab.com/api/1/databases/puls3/collections/admin?apiKey=0oCyMLZSK6EP9cmujUBHImYf2Pnh-bRT&q={"_id":53bb213ce4b0929e353e1e80}',
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({"$set":{
								nombre:"Yoel",
								apellido:"Chlimper"
							}})
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	*/
	$scope.$watch('data',function(data){
		if($scope.data)
			console.log($scope.data.data)
	})
		

}])