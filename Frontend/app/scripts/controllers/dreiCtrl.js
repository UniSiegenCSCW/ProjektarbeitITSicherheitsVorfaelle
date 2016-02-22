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
  			title : "Den Angriff erkennen",
  			text : "Wie sind Sie auf den Angriff aufmerksam geworden?"
  		},
      festgestelltDurchDetail : {
        title : "Den Angriff erkennen",
        text : "Können Sie nachvollziehbar beschreiben, wie der Angriff erkannt wurde?"
      },
      ermoeglicht : {
        title : "Angriffsvektor",
        text : "MISKONFIGURATION: Der Angriff erfolgte über eine Schwachstelle, die auf einen Konfigurationsfehler zurückzuführen ist?\nUSB GERÄTE: Schädliche Software wurde über ein USB Medium infiltriert.\nE-MAIL: Schädliche Software wurde über eine E-Mail infilitriert.\nUNZUREICHENDE EINGABEVALIDIERUNG: Inputfelder werden nicht ausreichend validiert, sodass schädlicher Code infilitriert werden kann.\nBOTNETZ: Ein großer Zusammenschluss von mit Malware infizierten PCs ermöglicht den Angriff.\nIDENTITÄTSDIEBSTAHL: Der Angriff wurde dadurch ermöglicht, dass sich der Angreifer eine vertrauenswürdige Identität verschafft hat.\nIT-SICHERHEITSLÜCKE: Der Angriff wurde durch einen Design- oder Implementationsfehler eines IT-Produktes ermöglicht.\nSOCIAL ENGINEERING: Personen wurden in einer Weise beeinuflusst, welche den Angriff ermöglicht."
      },
      art : {
        title : "Art des Angriffs",
        text : "SCHADPROGRAMM: Schädlicher Code wurde infiltriert und wird auf dem betroffenen System ausgeführt.\nDENIAL-OF-SERVICE: (D)DoS ist in der Regel die Folge einer Überbelastung eines Dienstes mithilfe eines Botnetzs.\nBELIEBIGE CODESAUSFÜHRUNG: Der Angreifer hat sich auf eine Weise Zugang verschafft, welche ihn berechtigt beliebigen Code auf dem betroffenen System auszuführen."
      },
      zweck : {
        title : "Intention",
        text : "Können Sie feststellen, was die Intention des Angreifers für diesen Angriff gewesen ist?"
      },
      system : {
        title : "Betroffenes System",
        text : "Welches Produkt von welchem Hersteller ist von diesem Angriff betroffen?"
      },
      schwachstelle : {
        title : "CVE",
        text : "Lässt sich die Schwachstelle dieses Angriffs durch einen der vorgeschlagenen CVE-Einträge beschreiben? Haben Sie alternativ selbst einen passenden CVE-Eintrag gefunden?"
      },
      reaktion : {
        title : "Reaktion",
        text : "Beschreiben Sie bitte nachvollziehbar, wie sie reagiert haben, um die Ursache des Angriffs zu beheben."
      }
  	}

  	this.festgestelltDurch = {
  		optionen : ["Administrator", "Intrusion Detection System", "Benutzer", "Keine"]
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
            console.log(response);
            $scope.drei.cveEmpfehlungsArray = response.data;
          }, function errorCallback(error){
            console.log(error);
          });
        }, 2000); 
    });
  });
