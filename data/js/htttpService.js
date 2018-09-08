'use strict';

app.service('httpService', function($http, $q, $httpParamSerializerJQLike, commonService) {

  // implementation
  function POST(url, data) {
    var config = {
      headers : { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
    };
    data = $httpParamSerializerJQLike(data);
    var def = $q.defer();
    $http.post(url, data, config)
      .success(function(response) {
        def.resolve(response);
      })
      .error(function(error) {
        def.reject(error);
      });
    return def.promise;
  };
  function GET(url) {
    var def = $q.defer();
    $http.get(url)
      .success(function(response) {
        def.resolve(response);
      })
      .error(function(error) {
        def.reject(error);
      });
    return def.promise;
  };
  // interface
  var service = {
    POST: POST,
    GET: GET
  };
  return service;
  });