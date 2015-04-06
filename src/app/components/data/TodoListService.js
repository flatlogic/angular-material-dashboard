(function(){
  'use strict';

  angular.module('app')
        .service('todoListService', [
        '$q',
      todoList
  ]);

  function todoList($q){
    var todos = [
      {text: 'Continuous integration', done: false},
      {text: 'Implement panel-widget directive', done: true},
      {text: 'Add backend', done: false}
    ];

    return {
      loadAllItems : function() {
        return $q.when(todos);
      }
    };
  }
})();
