(function () {
    angular
        .module('app')
        .controller('PerformanceController', [
            'performanceService', '$q',
            PerformanceController
        ]);

    function PerformanceController(performanceService, $q) {
        var vm = this;

        vm.chartOptions = {
            chart: {
                type: 'stackedAreaChart',
                height: 350,
                margin: { left: -15, right: -15 },
                x: function (d) { return d[0] },
                y: function (d) { return d[1] },
                showLabels: false,
                showLegend: false,
                title: 'Over 9K',
                showYAxis: false,
                showXAxis: false,
                color: ['rgb(0, 150, 136)', 'rgb(204, 203, 203)', 'rgb(149, 149, 149)', 'rgb(44, 44, 44)'],
                tooltip: { contentGenerator: function (d) { return '<div class="custom-tooltip">' + d.point.y + '%</div>' + '<div class="custom-tooltip">' + d.series[0].key + '</div>' } },
                showControls: false
            }
        };

        vm.performanceChartData = [];
        vm.performancePeriod = 'week';
        vm.changePeriod = changePeriod;

        activate();

        function activate() {
            var queries = [loadData()];
            $q.all(queries);
        }


        function loadData() {
            vm.performanceChartData = performanceService.getPerformanceData(vm.performancePeriod);
        }

        function changePeriod() {
            loadData();
        }
    }
})();
