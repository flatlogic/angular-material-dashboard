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

    function checkLaunch() {
      vm.launchAllowed = vm.launchToMars || vm.launchToVenus;
    }

    function showAlert() {
      alert = $mdDialog.alert({
        title: 'Poyekhali!',
        content: "Rockets launched!" + " To Mars: " + vm.launchToMars + ", to Venus: " +vm.launchToVenus,
        ok: 'Close'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }

  }

})();
