'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:FertigCtrl
 * @description
 * # Controller für die Zusammenfassung
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('FertigCtrl', function ($scope) {

  	this.document = $scope.super.data
    console.log(this.document);
  	this.getObject = function(obj, field) {
      return obj[field];
    }

    this.getBadge = function(obj) {
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
	  
	  this.getField = function(field){
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

  });
