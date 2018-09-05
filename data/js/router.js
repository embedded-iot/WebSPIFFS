
'use strict';

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
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
          templateUrl: 'resources/home.html',
          controller: 'homeCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('message', {
      url: '/message',
      views: {
        'menuTop': {
          templateUrl: 'resources/menuTop.html'
        },
        'content': {
          templateUrl: 'resources/message.html',
          controller: 'messageCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('user', {
      url: '/user',
      views: {
        'menuTop': {
          templateUrl: 'resources/menuTop.html'
        },
        'content': {
          templateUrl: 'resources/user.html',
          controller: 'userCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('matrix', {
      url: '/matrix',
      views: {
        'menuTop': {
          templateUrl: 'resources/menuTop.html'
        },
        'content': {
          templateUrl: 'resources/matrix.html',
          controller: 'matrixCtrl',
          controllerAs: 'vm'
        }
      }
    })
});