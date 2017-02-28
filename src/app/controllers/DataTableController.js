(function(){

  angular
    .module('app')
    .controller('DataTableController', [
      'tableService',
      '$scope',
      TableController
      
    ]);

  function TableController(tableService , $scope) {
    var vm = this;

    vm.tableData = [];
    vm.totalItems = 0;

    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 10,
      page: 1
    };
    $scope.selected = [];

    $scope.render = function (T) {
      return T;
    }
    var lastQuery = null;
    vm.getItems = function () { 
      /**
       * I don't know why this function is being called too many times,
       * it supposed to call once per pagination, so the next 3 lines are only to avoid
       * multiple requests. 
       */
      var query = JSON.stringify($scope.query);
      if (query == lastQuery) return;
      lastQuery = query;
      GetItemsData($scope.query);
      
    }

    function GetItemsData(query) {
      tableService
      .loadByPagination(query)
      .then(function(tableData) { 
        vm.tableData =  tableData.items;
        // Represents the count of database count of records, not items array!
        vm.totalItems = tableData.count;
        
      });

    } 
    
    GetItemsData($scope.query);
    


    
  }

})();
