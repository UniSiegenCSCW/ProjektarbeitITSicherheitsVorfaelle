'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:DreiCtrl
 * @description
 * # Controller für Schritt 1 des Formulars
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('DreiCtrl', function ($scope, autocompleteService, $timeout, $http) {

    this.cveEmpfehlungsArray = [];

  	this.popoverText = {
  		festgestelltDurch : {
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

  	this.festgestelltDurch = {
  		optionen : ["Administrator", "Intusion Detection System", "Benutzer", "Keine"]
  	};

    this.miskonfiguration = {
      optionen : ["Falsche Berechtigung", "Veraltete Systemversion", "Ungenutzte Features Aktiviert", 
      "Standardeinstellungen Beibehalten"]
    }

    this.evalCheck = {
      optionen : ["Cross-Site Scripting", "SQL Injection", "Buffer Overflow", 
      "Criss-Site Request Forgery"]
    }

    this.identTheft = {
      optionen : ["Man-In-The-Middle", "Phishing", "Spoofing", "Pharming"]
    }

    this.schadprogramm = {
      optionen : ["Virus", "Wurm", "Trojanisches Pferd", "Adware", "Spyware"]
    }

    this.aufwandBehebung = {
      optionen : ["Hoch", "Mittel", "Gering"]
    }

    this.behoben = {
      optionen : ["Ja", "Nein", "Teilweise"]
    }

    this.vendorArray = [];

    this.productArray = [];

    this.isSelected = function(item, checkboxName, kategorie) {
      if($scope.super.data.angriff[kategorie][checkboxName].optionenChecked.indexOf(item) != -1){
        return true;
      }
    }

    this.itemClicked = function(badgeName, checkboxName, kategorie) {
      if($scope.super.data.angriff[kategorie][checkboxName].optionenChecked.indexOf(badgeName) == -1){
        $scope.super.data.angriff[kategorie][checkboxName].checked = true;
        $scope.super.data.angriff[kategorie][checkboxName].optionenChecked.push(badgeName);
      }
      else {
        var index = $scope.super.data.angriff[kategorie][checkboxName].optionenChecked.indexOf(badgeName)
        $scope.super.data.angriff[kategorie][checkboxName].optionenChecked.splice(index, 1);
        if($scope.super.data.angriff[kategorie][checkboxName].optionenChecked.length == 0){
          $scope.super.data.angriff[kategorie][checkboxName].checked = false;
        }
      }
    }

    this.updateVendors = function(typed) {
      this.vendorArray = autocompleteService.getVendors(typed);
      this.vendorArray.then(function(data) {
        $scope.drei.vendorArray = data;
      });
    }

    this.updateProducts = function(typed) {
      this.productArray = autocompleteService.getProducts($scope.super.data.angriff.systemHersteller);
      this.productArray.then(function(data) {
        $scope.drei.productArray = data;
      });
    }
    
    var cveRequestTimeout;
    $scope.$watch("super.data.angriff.systemProdukt", function(newValue, oldValue) {
      var cveJsonData = {
        vendor : $scope.super.data.angriff.systemHersteller,
        product : $scope.super.data.angriff.systemProdukt
      }
      if(cveRequestTimeout) $timeout.cancel(cveRequestTimeout);
        cveRequestTimeout = $timeout(function() {
          $http({
            method: 'POST',
            url: 'http://localhost:3000/cveSearch',
            data: cveJsonData
          }).then(function successCallback(response){
            $scope.drei.cveEmpfehlungsArray = response.data;
          }, function errorCallback(error){
            console.log(error);
          });
        }, 2000); 
    });
  });
