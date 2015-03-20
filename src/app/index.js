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
        data: {
          title: 'Dashboard'
        },
        templateUrl: 'app/partials/dashboard.html'
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
        templateUrl: 'app/partials/search.html',
        controller: 'SearchController',
        controllerAs: 'vm',
        data: {
          title: 'Search'
        }
      })
      .state('home.messages', {
        url: '/messages',
        controller: 'MessagesController',
        controllerAs: 'vm',
        templateUrl: 'app/partials/messages.html',
        data: {
          title: 'Messages'
        }
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');

    $mdIconProvider
      .defaultIconSet('assets/images/icons.svg', 128)
      .icon('menu', 'assets/images/menu.svg', 24);
  });
