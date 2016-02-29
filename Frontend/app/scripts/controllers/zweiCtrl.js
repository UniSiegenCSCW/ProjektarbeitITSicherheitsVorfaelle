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
  			text : "Welcher ist der frühste Zeitpunkt, auf welchen sich der Vorfall zurückverfolgen lässt?"
  		},
      dauertAn : {
        title : "Dauert an",
        text : "Sind zum aktuellen Zeitpunkt noch Aktivitäten des Vorfalls festzustellen?"
      },
      endzeitpunkt : {
        title : "Endzeitpunkt",
        text : "Wann wurden die letzten Aktivitäten des Vorfalls festgestellt?"
      },
      cia : {
        title : "Vertraulichkeit, Integrität, Verfügbarkeit",
        text : "Gab es unauthorisierten Zugriff auf vertrauliche Daten? Wurden Daten oder Systeme unauthorisiert modifiziert? Wurde die Verwendung von Daten oder Systemen beeinträchtigt?"
      },
      funktionaleAuswirkungen : {
        title : "Funktionale Auswirkungen",
        text : "<b>HOCH</b>: Die Funktionsweise von kritischen Diensten wurde für ALLE Nutzer eingeschränkt<br><br><b>MITTEL</b>: Die Funktionsweise von kritischen Diensten wurde für EINIGE Nutzer eingeschränkt<br><br></b>NIEDRIG</b>: Alle Dienste sind für alle Nutzer verfügbar, es bestehen Einschränkungen in der Perfomanz der Dienste<br><br>KEINE: Es bestehen keinerlei Einschränkungen bezüglich der Nutzung aller Dienste"
      },
      unauthZugriffVertrInfo : {
        title : "Zugriff auf Informationen",
        text : "<b>GEHEIM</b>: Die Vertraulichkeit von streng geheimen Informationen wurde gefährdet<br><br><b>GESCHÜTZT</b>: Die Vertraulichkeit von geschützten firmenkritischen Informationen wurde gefährdet<br><br><b>PRIVAT</b>: Die Vertraulichkeit von persönlichen Informationen wurde gefährdet<br><br><b>INTEGRITÄT</b>: Die notwendige Integrität von Informationen wurde gefährdet<br><br><b>KEINE</b>: Keinerlei Informationen wurden gefährdet"
      }
  	}
  	this.auswirkungen = {
  		optionen : ["Hoch", "Mittel", "Niedrig", "Keine"]
  	};
  	this.unauthZugriffVertrInfo = {
  		optionen : ["Geheim", "Geschützt", "Privat", "Integrität", "Keine"]
  	};
  });
