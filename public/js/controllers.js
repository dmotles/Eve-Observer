'use strict';

/* Controllers */

angular.module('ECE.controllers', []

).controller('SignUp', [
  function() {

  }
]).controller('Login', [
  '$scope', '$location',
  function($scope, $location) {
  }
]).controller('Main', [
  '$scope', '$window', 'igb', 'EVECCP', 
  function($scope, $window, igb, EVECCP) {
    $scope.igb = angular.extend({}, igb);
    $scope.alerts = [];

    // set flag to dictate if we are in game or not.
    $scope.notInGame = (EVECCP) ? false : true;

    if($scope.notInGame) {
      $scope.alerts.push({
        class: 'error',
        exclaim: 'SLOW YO ROLE SON!',
        text: 'You need to be in-game to use this site.'
      });
    } else if(!igb.trusted) {
      $scope.alerts.push({
        class: 'warning',
        exclaim: 'Sup Fool.',
        text: 'You must trust this site to use its features'
      });
    }



    $scope.requestTrust = function() {
      if(!igb.trusted) {
        if(EVECCP) {
          EVECCP.requestTrust($window.location.origin + '/*');
        } else {
          console.log($scope.alerts);
          $scope.alerts.push({
            class: 'error',
            exclaim: 'STOP',
            text: 'You must be In-game to do that!'
          });
        }
      }
    };

    $scope.removeAlert = function(i) {
      $scope.alerts.splice(i, 1);
    }
  }
]).controller('NavBar', function($scope, igb) {
  $scope.igb = angular.extend({}, igb);
  $scope.showPortrait = igb.trusted && igb.charName && igb.charId;
}).controller('Footer', function(igb) {
});