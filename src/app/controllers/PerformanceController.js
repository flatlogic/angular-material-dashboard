(function () {
    angular
        .module('app')
        .controller('PerformanceController', [
            'performanceService', '$q',
            PerformanceController
        ]);

    function PerformanceController(performanceService, $q) {
        var vm = this;


        vm.performanceChartData = performanceFunction;

        function performanceFunction() {
            var sin = [];
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.abs(Math.cos(i/10) *0.25*i + 0.9 - 0.4*i)});
            }
            return [ { values: sin, color: 'rgb(0, 150, 136)', area: true } ];
        }

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
                tooltip: { contentGenerator: function (d) { return '<div class="custom-tooltip">' + d.point.y + '%</div>' + '<div class="custom-tooltip">' + d.series[0].key + '</div>' } },
                showControls: false
            }
        };

        vm.performanceData = {};
        vm.performanceChartData = [


            // TODO: move data to service, implement period switching
            {
                "key" : 'Middleware' ,
                "values" : [ [1,13], [2,14], [3,24], [4,18], [5,16], [6,14], [7,11], [8, 13], [9,15], [10,11], [11,18], [12,16], [13,28], [14,11], [15,12], [16,13], [17,12], [18,20], [19, 22], [20, 18], [21,11], [22,10], [23,18], [24, 20], [25,9], [26,14], [27,10], [28,11], [29,17] ]
            },

            {
                "key" : 'Ruby' ,
                "values" : [ [1,29], [2,36], [3,42], [4,25], [5,22], [6,34], [7,41], [8, 19], [9,45], [10,31], [11,28], [12,36], [13,54], [14,41], [15,36], [16,39], [17,21], [18,20], [19, 22], [20, 44], [21,32], [22,20], [23,28], [24, 24], [25,29], [26,19], [27,20], [28,31], [29,49] ]
            },

            {
                "key" : 'Web External' ,
                "values" : [ [1,54], [2,74], [3,64], [4,68], [5,56], [6,44], [7,61], [8, 63], [9,45], [10,51], [11,68], [12,46], [13,64], [14,51], [15,42], [16,63], [17,72], [18,60], [19, 52], [20, 58], [21,41], [22,40], [23,58], [24, 30], [25,49], [26,54], [27,60], [28,41], [29,66] ]
            } ,
            {
                "key" : 'Database' ,
                "values" : [ [1,64], [2,84], [3,64], [4,68], [5,86], [6,74], [7,81], [8, 83], [9,65], [10,61], [11,88], [12,76], [13,84], [14,71], [15,82], [16,73], [17,92], [18,80], [19, 62], [20, 68], [21,71], [22,50], [23,78], [24, 60], [25,59], [26,74], [27,80], [28,51], [29,97] ]
            }


        ];
        vm.performancePeriod = 'week';
        vm.changePeriod = changePeriod;

        activate();

        function activate() {
            var queries = [loadData()];
            $q.all(queries);
        }


        function loadData() {
            vm.performanceData = performanceService.getPerformanceData(vm.performancePeriod);
        }

        function changePeriod() {
            loadData();
        }
    }
})();
