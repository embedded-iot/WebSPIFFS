
'use strict';

var app = angular.module('myApp', [
  'ui.router',
  'angular-marquee'
]);

app.controller("MainController",['$scope', '$state', 'httpService', 'commonService',
	function($scope, $state, httpService, commonService){

	var goState = function (state) {
		$state.go(state);
	};

	var checkLogin = function() {
		var url = commonService.URL_CHECK_LOGIN;
		httpService.GET(url).then(function (response) {
			if (!response.isLogin) {
				goState("login");
			}
		});
	};

	checkLogin();

}]);
