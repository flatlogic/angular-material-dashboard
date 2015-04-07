(function(){
  'use strict';

  angular.module('app')
        .service('tableService', [
        '$q',
      tableService
  ]);

  function tableService($q){
    var tableData = [
      {
        issue: 'Nested views',
        progress: 100,
        status: 'Done',
        theme: ''
      },
      {
        issue: 'Table component',
        progress: 40,
        status: 'Feedback',
        theme: 'dark'
      },
      {
        issue: 'Dashboard tiles',
        progress: 100,
        status: 'Done',
        theme: ''
      },
      {
        issue: 'Panel widget',
        progress: 84,
        status: 'In progress',
        theme: 'grey'
      },
      {
        issue: 'Form',
        progress: 100,
        status: 'Done',
        theme: ''
      },
      {
        issue: 'Custom CSS',
        progress: 20,
        status: 'Feedback',
        theme: 'dark'
      },
      {
        issue: 'Add backend',
        progress: 1,
        status: 'To do',
        theme: 'red'
      },
      {
        issue: 'Layout with sidebar',
        progress: 100,
        status: 'Done',
        theme: ''
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(tableData);
      }
    };
  }
})();
