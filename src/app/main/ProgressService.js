(function(){
  'use strict';

  angular.module('admin')
        .service('progressService', [
        '$q',
      progressService
  ]);

  function progressService($q){
    var progressData = [
      {
        title: 'Database',
        value: 54,
        theme: 'dark'
      },
      {
        title: 'Web external',
        value: 64,
        theme: ''
      },
      {
        title: 'Middleware',
        value: 13,
        theme: 'grey'
      },
      {
        title: 'Ruby',
        value: 29,
        theme: 'red'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(progressData);
      }
    };
  }
})();
