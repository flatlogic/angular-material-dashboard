(function(){

  angular
    .module('admin')
    .controller('ProgressController', [
      'progressService',
      ProgressController
    ]);

  function ProgressController(progressService) {
    var vm = this;

    vm.progressData = [];

    progressService
      .loadAllItems()
      .then(function(progressData) {
        vm.progressData = [].concat(progressData);
      });
  }
})();
