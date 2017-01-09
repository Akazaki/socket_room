'use strict';

angular.module('myApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
.config(["$routeProvider", '$locationProvider', function($routeProvider,$locationProvider) {
  $locationProvider.html5Mode(true);
//.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/page', {
      templateUrl: 'views/page.html',
      controller: 'PageCtrl'
    })
    .when('/socket', {
      templateUrl: 'views/socket.html',
      controller: 'SocketCtrl'
    })
    .when('/sink', {
      templateUrl: 'views/sink.html',
      controller: 'SinkCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
