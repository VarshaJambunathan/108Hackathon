var todomvc = angular.module('todomvc', ['firebase']);

todomvc.controller('TodoCtrl', function TodoCtrl($scope, $firebase) {
    var fireRef = new Firebase('https://jamlatlon.firebaseio.com/addperson');
    $scope.todos = $firebase(fireRef).$asArray();
    console.log($scope.todos);
    $scope.newTodo = '';

    $scope.addTodo = function(){
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length) {
            return;
        }
        // push to firebase
        $scope.todos.$add({
            title: newTodo,
            completed: false
        });
        $scope.newTodo = '';
    };

    $scope.removeTodo = function(todo){
        $scope.todos.$remove(todo);
    };

});