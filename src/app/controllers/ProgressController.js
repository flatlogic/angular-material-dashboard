(function(){

  angular
    .module('app')
    .controller('ProgressController', [
      'progressService','$q',
      ProgressController
    ]);

  function ProgressController(progressService, $q) {
    var vm = this;

    vm.progressData = {};
    vm.progressPeriod = 'week';
    vm.changePeriod = changePeriod;

    activate();

    function activate() {
      var queries = [loadData()];
      $q.all(queries);
    }


    function loadData() {
      vm.progressData = progressService.getProgressData(vm.progressPeriod);
    }

    function changePeriod() {
      loadData();
    }
  }
})();
