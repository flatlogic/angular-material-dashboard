(function(){
  'use strict';

  angular.module('admin')
        .service('progressService', [
      progressService
  ]);

  function progressService(){

    var service = {
      getProgressData: getProgressData
    };

    return service;

    function getProgressData(progressPeriod) {
      if (progressPeriod === 'week') {
        return [
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
        ]
      } else {
        return [
          {
            title: 'Database',
            value: 41,
            theme: 'dark'
          },
          {
            title: 'Web external',
            value: 43,
            theme: ''
          },
          {
            title: 'Middleware',
            value: 6,
            theme: 'grey'
          },
          {
            title: 'Ruby',
            value: 21,
            theme: 'red'
          }
        ]
      }
    }
  }
})();
