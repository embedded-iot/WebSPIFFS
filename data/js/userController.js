
'use strict';

app.controller('userCtrl', ['$scope', 'commonService', 'httpService', function($scope, commonService, httpService) {
  var vm = this;

  var getField = function (response) {
    if (!!response) {
      vm.txtAPName = response.txtAPName;
      vm.txtAPPass= response.txtAPPass;
      vm.txtPassLogin = response.txtPassLogin;
    }
  };

  var getConfig = function() {
    var url = commonService.URL_SETTING_COMMON;
    commonService.showProgress();
    httpService.GET(url).then(function (response) {
      getField(response);
      commonService.hideProgress();
    });
  };

  vm.save = function () {
    var data = {
      "txtAPName": vm.txtAPName,
      "txtAPPass": vm.txtAPPass,
      "txtPassLogin": vm.txtPassLogin,
      "btnSaveSetting": true
    };

    var url = commonService.URL_SETTING_COMMON;
    commonService.showProgress();
    httpService.POST(url, data).then(function (response) {
      getField(response);
      commonService.hideProgress();
    });
  };

  getConfig();

}]);