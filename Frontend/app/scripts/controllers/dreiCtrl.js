'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:DreiCtrl
 * @description
 * # Controller für Schritt 1 des Formulars
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('DreiCtrl', function ($scope) {

  	this.popoverText = {
  		festgestellt : {
  			title : "Title",
  			text : "Text"
  		},
      art : {
        title : "Title",
        text : "Text"
      },
      system : {
        title : "Title",
        text : "text"
      },
      schwachstelle : {
        title : "Title",
        text : "text"
      }
  	}

  	this.festgestellt = {
  		optionen : ["Administrator", "Intusion Detection System", "Benutzer", "Keine"]
  	};

    this.miskonfiguration = {
      optionen : ["Falsche Berechtigung", "Veraltete Systemversion", "Ungenutzte Features Aktiviert", 
      "Standardeinstellungen Beibehalten"]
    }

    this.eval = {
      optionen : ["Cross-Site Scripting", "SQL Injection", "Buffer Overflow", 
      "Criss-Site Request Forgery"]
    }

    this.ident = {
      optionen : ["Man-In-The-Middle", "Phishing", "Spoofing", "Pharming"]
    }

    this.schadprogramm = {
      optionen : ["Virus", "Wurm", "Trojanisches Pferd", "Adware", "Spyware"]
    }

    this.aufwBehebung = {
      optionen : ["Hoch", "Mittel", "Gering"]
    }

    this.behoben = {
      optionen : ["Ja", "Nein", "Teilweise"]
    }

    this.isSelected = function(item, checkboxName) {
      if($scope.super.data.angriff[checkboxName].optionenChecked.indexOf(item) != -1){
        return true;
      }
    }

    this.itemClicked = function(badgeName, checkboxName) {
      if($scope.super.data.angriff[checkboxName].optionenChecked.indexOf(badgeName) == -1){
        $scope.super.data.angriff[checkboxName].checked = true;
        $scope.super.data.angriff[checkboxName].optionenChecked.push(badgeName);
      }
      else {
        var index = $scope.super.data.angriff[checkboxName].optionenChecked.indexOf(badgeName)
        $scope.super.data.angriff[checkboxName].optionenChecked.splice(index, 1);
        if($scope.super.data.angriff[checkboxName].optionenChecked.length == 0){
          $scope.super.data.angriff[checkboxName].checked = false;
        }
      }
    }
  });
