(function(){

  angular
       .module('sidebar')
       .controller('MainController', [
          'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          MainController
       ]);

  function MainController( navService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var vm = this;

    vm.selected     = null;
    vm.menuItems    = [ ];
    vm.selectItem   = selectItem;
    vm.toggleItemsList   = toggleItemsList;
    vm.showActions  = showActions;

    navService
          .loadAllItems()
          .then( function( menuItems ) {
            vm.menuItems    = [].concat(menuItems);
            vm.selected = menuItems[0];
          });

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectItem (item) {
      vm.selected = angular.isNumber(item) ? $scope.menuItems[item] : item;
      vm.toggleItemsList();
    }

    function showActions($event) {
        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: 'app/main/view/bottomSheet.html',
          controller: [ '$mdBottomSheet', SheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        function SheetController( $mdBottomSheet ) {
          this.actions = [
            { name: 'Action1'   },
            { name: 'Action2' },
            { name: 'Action3' },
            { name: 'Action4' }
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
