(function(){
  'use strict';

  angular.module('admin')
         .service('navService', ['$q', navService]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'svg-1',
        sref: '.dashboard'
      },
      {
        name: 'Search',
        icon: 'svg-6',
        sref: '.search'
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
        name: 'Messages',
        icon: 'svg-7',
        sref: '.messages'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
