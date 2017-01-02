'use strict';

var app = angular.module('myApp');

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        var $uri ='/api/players';
        $scope.doSearch = function() {

            $http({
                method : 'GET',
                url : $uri
            }).success(function(data, status, headers, config) {
                $scope.results = data;
                console.log(status);
                console.log(data);
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
        };
    }])
    // page
    .controller('PageCtrl', ['$scope', '$http', function ($scope, $http) {

        var $uri ='/api/players';

        $scope.doSearch = function() {

           $http({
               method : 'GET',
               url : $uri
           }).success(function(data, status, headers, config) {
               $scope.results = data;
               console.log(status);
               console.log(data);
           }).error(function(data, status, headers, config) {
               console.log(status);
           });
       };
    }]);
