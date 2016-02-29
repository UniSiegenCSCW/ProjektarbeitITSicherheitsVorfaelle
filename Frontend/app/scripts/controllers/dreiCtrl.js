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
  			text : "Welche Person oder welche Software ist auf den Angriff aufmerksam geworden?"
  		},
      festgestelltDurchDetail : {
        title : "Den Angriff erkennen",
        text : "Beschreiben Sie bitte möglichst genau, wie der Angriff festgestellt wurde, sodass dieser Prozess für andere nachvollziehbar ist!"
      },
      ermoeglicht : {
        title : "Angriffsvektor",
        text : "MISKONFIGURATION: Der Angriff erfolgte über eine Schwachstelle, die auf einen Konfigurationsfehler zurückzuführen ist.<br><br>USB GERÄTE: Schädliche Software wurde über ein USB Medium infiltriert.<br><br>E-MAIL: Schädliche Software wurde über E-Mail infilitriert.<br><br>UNZUREICHENDE EINGABEVALIDIERUNG: Inputfelder werden nicht ausreichend validiert, sodass schädlicher Code infilitriert werden konnte.<br><br>BOTNETZ: Ein großer Zusammenschluss von mit Malware infizierten PCs ermöglichte den Angriff.<br><br>IDENTITÄTSDIEBSTAHL: Der Angriff wurde dadurch ermöglicht, dass sich der Angreifer eine vertrauenswürdige Identität verschafft hat.<br><br>IT-SICHERHEITSLÜCKE: Der Angriff wurde durch einen Design- oder Implementationsfehler eines IT-Produktes ermöglicht.<br><br>SOCIAL ENGINEERING: Der Angriff wurde dadurch ermöglicht, dass Personen zu sicherheitskritischen Handlungen gedrängt wurden."
      },
      art : {
        title : "Art des Angriffs",
        text : "SCHADPROGRAMM: Schädlicher Code wurde infiltriert und wird auf dem betroffenen System ausgeführt.<br><br>DENIAL-OF-SERVICE: (D)DoS ist in der Regel die Folge einer Überbelastung eines Dienstes mithilfe eines Botnetzs.<br><br>BELIEBIGE CODEAUSFÜHRUNG: Der Angreifer hat sich auf eine Weise Zugang verschafft, welche ihn berechtigt beliebigen Code auf dem betroffenen System auszuführen."
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
        text : "Lässt sich die Schwachstelle dieses Angriffs durch einen der vorgeschlagenen CVE-Einträge beschreiben? Ist Ihnen alternativ ein anderer CVE-Eintrag bekannt?"
      },
      reaktion : {
        title : "Reaktion",
        text : "Beschreiben Sie bitte nachvollziehbar, wie sie reagiert haben, um die Ursache des Angriffs zu beheben."
      },
      aufwand : {
        title : "Aufwand",
        text: "<b>NICHT WIEDERHERSTELLBAR</b>: Die Wiederherstellung des Systems ist nicht möglich.<br><br><b>EXTERNE HILFE</b>: Die Zeit zur Wiederherstellung ist nicht vorauszusehen, es wird externe Hilfe benötigt.<br><br><b>ERGÄNZENDE RESSOURCEN</b>: Die Zeit zur Wiederherstellung ist mit ergänzenden Ressourcen vorauszusehen.<br><br><b>VORHANDENE RESSOURCEN</b>: Die Zeit zur Wiederherstellung ist mit vorhandenen Ressourcen vorauszusehen.<br><br><b>NICHT ANZUWENDEN</b>: Der Angriff erfordert keine Wiederherstellung."
      }
  	}

  	this.festgestelltDurch = {
  		optionen : ["Administrator", "Benutzer", "Intrusion Detection System", "Anti-Viren-Software", "Keine"]
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
      optionen : ["Nicht wiederherstellbar", "Externe Hilfe", "Ergänzende Ressourcen", "Vorhandene Ressourcen", "Nicht anzuwenden"]
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
            data: cveJsonData,
            since: 31 //Einträge der letzten 31 Tage abrufen
          }).then(function successCallback(response){
            $scope.drei.cveEmpfehlungsArray = response.data;
          }, function errorCallback(error){
            console.log(error);
          });
        }, 2000); 
    });
  });
