'use strict';
angular.module('ECE.services', []).
  factory('EVECCP', function($window) {
    if(typeof($window.EVECCP) === 'undefined') {
      return false;
    }
    return $window.EVECCP;
  });
