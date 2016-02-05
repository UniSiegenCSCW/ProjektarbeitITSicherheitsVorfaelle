'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.directive.header
 * @description
 * # Direktive für einen dynamischen Header
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
	.directive('header', function () {
		return {
			restrict: 'A',
			replace: true,
			scope: {user : '='},
			templateUrl: '/views/directives/header.html',
			controller: 'headerCtrl',
    	controllerAs: 'head',
    	bindToController: {
			      someObject: '=',
			      someString: '@',
			      someExpr: '&'
			    }
		}
	});