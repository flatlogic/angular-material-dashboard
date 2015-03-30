'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'admin'])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/partials/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        data: {
          title: 'Dashboard'
        }
      })
      .state('home.profile', {
        url: '/profile',
        templateUrl: 'app/partials/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/partials/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');

    $mdIconProvider
      .defaultIconSet('assets/images/icons.svg', 128)
      .icon('menu', 'assets/images/menu.svg', 24)
      .icon('user', 'assets/images/user.svg', 64);
  });
