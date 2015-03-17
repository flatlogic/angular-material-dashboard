(function(){
  'use strict';

  angular.module('sidebar')
         .service('navService', ['$q', navService]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'svg-1'
      },
      {
        name: 'Settings',
        icon: 'svg-2'
      },
      {
        name: 'Notifications',
        icon: 'svg-3'
      },
      {
        name: 'Appearance',
        icon: 'svg-4'
      },
      {
        name: 'Bookmarks',
        icon: 'svg-5'
      },
      {
        name: 'Search',
        icon: 'svg-6'
      },
      {
        name: 'Messages',
        icon: 'svg-7'
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
