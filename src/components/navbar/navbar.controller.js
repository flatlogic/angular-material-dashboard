'use strict';

angular.module('angularMaterialAdmin')
  .controller('NavbarCtrl', function ($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
