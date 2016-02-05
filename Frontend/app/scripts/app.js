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
    'ui.bootstrap',
    'autocomplete',
    'ngBaasbox',
    'ngLocale'
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
      .when('/timeline', {
        templateUrl: 'views/timeline.html',
        controller: 'TimelineCtrl',
        controllerAs: 'timeline'
      })
      .when('/details/:documentId', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
