'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:EinsCtrl
 * @description
 * # Controller für Schritt 1 des Formulars
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('EinsCtrl', function () {
  	this.popoverText = {
  			vorname : {
  				title : "Vorname",
  				text : "Hier bitte den Vornamen eingeben"
  			},
  			nachname : {
  				title : "Nachname",
  				text : "Hier bitte den Nachname eingeben"
  			},
  			organisation : {
  				title : "Organisation",
  				text : "Um welche Organisation/Firma handelt es sich?"
  			},
        branche : {
          title : "Branche",
          text : "Welcher Branche ist Ihre Organisation zugehörig?"
        },
  			organisationRolle : {
  				title : "Rolle in der Organisation",
  				text : "Welche Rolle haben Sie in der Organisation?"
  			},
  			email : {
  				title : "E-Mail",
  				text : "Hier bitte die E-Mail Adresse angeben"
  			},
  			telefonnummer : {
  				title : "Telefonnumer",
  				text : "Hier bitte die Telefonnummer angeben, unter der Sie im Notfall erreichbar sind"
  			},
        kritis : {
          title : "Kritische Infrastruktur",
          text : "Kritische Infrastrukturen (KRITIS) sind Organisationen oder Einrichtungen mit wichtiger Bedeutung für das staatliche Gemeinwesen, bei deren Ausfall oder Beeinträchtigung nachhaltig wirkende Versorgungsengpässe, erhebliche Störungen der öffentlichen Sicherheit oder andere dramatische Folgen eintreten würden."
        }
  	}
  });
