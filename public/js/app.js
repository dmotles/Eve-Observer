'use strict';

// ECE stands for "Eve Corporation Extension".
angular.module('ECE',

  // Dependencies
  [
    'ECE.filters',
    'ECE.services',
    'ECE.directives', 
    'ECE.controllers'
  ]

).config(
  [
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignUp'});
      $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'Main'});
      $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'Login'});
      $routeProvider.when('/wormholes', {templateUrl: 'partials/wormholes.html', controller: 'Wormholes'});
      $routeProvider.otherwise({redirectTo: '/'});
    }
  ]
).run([
  'auth', 'eve', '$location', '$rootScope',
  function(auth, eve, $location, $rootScope) {
    function redirect(path, next, allowedPartials) {
      var needsRedirect = allowedPartials.every(function(partial) {
        return next.templateUrl !== 'partials/' + partial + '.html';
      });

      if(needsRedirect) {
        $location.path(path);
      }
    }

    /*$rootScope.$on('$routeChangeStart', function(event, next, current) {
      if(eve.isInGameBrowser()) {
        if(auth.permitted()) {
          if(auth.isAuthed() === false) {
            redirect('/login', next, ['login', 'signup']);
          }
        } else {
          redirect('/', next, ['main']);
        }

      } else {
        redirect('/', next, ['main']);
      } 
  });*/
}]);
