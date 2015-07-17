(function () {
    angular
        .module('app')
        .controller('VisitorsController', [
            VisitorsController
        ]);

    function VisitorsController() {
        var vm = this;

        // TODO: move data to the service
        vm.visitorsChartData = [ {key: 'Mobile', y: 5264}, { key: 'Desktop', y: 3872} ];

        vm.chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: (d3.format(".0f")),
                color: ['rgb(0, 150, 136)', '#E75753'],
                showLabels: false,
                showLegend: false,
                title: 'Over 9K',
                margin: { top: -10 }
            }
        };
    }
})();
