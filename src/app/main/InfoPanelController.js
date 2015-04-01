(function(){

  angular
    .module('admin')
    .controller('InfoPanelController', [
      '$mdDialog',
      InfoPanelController
    ]);

  function InfoPanelController($mdDialog) {
    var vm = this;

    vm.buttonEnabled = false;
    vm.reloadServer = 'Staging';
    vm.showAlert = showAlert;
    vm.startValue = 0;
    vm.bufferValue = 1;

    function showAlert() {
      vm.startValue = 100;
      vm.bufferValue = 100;
      alert = $mdDialog.alert({
        title: 'Reloading done!',
        content: vm.reloadServer + " server reloaded.",
        ok: 'Close'
      });
      setTimeout(function(){
        $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
        vm.startValue = 0;
        vm.bufferValue = 1;
      }, 500);
    }
  }

})();
