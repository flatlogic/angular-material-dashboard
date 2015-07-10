'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'app'])

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
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('orange')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('red', 'default')
      .primaryPalette('red');

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#E75753',
      '100': '#E75753',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

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
      scope: { title: '@', template: '@', options: '@' },
      template: '' +
      '<section layout-margin class="md-whiteframe-z1">' +
      '  <md-toolbar md-theme="white" class="panel-widget">' +
      '    <div class="md-toolbar-tools">' +
      '      <h3>{{title}}</h3>' +
      '      <span flex></span>' +
      '      <md-button ng-show="options" ng-click="$showOptions = !$showOptions" class="md-icon-button" aria-label="Show options">' +
      '        <md-icon md-svg-icon="show"></md-icon>' +
      '      </md-button>' +
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
