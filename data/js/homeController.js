
'use strict';

app.controller('homeCtrl', ['$scope', 'commonService', 'httpService', function($scope, commonService, httpService) {
  var vm = this;

  vm.list = [];

  vm.add = function () {
    commonService.goState("message", {indexMessage: vm.list.length});
  };

}]);