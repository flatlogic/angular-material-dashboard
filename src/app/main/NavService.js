(function(){
  'use strict';

  angular.module('sidebar')
         .service('navService', ['$q', navService]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'svg-1',
        sref: '.dashboard'
      },
      {
        name: 'Settings',
        icon: 'svg-2',
        sref: '.settings'
      },
      {
        name: 'Notifications',
        icon: 'svg-3',
        sref: '.notifications'
      },
      {
        name: 'Appearance',
        icon: 'svg-4',
        sref: '.appearance'
      },
      {
        name: 'Bookmarks',
        icon: 'svg-5',
        sref: '.bookmarks'
      },
      {
        name: 'Search',
        icon: 'svg-6',
        sref: '.search'
      },
      {
        name: 'Messages',
        icon: 'svg-7',
        sref: '.messages'
      }
    ];

    // Promise-based API
    return {
      loadAllItems : function() {
        // Simulate async nature of real remote calls
        return $q.when(menuItems);
      }
    };
  }

})();
