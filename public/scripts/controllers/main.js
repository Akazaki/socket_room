'use strict';

var app = angular.module('myApp');

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  var $uri ='/api/players';
  $scope.doSearch = function() {

    $http({
        method : 'GET',
        url : $uri
    }).success(function(data, status, headers, config) {
        $scope.results = data;
    }).error(function(data, status, headers, config) {
        console.log('error');
    });
  };
}]);

// page
app.controller('PageCtrl', ['$scope', '$http', function ($scope, $http) {
    var $uri ='/api/players';

    srearch();

    function srearch() {
       $http({
           method : 'GET',
           url : $uri
       }).success(function(data, status, headers, config) {
           $scope.results = data;
       }).error(function(data, status, headers, config) {
           console.log('error');
       });
   };

  $scope.doSearch = function() {
    $scope.results = '';
  }
}]);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

app.controller('SocketCtrl', function($scope, socket) {
  $scope.newCustomers = [];
  $scope.currentCustomer = {};

  $scope.join = function() {
    socket.emit('add-customer', $scope.currentCustomer);
  };

  socket.on('notification', function(data) {
    $scope.$apply(function () {
      $scope.newCustomers.push(data.customer);
    });
  });
});

app.controller('SinkCtrl', function($scope, socket) {
  $scope.currentRoomid = {};
  $scope.room = [];
  $scope.newRoomid = '';

  $scope.sink = function() {
    socket.emit('add-sink', $scope.currentRoomid);
  };

  socket.on('rtn', function(data) {
    $scope.$apply(function () {
      $scope.newRoomid = data.id;
    });
  	console.log($scope.newRoomid);
  });
});
