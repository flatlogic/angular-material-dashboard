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
        class: 'md-accent'
      },
      {
        issue: 'Table component',
        progress: 40,
        status: 'Feedback',
        class: ''
      },
      {
        issue: 'Dashboard tiles',
        progress: 100,
        status: 'Done',
        class: 'md-accent'
      },
      {
        issue: 'Panel widget',
        progress: 84,
        status: 'In progress',
        class: 'orange'
      },
      {
        issue: 'Form',
        progress: 100,
        status: 'Done',
        class: 'md-accent'
      },
      {
        issue: 'Custom CSS',
        progress: 20,
        status: 'Feedback',
        class: ''
      },
      {
        issue: 'Add backend',
        progress: 1,
        status: 'To do',
        class: 'md-warn'
      },
      {
        issue: 'Layout with sidebar',
        progress: 100,
        status: 'Done',
        class: 'md-accent'
      }
    ];

    function PickRandom() {
      return Object.assign({}, tableData[Math.floor(Math.random()*tableData.length)]);
    }

    return {
      loadAllItems : function() {
        return $q.when(tableData);
      },
      /**
       * Query expects that `limit`,`page`, and `order` fields be present
       */
      loadByPagination: function (query) {
        query = query || {limit:10,page:1};
         
        var list = [];
        var start = (query.page-1)*query.limit;
        var end = start + query.limit;
        for (var i = start; i < end; i++) {
          var f = PickRandom();
          f.id = i+1;
          list.push(f);
        }
        return $q.when({items:list,count:800});
      }
    };
  }
})();
