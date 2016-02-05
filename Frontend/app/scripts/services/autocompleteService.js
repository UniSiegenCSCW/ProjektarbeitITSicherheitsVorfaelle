'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.service:autocompleteService
 * @description
 * # Service 
 * 
 */

angular.module('kritisformularApp')
  .factory('autocompleteService', function ($q, $http) {
  	
  	this.getVendors = function(typed) {
  		var vendorData = $q.defer();
      var vendors;

  		$http({
  			method: 'POST',
  			url: 'http://localhost:3000/autocompleteVendor',
        data: {'filter' : typed}
  		}).then(function successCallback(response) {
        vendors = response.data  		
        vendorData.resolve(vendors);	
  		}, function errorCallback(response) {
        console.log('error', response);
  		})
      return vendorData.promise
  	}

    this.getProducts = function(vendorField) {
      var productData = $q.defer();
      var products;

      $http({
        method: 'POST',
        url: 'http://localhost:3000/autocompleteProduct',
        data: {'vendor': vendorField}
      }).then(function successCallback(response) {
        products = response.data
        productData.resolve(products);
      }, function errorCallback(response) {
        console.log('error', response);
      })
      return productData.promise
    }

  	return this;
  });