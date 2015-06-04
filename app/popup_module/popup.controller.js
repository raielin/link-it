'use strict';

// Create controller with an array of links attached to its scope. This array will include the user's saved items.
angular.module('linkIT').controller('PopupController', function($scope, StorageService) {
  // Seed data for testing:
  // $scope.links = [
  //   {
  //     title: 'Smashing Magazine',
  //     url: 'http://www.smashingmagazine.com/'
  //   },
  //   {
  //     title: 'Markticle',
  //     url: 'https://markticle.com'
  //   }
  // ];

  $scope.links = StorageService.get();

  $scope.removeLink = function(url) {
    StorageService.remove(url);

    $scope.links = StorageService.get();

    if(!$scope.$$phase) {
      $scope.$apply();
    }
  };
});
