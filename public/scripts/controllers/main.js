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
  $scope.newRoomid = '';
  $scope.message;

  $scope.join = function() {
    socket.emit('add-publish');
  };

  socket.on('rtn', function(data) {
    $scope.$apply(function () {
      $scope.newRoomid = data.roomid;
      $scope.message = data.message;
    });
  });
});

app.controller('SinkCtrl', function($scope, socket) {
  $scope.currentRoomid = {};
  $scope.room = [];
  $scope.roomid;
  $scope.message;

  $scope.sink = function() {
    socket.emit('add-sink', $scope.currentRoomid);
  };

  socket.on('rtn', function(data) {
    console.log(data.room.id);
    $scope.$apply(function () {
      $scope.roomid = data.room.id;
      $scope.message = data.message;
    });
  });
});
