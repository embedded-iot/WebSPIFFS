
'use strict';

app.controller('loginCtrl', ['$scope', 'commonService', 'httpService', function($scope, commonService, httpService) {
  var vm = this;
  vm.username = "MBELL";
  vm.password = "";

  var checkLogin = function() {
    var url = commonService.URL_CHECK_LOGIN;
    commonService.showProgress();
    httpService.GET(url).then(function (response) {
      commonService.hideProgress();
      if (!!response.isLogin) {
        commonService.goState("home");
      }
    });
  };

  vm.login = function () {
    var data = {
      "txtUsername": vm.username,
      "txtPassword": vm.password
    };
    var url = commonService.URL_LOGIN;
    commonService.showProgress();
    httpService.POST(url, data).then(function (response) {
      commonService.hideProgress();
      if (!!response.isLogin) {
        commonService.goState("home");
      }
    });
  };

  checkLogin();
}]);