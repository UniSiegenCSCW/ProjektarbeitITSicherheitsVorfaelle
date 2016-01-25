'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:EinsCtrl
 * @description
 * # Super Controller der in allen Views vorhanden ist
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('SuperCtrl', function () {
    this.data = {
    	angriff : {
    		miskonfiguration : {
    			checked : false,
    			optionenChecked : []
    		},
    		usb : {
    			checked : false,
    			optionenChecked : []
    		},
				email : {
    			checked : false,
    			optionenChecked : []
    		},
				eval : {
    			checked : false,
    			optionenChecked : []
    		},
    		botnetz : {
    			checked : false,
    			optionenChecked : []
    		},
				ident : {
    			checked : false,
    			optionenChecked : []
    		},
				sichlueck : {
    			checked : false,
    			optionenChecked : []
    		},
    		social : {
    			checked : false,
    			optionenChecked : []
    		},
    		schadprogramm : {
    			checked : false,
    			optionenChecked : []
    		}
    	}
    };
  });
