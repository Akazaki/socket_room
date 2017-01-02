'use strict';

angular.module('myApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/page', {
      templateUrl: 'views/page.html',
      controller: 'PageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
