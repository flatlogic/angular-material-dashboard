'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'sidebar'])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');

    $mdIconProvider
      .defaultIconSet('assets/images/icons.svg', 128)
      .icon('menu', 'assets/images/menu.svg', 24)
      .icon('actions', 'assets/images/actions.svg', 24);
  });
