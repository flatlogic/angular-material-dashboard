(function(){

  angular
    .module('app')
    .controller('DataTableController', [
      'tableService',
      TableController
    ]);

  function TableController(tableService) {
    var vm = this;

    vm.tableData = [];

    tableService
      .loadAllItems()
      .then(function(tableData) {
        vm.tableData = [].concat(tableData);
      });
  }

})();
