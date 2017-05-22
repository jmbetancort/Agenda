(function () {
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
        function getAll(words, sort, offset) {
            return $http.get('http://api.giphy.com/v1/gifs/search?q=' + words + '&sort=' + sort + '&offset=' + offset + '&limit=8&api_key=dc6zaTOxFJmzC')
                .then(function (response) {
                    var gifs = [];
                    var array = response.data.data;
                    array.forEach(function (element, position) {
                        gifs.push(element.images.original.url);
                    })
                    return gifs;
                }, function (error) {
                    alert("Could not perform requested search!")
                    return [];
                });
        }
    }
})();