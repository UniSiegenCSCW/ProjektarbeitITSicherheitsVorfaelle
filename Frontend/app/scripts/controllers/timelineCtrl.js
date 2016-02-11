'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:timeline
 * @description
 * # Controller für die Timeline
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('TimelineCtrl', function ($baasbox, $scope) {

  	this.allDocuments;

  	this.getAllDocuments = function(){
  		$baasbox.searchForDocuments('incidents', '')
  			.then(function(result){
          console.log(result);
  				$scope.timeline.allDocuments = result;
  			},function(err){
  				console.log(err);
  			})
  	}

  	this.buildTitle = function(document){
  		return document.angriff.systemHersteller+' '+document.angriff.systemProdukt;
  	}
  })