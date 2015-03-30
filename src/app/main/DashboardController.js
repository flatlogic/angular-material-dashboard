(function(){

  angular
    .module('admin')
    .controller('DashboardController', [
      '$mdDialog',
      DashboardController
    ]);

  function DashboardController($mdDialog) {
    var vm = this;

    vm.launchAllowed = false;
    vm.launchToMars = false;
    vm.launchToVenus = false;
    vm.checkLaunch = checkLaunch;
    vm.showAlert = showAlert;
    vm.startValue = 0;
    vm.bufferValue = 1;

    function checkLaunch() {
      vm.launchAllowed = vm.launchToMars || vm.launchToVenus;
    }

    function showAlert() {
      vm.startValue = 100;
      vm.bufferValue = 100;
      alert = $mdDialog.alert({
        title: 'Poyekhali!',
        content: "Rockets launched!" + " To Mars: " + vm.launchToMars + ", to Venus: " +vm.launchToVenus,
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
