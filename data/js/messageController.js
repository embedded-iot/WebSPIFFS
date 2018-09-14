
'use strict';

app.controller('messageCtrl', ['$scope', 'commonService', 'httpService', '$state', '$timeout',
  function($scope, commonService, httpService, $state, $timeout) {
  var vm = this;

  $scope.title = "Hello World!";
  $scope.scroll = true;
  $scope.duration = 10000;
  vm.isMaque = false;
  vm.marquee = {};

  vm.alignTop = true;
  vm.alignLeft = true;

  var baud = 0;
  var sliderBaud = function (min, max) {
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

  var getSettings= function() {
    var prevState = $state.params.prevState;
    if (!prevState) {
      commonService.goState("home");
    }
    var url = commonService.URL_GET_SETTINGS;
    commonService.showProgress();
    httpService.GET(url).then(function (response) {
      vm.txtFonts = response.txtFonts;
      vm.txtMotions = response.txtMotions;
      vm.txtMaxBaud = response.txtMaxBaud;
      vm.txtMinBaud = response.txtMinBaud;
      commonService.hideProgress();
      var message = $state.params.message;
      if (!!message) {
        vm.isEditMessage = true;
        vm.newMessage = {
          "txtIndexMessage": message.id,
          "chboxStatusMessage": message.status,
          "txtNameMessage": message.name,
          "txtFontMessage": message.font,
          "chboxMotionMessage": message.motion,
          "txtRepeatMessage": message.repeat,
          "txtBaudMessage": message.baud,
          "txtMarginTopMessage": (message.top || 0),
          "txtMarginLeftMessage": (message.left || 0),
        };
        sliderBaud(vm.txtMinBaud, vm.txtMaxBaud);
        // vm.marquee.scrollDelay = message.baud;
        baud = vm.newMessage.txtBaudMessage;
        onSlider();
        vm.changeMotion(message.motion);
      }
      else {
        newMessage();
        vm.isEditMessage = false;
      }

    });
  };

  vm.tab = 1;
  vm.tabActive = function(tabName) {
    vm.tab = tabName;
    if (tabName == 2) {
      if (vm.newMessage.txtBaudMessage == 'NaN') {
        vm.newMessage.txtBaudMessage = baud;
      }
      sliderBaud(vm.txtMinBaud, vm.txtMaxBaud);
    }
  };


  var newMessage= function() {
    var url = commonService.URL_CREATE_MESSAGE;
    commonService.showProgress();
    httpService.GET(url).then(function (response) {
      vm.newMessage = response;
      baud = vm.newMessage.txtBaudMessage;
      sliderBaud(vm.txtMinBaud, vm.txtMaxBaud);
      commonService.hideProgress();
    });
  };

  vm.changeMarginTop = function(count) {
    vm.newMessage.txtMarginTopMessage += count;
    console.log(vm.newMessage.txtMarginTopMessage);
  };

  vm.changeMarginLeft = function(count) {
    vm.newMessage.txtMarginLeftMessage += count;
    console.log(vm.newMessage.txtMarginLeftMessage);
  };

  vm.addMessage = function() {
    vm.newMessage.btnSaveMessage = true;
    if (vm.newMessage.txtBaudMessage == 'NaN') {
      vm.newMessage.txtBaudMessage = baud;
    }
    var data = vm.newMessage;
    commonService.showProgress();
    var url = commonService.URL_CREATE_MESSAGE;
    httpService.POST(url, data).then(function (response) {
      commonService.hideProgress();
      if (!!response.btnSaveMessage) {
        commonService.goState("home");
      }
    });
  };

  vm.goListMessage = function() {
    commonService.goState("home");
  };

  vm.changeMotion = function(motion) {
    console.log(motion);
    if (!motion) {
      return;
    }

    if (motion == 'stop') {
      vm.isMaque = false;
      vm.alignTop = true;
      vm.alignLeft = true;
      vm.showBaudMsg = false;
      return;
    } else {
      vm.isMaque = false;
      vm.isMaque = true;
      vm.showBaudMsg = true;
      if (motion == 'left' || motion == 'right') {
        vm.alignTop = true;
        vm.alignLeft = false;
      } else if (motion == 'up' || motion == 'down') {
        vm.alignTop = false;
        vm.alignLeft = true;
      }
    }
    vm.marquee.directtion = motion;
    vm.marQueSetting();

  };

  vm.marQueSetting = function() {
    var watchMarquee = $scope.$watch(function () {
      var eMar = document.getElementById("marqueeText");
      return eMar;
    }, function (eMar) {
      if (!!eMar) {
        $timeout(function () {
          eMar.stop();
          if (!!vm.marquee.scrollDelay) {
            eMar.scrollDelay = vm.marquee.scrollDelay;
          }
          eMar.start();
          eMar.stop();
          if (!!vm.marquee.directtion) {
            eMar.direction = vm.marquee.directtion;
          }
          eMar.start();
          watchMarquee();
        }, 50);
      }
    });

  };

  var onSlider = function () {
    var watchSlider = $scope.$watch(function () {
      if (typeof vm.newMessage == "undefined")
        return null;
      return vm.newMessage.txtBaudMessage;
    }, function (newValue, oldValue) {
      if (newValue == 'NaN') {
        vm.newMessage.txtBaudMessage = baud;
      }
      if (newValue !== 'NaN' && !!newValue && newValue !== oldValue) {
        console.log(newValue);
        vm.marquee.scrollDelay = newValue;
        vm.marQueSetting();
      }
    });
    $scope.$on('$destroy', function() {
      watchSlider();
    });
  };



  getSettings();

}]);