
'use strict';

app.controller('menuTopCtrl', ['$scope', 'commonService', 'httpService', '$state', function($scope, commonService, httpService, $state) {

  $scope.logout = function () {
    var url = commonService.URL_LOGOUT;
    httpService.POST(url).then(function (response) {
      if (!response.isLogin) {
        console.log("Logout");
        commonService.goState("login");
      }
    });
  };

  $scope.stateCurrent = $state.current.name;


}]);