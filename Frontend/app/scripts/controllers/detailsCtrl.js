'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:details
 * @description
 * # Controller für die Detailansicht auf ein Dokument
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('DetailsCtrl', function ($scope, $routeParams, $baasbox) {
  	
    this.documentId = $routeParams.documentId;
    this.document;

    this.vektoren;

    $baasbox.getDocument('incidents', $routeParams.documentId)
      .then(function(result){
        $scope.details.document = result;

        $scope.details.buildTitle = function(document){
          return document.angriff.systemHersteller+' '+document.angriff.systemProdukt;
        }

        $scope.details.getObject = function(obj, field) {
          return obj[field];
        }

        $scope.details.getBadge = function(obj) {
          var badgeArray = [];
          for (var key in obj) {
            if(typeof obj[key] === 'object'){
              if(obj[key].checked === true){
                if(obj[key].optionenChecked != undefined){
                  if(obj[key].optionenChecked.length > 0){
                    for(var item in obj[key].optionenChecked){
                      badgeArray.push(obj[key].optionenChecked[item]);
                    }
                  }
                  else {
                    badgeArray.push(obj[key].text);
                  }
                }
                else {
                  badgeArray.push(obj[key].text);
                }
              }
            }
          }
          return badgeArray;
        }

        $scope.details.getField = function(field){
          var fieldArray = field.split('.');
          var obj = this.document;
          for (var fieldIndex in fieldArray) {
            obj = this.getObject(obj, fieldArray[fieldIndex]);
          }

          if(obj != ""){
            // Vektor, Art oder Zweck 
            if(typeof obj === 'object'){
              if(fieldArray[fieldArray.length-1] == 'vektor'){
                return this.getBadge(obj);
              }
              if(fieldArray[fieldArray.length-1] == 'art'){
                return this.getBadge(obj);
              }
              if(fieldArray[fieldArray.length-1] == 'zweck'){
                return this.getBadge(obj);
              }
            }
            return obj;
          }
          else {
            return "---"
          }

        }
      }, function(err){
        console.log(err);
      });

  })