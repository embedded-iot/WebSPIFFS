
'use strict';

app.controller('loginCtrl', ['$scope', 'commonService', '$state', 'httpService', function($scope, commonService, $state, httpService) {
  var vm = this;
  vm.username = "John";
  vm.password = "Doe";

  vm.login = function () {
    var data = {
      "username": vm.username,
      "password": vm.password
    };
    var url = commonService.URL_LOGIN;
    httpService.POST(url, data).then(function (response) {
      console.log(response)
    });
  }
}]);