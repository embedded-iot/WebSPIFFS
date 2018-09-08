'use strict';

app.service('commonService',['$state', function($state) {

  var URL = "http://192.168.1.100";


  var service = {
    URL_CHECK_LOGIN: URL + '/isLogin',
    URL_LOGIN: URL + '/login',
    URL_LOGOUT: URL + '/logout',
    URL_SETTING_COMMON: URL + '/setting',
    URL_SETTING_MATRIX: URL + '/matrixSetting',
    URL_GET_SETTINGS: URL + '/getSettings',
    URL_CREATE_MESSAGE: URL + '/createMessage',
    URL_LIST_MESSAGE: URL + '/listMessage',
    URL_DELETE_MESSAGE: URL + '/verifyDelete',
  };

  service.goState = function (state, params) {
    $state.go(state, params);
  };

  service.showProgress = function () {
    $('body').append("<div class='progress-circle'><span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate glyphicon-progress\"></span></div>" );
  };

  service.hideProgress = function () {
    $( ".progress-circle" ).remove();
  };

  return service;
}]);