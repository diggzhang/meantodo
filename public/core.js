// public/core.js

var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    
    // get all todo show when this page loading
    $http.get('/api/todos')
    	.success( function(data) {
  			$scope.todos = data;
        	console.log(data);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
    
    // when submitting the add form, send the text to node API, that's cool
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
        	.success(function(data) {
        		$scope.formData = {}; //clear form
            	$scope.todos = data;
            	console.log(data);
        	})
        	.error(function(data) {
        		console.log('Error: ' + data);
        	});
    };
    
    // delete a todo after checking it 
    $scope.deleteTodo = function(id) {
    	$http.delete('/api/todos/' + id) 
        	.success(function(data) {
        		$scope.todos = data;    
            	console.log(data);
        	})
        	.error(function(data) {
        		console.log('Error: ' + data);
        	});
    };
};