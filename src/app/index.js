'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'admin'])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        }
      })
      .state('home.profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.html',
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
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('orange')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdIconProvider
      .defaultIconSet('assets/images/icons.svg', 128)
      .icon('menu', 'assets/images/menu.svg', 24)
      .icon('user', 'assets/images/user.svg', 64);
  })

  .directive('panelWidget', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: { title: '@', template: '@' },
      template: '' +
      '<section layout-margin class="md-whiteframe-z1">' +
      '  <md-toolbar md-theme="grey" class="md-hue-1">' +
      '    <div class="md-toolbar-tools">' +
      '     <h3>{{title}}</h3>' +
      '     <span flex></span>' +
      '     <md-button>Options</md-button>' +
      '    </div>' +
      '  </md-toolbar>' +
      '  <div ng-include="template"/>' +
      '</section>',
      compile: function(element, attrs, linker) {
        return function(scope, element) {
          linker(scope, function(clone) {
            element.append(clone);
          });
        };
      }
    };
  });
