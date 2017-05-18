(function() {
'use strict';

    angular
        .module('JMAPP')
        .factory('GiphyFactory', GiphyFactory);

    GiphyFactory.$inject = ['$http'];
    function GiphyFactory($http) {
        var service = {
            getAll: getAll
        };
        
        return service;

        ////////////////
        function getAll() { 
            return $http.get( 'http://api.giphy.com/v1/gifs/search?q=funny+cat&sort=recent&limit=8&api_key=dc6zaTOxFJmzC')
            .then ( function (response) { console.log(response); }
            , function (error) { console.log('Hubo algún error');}
);
        }
    }
})();