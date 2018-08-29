'use strict';

app.service('httpService',function($http, $q) {

  // implementation
  function POST(url, data, config) {
    var def = $q.defer();
    $http.post(url, data, config)
      .success(function(response) {
        def.resolve(response);
      })
      .error(function(error) {
        def.reject(error);
      });
    return def.promise;
  }
  // interface
    var service = {
      POST: POST,
    };
    return service;
  });