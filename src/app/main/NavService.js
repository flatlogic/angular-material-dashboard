(function(){
  'use strict';

  angular.module('admin')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'svg-1',
        sref: '.dashboard'
      },
      {
        name: 'Profile',
        icon: 'svg-2',
        sref: '.profile'
      },
      {
        name: 'Messages',
        icon: 'svg-7',
        sref: '.messages'
      },
      {
        name: 'Search',
        icon: 'svg-6',
        sref: '.search'
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
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
