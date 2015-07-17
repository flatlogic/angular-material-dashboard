(function(){
  'use strict';

  angular.module('app')
        .service('performanceService', [
      performanceService
  ]);

  function performanceService(){

    var service = {
      getPerformanceData: getPerformanceData
    };

    return service;

    function getPerformanceData(performancePeriod) {
      if (performancePeriod === 'week') {
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
