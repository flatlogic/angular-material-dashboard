(function() {
    'use strict';

    angular
        .module('app')
        .directive('messagesSection', messagesSectionDirective);

    function messagesSectionDirective() {
        return {
            restrict: 'E',
            controller: messagesSectionController,
            scope: {
                title: '@',
                messages: '='
            },
            controllerAs: 'vm',
            templateUrl: 'app/views/partials/messages-section.html'
        };

        function messagesSectionController($scope) {
            var vm = this;

            vm.title = $scope.title;
            vm.messages = $scope.messages;
        }
    }
})();