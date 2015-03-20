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
        icon: 'svg-4',
        sref: '.messages'
      },
      {
        name: 'Search',
        icon: 'svg-3',
        sref: '.search'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
