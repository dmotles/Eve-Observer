'use strict';

/* Controllers */

angular.module('ECE.controllers', []

).controller('SignUp', [
  function() {

  }
]).controller('Login', [
  '$scope', 'eve', 'auth', '$location',
  function($scope, eve, auth, $location) {
    $scope.eve = eve;
    $scope.authError = false;
    $scope.isProcessing = false;
    $scope.password = '';
    $scope.rememberMe = false;

    $scope.authenticate = function() {
      $scope.isProcessing = true;
      auth.login(eve.player.id(), $scope.password)
        .success(function() {
          $scope.$apply(function() {
            $scope.isProcessing = false;
            $scope.authError = false;
            $location.path('/');
          });
        }).fail(function() {
          $scope.$apply(function() {
            $scope.isProcessing = false;
            $scope.authError = true;
          });
        });
    }
  }
]).controller('Main', [
  '$scope', 'eve', 'auth',
  function($scope, eve, auth) {
    $scope.permitted = function() {
      return eve.isInGameBrowser() && auth.isPermitted();
    }

    $scope.deniedReason = '';

    if(!eve.isInGameBrowser()) {
      $scope.deniedReason = 'You must be using the in-game browser to use this site';
    } else if(!auth.isPermitted()) {
      $scope.deniedReason = 'You or your corp are not permitted to use this site at this time';
    }
  }
]).controller('NavBar', function() {

}).controller('Footer', function() {
  
});