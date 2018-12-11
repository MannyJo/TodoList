const todoApp = angular.module('TodoApp', ['ngRoute', 'ngMaterial']);

todoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../views/project.html',
        controller: 'ProjectController as vm'
    })
    .when('/project', {
        templateUrl: '../views/project.html',
        controller: 'ProjectController as vm'
    })
    .when('/task/:projectId', {
        templateUrl: '../views/task.html',
        controller: 'TaskController as vm'
    })
    .otherwise({
        template: '<h2>404</h2>'
    });
}]);

todoApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);