
'use strict';

var app = angular.module('myApp', [
  'ui.router'
]);

app.controller("MainController",['$scope', '$state', 'httpService', 'commonService', '$timeout',
	function($scope, $state, httpService, commonService, $timeout){

	var goState = function (state) {
		$state.go(state);
	};
  var isLogin = false;
	var checkLogin = function() {
		var url = commonService.URL_CHECK_LOGIN;
		// commonService.showProgress();
		httpService.GET(url).then(function (response) {
      // commonService.hideProgress();
			if (!response.isLogin) {
				goState("login");
        isLogin = true;
			}
		});
    // $timeout(function () {
    //   commonService.hideProgress();
    // 	if (isLogin == false) {
    //     goState("login");
		// 	}
    // }, 2000);
	};

	checkLogin();

}]);
