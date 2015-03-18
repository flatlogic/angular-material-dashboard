'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'sidebar'])

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
        data: {
          title: 'Dashboard'
        },
        templateUrl: 'app/partials/dashboard.html'
      })
      .state('home.settings', {
        url: '/settings',
        data: {
          title: 'Settings'
        },
        templateUrl: 'app/partials/settings.html'
      })
      .state('home.notifications', {
        url: '/notifications',
        data: {
          title: 'Notifications'
        },
        templateUrl: 'app/partials/notifications.html'
      })
      .state('home.appearance', {
        url: '/appearance',
        data: {
          title: 'Appearance'
        },
        templateUrl: 'app/partials/appearance.html'
      })
      .state('home.bookmarks', {
        url: '/bookmarks',
        data: {
          title: 'Bookmarks'
        },
        templateUrl: 'app/partials/bookmarks.html'
      })
      .state('home.search', {
        url: '/search',
        data: {
          title: 'Search'
        },
        templateUrl: 'app/partials/search.html'
      })
      .state('home.messages', {
        url: '/messages',
        data: {
          title: 'Messages'
        },
        templateUrl: 'app/partials/messages.html'
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');

    $mdIconProvider
      .defaultIconSet('assets/images/icons.svg', 128)
      .icon('menu', 'assets/images/menu.svg', 24)
      .icon('actions', 'assets/images/actions.svg', 24);
  });
