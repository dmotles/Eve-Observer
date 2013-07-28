'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ECE.services', []).
  factory('inGameBrowser', function() {
    if(typeof(window.EVECCP) === 'undefined') {
      return {
        isInGameBrowser: function() {
          return false;
        }
      };
    }

    window.EVECCP.isInGameBrowser = function() {
      return true;
    };

    return window.EVECCP;
  }).
  factory('clientData', function() {
    return {
      'trusted': true,
      'serverIp': '10.0.0.1:232',
      'charName': 'Trygve Reenskaug',
      'charId': '23232',
      'corpName': 'The AESIR.',
      'corpId': '334333',
      'allianceName': 'None',
      'allianceId': 'None',
      'regionName': 'Domain',
      'constellationName': 'Jesus',
      'solarsystemName': 'Amarr',
      'stationName': 'IDK',
      'stationId': '33423',
      'corpRole': 'Member',
      'solarSystemId': '3432342',
      'warFactionId': '200242',
      'shipId': '232042',
      'shipName': 'Negro Damus',
      'shipTypeId': '3434322',
      'shipTypeName': 'Nomad'
    };
  }).
  factory('eve', [
    'inGameBrowser', 'clientData',
    function(inGameBrowser, clientData) {


    function Eve() {
      this.clientData = clientData;
      this.inGameBrowser = inGameBrowser;
    }
    return new Eve();
  }]).factory('auth', function() {
    var isAuth = false;
    var permitted = true;
    function Authentication() {}
    Authentication.prototype = {
      login: function(playerID, password) {
        var successCB;
        var failCB;
        function promise() {}
        promise.prototype = {
          success: function(cb) {
            successCB = cb;
            return new promise();
          },
          fail: function(cb) {
            failCB = cb;
            return new promise();
          }
        };

        setTimeout(function() {
          if(password === 'bacon') {
            isAuth = true;
            successCB();
          } else { 
            isAuth = false;
            failCB();
          }
        }, 500);

        return new promise();
      },
      isAuthed: function() {
        return isAuth;
      },
      isPermitted: function() {
        return permitted;
      }
    };

    return new Authentication();
  });
