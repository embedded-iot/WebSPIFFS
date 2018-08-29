'use strict';

app.service('commonService',function($http, $q) {

  var URL = "http://192.168.1.3";
  var service = {
    URL_LOGIN: URL + '/login',
  };
  return service;
});