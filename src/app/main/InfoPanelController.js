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
    vm.reloadStaging = false;
    vm.reloadProduction = false;
    vm.checkButton = checkButton;
    vm.showAlert = showAlert;
    vm.startValue = 0;
    vm.bufferValue = 1;

    function checkButton() {
      vm.buttonEnabled = vm.reloadStaging || vm.reloadProduction;
    }

    function showAlert() {
      vm.startValue = 100;
      vm.bufferValue = 100;
      alert = $mdDialog.alert({
        title: 'Reloading done!',
        content: "Servers reloaded." + " Staging: " + vm.reloadStaging + ", Production: " +vm.reloadProduction,
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
