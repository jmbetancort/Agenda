(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('MarvelFactory', MarvelFactory);

    MarvelFactory.$inject = ['$http'];

    function MarvelFactory($http) {
        var service = {
            getAll: getAll
        };

        return service;

        ////////////////
        function getAll(words,offset) {
            return $http.get('https://gateway.marvel.com:443/v1/public/comics?titleStartsWith='+words+'&offset='+offset+'&limit=3&apikey=811de1aa0216942e9aa1970b409e9eb7')
                .then(function (response) {
                    var comics = [];
                    var array = response.data.data.results;
                    array.forEach(function (element, position) {
                        if(element.images.length == 0){
                            comics.push({
                                url : 'https://i.annihil.us/u/prod/marvel//universe3zx/images/a/a9/Example.jpg',
                                id : newIdComic() 
                            })
                        } else{
                            comics.push({
                                url : element.images[0].path+'.'+element.images[0].extension,
                                id : newIdComic() 
                            })
                        }
                    })
                    return comics;
                
                }, function (error) {
                    alert("Could not perform requested search!")
                    return {};
                });
        }
        function newIdComic() {
            return Math.random().toString(36).substr(2, 10);
        }
    }
})();