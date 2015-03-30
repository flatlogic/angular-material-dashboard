(function(){

  angular
    .module('admin')
    .controller('DashboardController', [
      '$mdDialog','$timeout', '$q', 'countriesService', 'messagesService',
      DashboardController
    ]);

  function DashboardController($mdDialog, $timeout, $q, countriesService, messagesService) {
    var vm = this;

    vm.launchAllowed = false;
    vm.launchToMars = false;
    vm.launchToVenus = false;
    vm.checkLaunch = checkLaunch;
    vm.showAlert = showAlert;
    vm.startValue = 0;
    vm.bufferValue = 1;
    vm.countries = countriesService.loadAll();
    vm.selectedCountry = null;
    vm.searchText = null;
    vm.querySearch = querySearch;
    vm.messages = [ ];

    messagesService
      .loadAllItems()
      .then(function(messages) {
        vm.messages = [].concat(messages);
      });

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

    function querySearch (query) {
      var results = query ? vm.countries.filter( createFilterFor(query) ) : [],
        deferred;
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  }

})();
