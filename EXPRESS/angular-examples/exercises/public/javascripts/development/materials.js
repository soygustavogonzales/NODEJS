var myapp = angular.module('myapp', ['ngMaterial']);
myapp.controller('ctrlData'	, ['$timeout', 'svcPersons', DemoCtrl])
myapp.service('svcPersons',['$q','$http',function($q,$http){
	this.getPersonsByQuery = function(query){
  	 var config = {
        params: {
            'rows': 10,
            'value': query,
            'lname': '{lastName}',
            'tel': '{phone|format}',
            'callback': "JSON_CALLBACK"
        }
    }
    
    return $http.jsonp("http://www.filltext.com", config, {});
	}
}]);

function DemoCtrl ($timeout, svcPersons) {
  var self = this;

  // list of `state` value/display objects
  self.states        = loadAll();
  self.selectedItem  = null;
  self.searchText    = null;
  self.querySearch   = querySearch;
  self.simulateQuery = false;
  self.isDisabled    = false;

  function querySearch (query) {
  	/*
  	*/
    var promise = svcPersons.getPersonsByQuery(angular.lowercase(query))
    promise.then(function(response){
    		console.log(response.data)
    		return response.data;
    }, function(err){
    	console.log(err);
    });

    var results = query ? self.states.filter( createFilterFor(query) ) : [],deferred;
    //console.log(self.states);
    //console.log(self.states.filter( createFilterFor(query)	))
    console.log(results)
    		return results;


  }

  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

    return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
    });
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
  		//console.log(query);
    var lowercaseQuery = angular.lowercase(query);
    //console.log(lowercaseQuery);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };

  }
}