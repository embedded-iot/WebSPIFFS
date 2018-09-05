
'use strict';

app.controller('messageCtrl', ['$scope', 'commonService', 'httpService', function($scope, commonService, httpService) {
  var vm = this;

  $scope.title = "Hello World!";
  $scope.scroll = true;
  $scope.duration = 10000;

  $(document).ready(function(){
    var slider = $('.simple-slider');
    slider.jRange({
      from: 1,
      to: 100,
      step: 1,
      format: '%s',
      width: slider.parent().width()
    });
  });


  vm.list = [];

  vm.add = function () {
    commonService.goState("message", {indexMessage: vm.list.length});
  };

}]);