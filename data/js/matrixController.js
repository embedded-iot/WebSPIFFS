
'use strict';

app.controller('matrixCtrl', ['$scope', 'commonService', 'httpService', '$window', function($scope, commonService, httpService, $window) {
  var vm = this;

  var sliderLigth = function (min, max) {
    $(document).ready(function(){
      var slider = $('.simple-slider');
      slider.jRange({
        from: min,
        to: max,
        step: 1,
        format: '%s',
        width: slider.parent().width()
      });

    });
  };

  var getField = function (response) {
    if (!!response) {
      vm.txtDisplayAcross = response.txtDisplayAcross;
      vm.txtDisplayDown= response.txtDisplayDown;
      vm.txtLightMessage = response.txtLightMessage;
      vm.txtMinLight = response.txtMinLight;
      vm.txtMaxLight = response.txtMaxLight;
    }
  };

  var getConfig = function() {
    var url = commonService.URL_SETTING_MATRIX;
    httpService.GET(url).then(function (response) {
      getField(response);
      sliderLigth(vm.txtMinLight, vm.txtMaxLight);
    });
  };

  vm.save = function () {
    var data = {
      "txtDisplayAcross": vm.txtDisplayAcross,
      "txtDisplayDown": vm.txtDisplayDown,
      "txtLightMessage": vm.txtLightMessage,
      "btnSaveSetting": true
    };

    var url = commonService.URL_SETTING_MATRIX;
    httpService.POST(url, data).then(function (response) {
      getField(response);
    });
  };


  getConfig();

}]);