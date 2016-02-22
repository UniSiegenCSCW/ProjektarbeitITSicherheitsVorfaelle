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
  			text : "Zu welchem Zeitpunkt sind Sie auf den Vorfall aufmerksam geworden?"
  		},
  		startzeitpunkt : {
  			title : "Startzeitpunkt",
  			text : "Können Sie den Zeitpunkt bestimmen, an dem der Vorfall angefangen hat?"
  		},
      dauertAn : {
        title : "Dauert an",
        text : "Dauert der Vorfall aktuell noch an?"
      },
      endzeitpunkt : {
        title : "Endzeitpunkt",
        text : "Können Sie den Zeitpunkt bestimmen, an dem Verfall geendet hat?"
      },
      cia : {
        title : "Vertraulichkeit, Integrität, Verfügbarkeit",
        text : "Gab es unauthorisierten Zugriff auf vertrauliche Daten? Wurden Daten oder Systeme unauthorisiert modifiziert? Wurde die Verwendung von Daten oder Systemen beeinträchtigt?"
      },
      funktionaleAuswirkungen : {
        title : "Funktionale Auswirkungen",
        text : "HOCH: Die Funktionsweise von kritischen Diensten wurde für ALLE Nutzer eingeschränkt\nMITTEL: Die Funktionsweise von kritischen Diensten wurde für EINIGE Nutzer eingeschränkt\nNIEDRIG: Alle Dienste sind für alle Nutzer verfügbar, es bestehen Einschränkungen in der Perfomanz der Dienste\nKEINE Es bestehen keinerlei Einschränkungen bezüglich der Nutzung aller Dienste"
      },
      unauthZugriffVertrInfo : {
        title : "Zugriff auf Informationen",
        text : "GEHEIM: Die Vertraulichkeit von streng geheimen Informationen wurde gefährdet<br>GESCHÜTZT: Die Vertraulichkeit von geschützten firmenkritischen Informationen wurde gefährdet<br />PRIVAT: Die Vertraulichkeit von persönlichen Informationen wurde gefährdet<br />INTEGRITÄT: Die notwendige Integrität von Informationen wurde gefährdet<br />KEINE: Keinerlei Informationen wurden gefährdet"
      }
  	}
  	this.auswirkungen = {
  		optionen : ["Hoch", "Mittel", "Niedrig", "Keine"]
  	};
  	this.unauthZugriffVertrInfo = {
  		optionen : ["Geheim", "Geschützt", "Privat", "Integrität", "Keine"]
  	};
  });
