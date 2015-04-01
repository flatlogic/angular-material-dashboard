(function(){

  angular
    .module('admin')
    .controller('TodoController', [
      'todoListService',
      TodoController
    ]);

  function TodoController(todoListService) {
    var vm = this;

    vm.addTodo = addTodo;
    vm.remaining = remaining;
    vm.archive = archive;
    vm.todos = [];

    todoListService
      .loadAllItems()
      .then(function(todos) {
        vm.todos = [].concat(todos);
      });

    function addTodo() {
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
  }
})();
