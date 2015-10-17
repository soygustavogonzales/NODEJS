var myapp = angular.module("myapp",['ui.router']);
myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'/partials_/home.html',
			controller:'ctrlHome'
		})
		.state('about',{
			url:'/about',
			templateUrl:'/partials_/about.html',
			controller:'ctrlAbout'
		})
		.state('users',{
			url:'/users/:userId',
			templateUrl:'/partials_/users.html',
			controller:'ctrlUsers'
		})
		.state('providers',{
			url:'/providers/:userId',
			templateUrl:'/partials_/users.html',
			controller:'ctrlUsers'
		})
}])

myapp.controller('ctrlAbout', ['$scope','$log', function($scope,$log){
	console.log(">>> ctrlAbout")
}])

myapp.controller('ctrlHome', ['$scope','$log', function($scope,$log){
	console.log(">>> ctrlHome")
	
}])

myapp.controller('ctrlUsers', ['$scope','$stateParams', function($scope,$stateParams){
	console.log($scope)
	console.log($stateParams.userId)
	
}])
