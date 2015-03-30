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
        name: 'Table',
        icon: 'svg-4',
        sref: '.table'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
