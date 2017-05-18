(function() {
    'use strict';

    angular.module('JMAPP', ['ngRoute']).config(config);
    config.$inject=['$routeProvider','$locationProvider'];
    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/",{
                controller: 'UserController',
                templateUrl: 'views/home.html'
            })
            .when("/user/:id",{
                controller: 'DetailsController',
                templateUrl: 'views/details.html'
            })
            .otherwise( { redirectTo: "/"});
    }
})();