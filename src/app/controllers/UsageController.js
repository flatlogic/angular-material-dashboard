(function(){
  angular
    .module('app')
    .controller('UsageController', [
      UsageController
    ]);

  function UsageController() {
    var vm = this;

    vm.chartOptions = {
      pieHole: 0.5,
      pieSliceTextStyle: { color: 'black' },
      legend: 'none',
      tooltip : { isHtml: true },
      pieSliceText: 'none',
      slices: { 0: { color: 'rgb(0, 150, 136)' },  1: { color: '#E75753' },  2: { color: 'rgb(235, 235, 235)' } }
    };
    vm.ramChart = {
      type: 'PieChart',
      options: vm.chartOptions,
      data: [ ['usedBy', 'percent'], ['Memory', 768660], ['Cache', 367404], ['Swap', 41924] ]
    };
    vm.storageChart = {
      type: 'PieChart',
      options: vm.chartOptions,
      data: [ ['usedBy', 'percent'], ['System', 126560], ['Other', 224365] ]
    };
  }
})();
