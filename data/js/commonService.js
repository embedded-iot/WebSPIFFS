'use strict';

app.service('commonService',['$state', function($state) {

  var URL = "http://192.168.1.100";


  var service = {
    URL_CHECK_LOGIN: URL + '/isLogin',
    URL_LOGIN: URL + '/login',
    URL_LOGOUT: URL + '/logout',
    URL_SETTING_COMMON: URL + '/setting',
    URL_SETTING_MATRIX: URL + '/matrixSetting',
  };

  service.goState = function (state, params) {
    $state.go(state, params);
  };

  return service;
}]);