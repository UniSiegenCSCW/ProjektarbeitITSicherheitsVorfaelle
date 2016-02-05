'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:ZweiCtrl
 * @description
 * # Controller für Schritt 2 des Formulars
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('ZweiCtrl', function () {
  	this.popoverText = {
  		entdeckungszeitpunkt : {
  			title : "Entdeckungszeitpunkt",
  			text : "Der Zeitpunkt an dem der Vorfall entdeckt wurde"
  		},
  		startzeitpunkt : {
  			title : "Startzeitpunkt",
  			text : "Hierbei handelt es sich um den Zeitpunkt, an dem der Vorfall begonnen hat"
  		},
      dauertAn : {
        title : "Dauert an",
        text : "Dauert der Vorfall aktuell noch an?"
      },
      endzeitpunkt : {
        title : "Title",
        text : "Text"
      },
      cia : {
        title : "Title",
        text : "Text"
      },
      funktionaleAuswirkungen : {
        title : "Title",
        text : "Text"
      },
      unauthZugriffVertrInfo : {
        title : "Title",
        text : "Text"
      }
  	}
  	this.auswirkungen = {
  		optionen : ["Hoch", "Mittel", "Niedrig", "Keine"]
  	};
  	this.unauthZugriffVertrInfo = {
  		optionen : ["Noch aendern 1", "Noch aendern 2", "Noch aendern 3", "Kein Zugriff"]
  	};
  });
