
'use strict';

var app = angular.module('myApp', [
  'ui.router'
]);

app.controller("MainController",['$scope', '$state', 'httpService', function($scope, $state, httpService){

	$scope.goState = function(state) {
		$state.go(state);
	};
	
	
}]);
