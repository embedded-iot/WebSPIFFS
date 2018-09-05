
'use strict';

app.controller('menuTopCtrl', ['$scope', 'commonService', 'httpService', function($scope, commonService, httpService) {

  $scope.logout = function () {
    var url = commonService.URL_LOGOUT;
    httpService.POST(url).then(function (response) {
      if (!response.isLogin) {
        commonService.goState("login");
      }
    });
  };


}]);