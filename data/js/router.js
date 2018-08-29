
'use strict';

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        'menuTop': {},
        'content': {
          templateUrl: 'resources/login.html',
          controller: 'loginCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('home', {
      url: '/home',
      views: {
        'menuTop': {
          templateUrl: 'resources/menuTop.html'
        },
        'content': {
          templateUrl: 'resources/home.html'
        }
      }
    })
});