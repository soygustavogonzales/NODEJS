require.config({
	//baseUrl:'/javascripts/development/controllers',
	paths:{
		jquery:'/bower_components/jquery/dist/jquery.min',
		angular:'/bower_components/angularjs/angular.min'
	},
	shim:{
		'angular':{
			exports:'angular',
		},
		'jquery':{
			exports:'jquery'
		},
		'controllers':{
			dep:['controllers']
		},
		'services':{
			dep:['services']
		},
		'directives':{
			dep:['directives']
		},
		'filters':{
			dep:['filters']
		}
	}
});

require(['/javascripts/development/app/app.js']);