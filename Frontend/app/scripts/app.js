'use strict';

/**
 * @ngdoc overview
 * @name kritisformularApp
 * @description
 * # kritisformularApp
 *
 * Main module of the application.
 */
angular
  .module('kritisformularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/eins', {
        templateUrl: 'views/eins.html',
        controller: 'EinsCtrl',
        controllerAs: 'eins'
      })
      .when('/zwei', {
        templateUrl: 'views/zwei.html',
        controller: 'ZweiCtrl',
        controllerAs: 'zwei'
      })
      .when('/drei', {
        templateUrl: 'views/drei.html',
        controller: 'DreiCtrl',
        controllerAs: 'drei'
      })
      .when('/fertig', {
        templateUrl: 'views/fertig.html',
        controller: 'FertigCtrl',
        controllerAs: 'fertig'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
