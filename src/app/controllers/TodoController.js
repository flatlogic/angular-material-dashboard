(function () {
    angular
        .module('app')
        .controller('TodoController', [
            'todoListService',
            TodoController
        ]);

    function TodoController(todoListService) {
        var vm = this;

        vm.addTodo = addTodo;
        vm.remaining = remaining;
        vm.archive = archive;
        vm.toggleAll = toggleAll;
        vm.todos = [];

        todoListService
            .loadAllItems()
            .then(function (todos) {
                vm.todos = [].concat(todos);
            });

        function addTodo() {
            if (!vm.todoText) return;
            vm.todos.push({text: vm.todoText, done: false});
            vm.todoText = '';
        }

        function remaining() {
            var count = 0;
            angular.forEach(vm.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        }

        function archive(e) {
            // Prevent from submitting
            e.preventDefault();
            var oldTodos = vm.todos;
            vm.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) vm.todos.push(todo);
            });
        }

        function toggleAll() {
            if (remaining() == 0) {
                angular.forEach(vm.todos, function (todo) {
                    todo.done = false;
                });
            } else {
                angular.forEach(vm.todos, function (todo) {
                    todo.done = true;
                });
            }
        }
    }
})();
