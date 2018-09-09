
'use strict';

app.controller('homeCtrl', ['$scope', 'commonService', 'httpService', function($scope, commonService, httpService) {
  var vm = this;

  vm.list = [];

  vm.add = function () {
    commonService.goState("message", {prevState: 'home'});
  };

  vm.deleteMessage = function(index) {
    var data = {
      "txtIndexMessage": index,
      "txtVerifyDelete": true
    };
    commonService.showProgress();
    var url = commonService.URL_DELETE_MESSAGE;
    httpService.POST(url, data).then(function (response) {
      commonService.hideProgress();
      if (!!response.btnDeleleMessage) {
        getListMessage();
      }

    });

  };

  vm.editMessage = function (message, index) {
    message.id = index;
    commonService.goState("message", {message: message, prevState: 'home'});
  };

  vm.toogleStatusMessage = function (message, index) {
    var message  = message;
    var data = {
      "txtIndexMessage": index,
      "updatechboxStatus": message.status,
      "btnSaveList": true
    };
    commonService.showProgress();
    var url = commonService.URL_UPDATE_STATUS;
    httpService.POST(url, data).then(function (response) {
      commonService.hideProgress();
      if (!!response.btnSaveList) {
        getListMessage();
      }

    });

  };

  var getListMessage= function() {
    commonService.showProgress();
    var url = commonService.URL_LIST_MESSAGE;
    httpService.GET(url).then(function (response) {
      vm.listMessage = response;
      commonService.hideProgress();
    });
  };

  getListMessage();

}]);