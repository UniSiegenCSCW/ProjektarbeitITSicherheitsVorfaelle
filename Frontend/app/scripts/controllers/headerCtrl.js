'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:headerCtrl
 * @description
 * # Controller der den Header dynamisch steuert
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('headerCtrl', function ($location, $rootScope, $scope) {
  	this.currentLocation = $location.path();

  	$rootScope.$on('$locationChangeSuccess', function(event){
        $scope.head.currentLocation = $location.path();
		})

  	this.isReport = function() {
			switch ($location.path()){
				case '/eins':
					return true;
					break;
				case '/zwei':
					return true;
					break;
				case '/drei':
					return true;
					break;
				case '/fertig':
					return true;
					break;
			}
  	}

  	this.getCurrentLocation = function() {
  		return this.currentLocation;
  	}

  	this.currentLocationContains = function(location) {
  		if(this.currentLocation.indexOf(location) != -1){
  			return true;
  		}
  	}
  })
