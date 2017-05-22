(function () {
    'use strict';

    angular
        .module('JMAPP')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope', 'UserFactory', 'GiphyFactory', 'MarvelFactory'];

    function UserController($scope, UserFactory, GiphyFactory, MarvelFactory) {
        $scope.users = [];
        $scope.newUser = {};
        $scope.newUser.gifs = [];
        $scope.gifswanted = [];
        $scope.comicswanted = [];
        $scope.selectBtn = selectBtn;
        $scope.optionSelected = 'data';
        $scope.searchGifs = searchGifs;
        $scope.searchComics = searchComics;
        $scope.offset = 0;
        $scope.offsetComic = 0;
        $scope.optionSearch = optionSearch;
        $scope.sort = 'relevant';
        $scope.modeOffset = modeOffset;
        $scope.modeOffsetComic = modeOffsetComic;
        $scope.searchDone = false;
        $scope.searchDoneComic = false;
        $scope.isFavoriteContentGif = false;
        $scope.isFavoriteContentComic = false;
        $scope.addToFavoriteGif = addToFavoriteGif;
        $scope.addToFavoriteComic = addToFavoriteComic;
        $scope.removeToFavorite = removeToFavorite;
        $scope.existingGif = existingGif;
        $scope.existingComic = existingComic;
        $scope.saveNewUser = saveNewUser;
        $scope.editUser = editUser;
        $scope.modifyUser = modifyUser;
        $scope.editing = false;
        $scope.deleteUser = deleteUser;
        activate();

        ////////////////

        function activate() {
            $scope.users = UserFactory.getAll();
        }

        function selectBtn(option) {
            $scope.optionSelected = option;
        }

        function searchGifs(nameGifs, num) {
            if (nameGifs == '') {
                alert('Enter the gif you want to search ...');
            } else {
                if (num == 0) {
                    $scope.offset = 0;
                }
                $scope.searchDone = true;
                $scope.nameGifs = nameGifs.toLowerCase();
                nameGifs = nameGifs.split(" ");
                nameGifs = nameGifs.join("+");
                GiphyFactory.getAll(nameGifs, $scope.sort, $scope.offset)
                    .then(function (response) {
                        $scope.gifswanted = response;
                    })
            }

        }

        function searchComics(nameComics, num) {
            if (nameComics == '') {
                alert('Enter the comic you want to search ...');
            } else {
                if (num == 0) {
                    $scope.offsetComic = 0;
                }
                $scope.searchDoneComic = true;
                nameComics = nameComics.split(" ");
                nameComics = nameComics.join("%20");
                MarvelFactory.getAll(nameComics, $scope.offsetComic)
                    .then(function (response) {
                        $scope.comicswanted = response;
                    })
            }
        }

        function optionSearch(type) {
            $scope.sort = type;
        }

        function modeOffset(num) {
            $scope.offset = $scope.offset + num;
            if ($scope.offset < 0) {
                $scope.offset = 0;
            }
            searchGifs($scope.nameGifs);
        }

        function modeOffsetComic(num) {
            $scope.offsetComic = $scope.offsetComic + num;
            if ($scope.offsetComic < 0) {
                $scope.offsetComic = 0;
            }
            searchComics($scope.nameComics);
        }

        function addToFavoriteGif(gifwanted) {
            $scope.isFavoriteContentGif = true;
            var exists = existingGif(gifwanted);
            if (!exists) {
                $scope.newUser.gifs.push(gifwanted);
            } else {
                alert("This gif is already marked");
            }
        }

        function existingGif(gifwanted) {
            var exists = false;
            $scope.newUser.gifs.forEach(function (element, position) {
                if (element == gifwanted) {
                    exists = true;
                }
            })
            return exists;
        }

        function addToFavoriteComic(comicwanted) {
            $scope.isFavoriteContentComic = true;
            if (!$scope.newUser.comics){
                $scope.newUser.comics = [];
            }
            var exists = existingComic(comicwanted);
            if (!exists) {
                $scope.newUser.comics.push(comicwanted);
            } else {
                alert("This comic is already marked");
            }
        }

        function existingComic(comicwanted) {
            var exists = false;
            $scope.newUser.comics.forEach(function (element, position) {
                if (element.id == comicwanted.id) {
                    exists = true;
                }
            })
            return exists;
        }

        function removeToFavorite(name, type) {
            if (type == 'gifs') {
                $scope.newUser.gifs.forEach(function (element, position) {
                    if (name == element) {
                        $scope.newUser.gifs.splice(position, 1);
                    }
                })
            } else if (type == 'comics') {
                $scope.newUser.comics.forEach(function (element, position) {
                    if (name == element) {
                        $scope.newUser.comics.splice(position, 1);
                    }
                })
            }
        }

        function saveNewUser(newUser) {
            if(!$scope.newUser.comics){
                $scope.newUser.comics = [];
            } else if ($scope.newUser.gifs){
                $scope.newUser.gifs = [];
            }
            UserFactory.addUser(newUser);
            $scope.users = UserFactory.getAll();
            delete $scope.newUser;
            $scope.isFavoriteContentComic = false;
            $scope.isFavoriteContentGif = false;
            delete $scope.nameComics;
            delete $scope.nameGifs;
            delete $scope.comicswanted;
            delete $scope.gifswanted;
            $scope.searchDone = false;
            $scope.searchDoneComic = false;
        }

        function deleteUser(user) {
            var isSure = confirm('Are you sure you want to delete this contact?');
            if (isSure == true) {
                UserFactory.remove(user);
                $scope.users = UserFactory.getAll();
                alert('Contact removed');
            }
        }

        function editUser(user) {
            $scope.editing = true;
            $scope.isFavoriteContentComic = true;
            $scope.isFavoriteContentGif = true;
            $scope.newUser = angular.copy(user);
        };
        function modifyUser(newUser){
            UserFactory.modify(newUser);
            $scope.users = UserFactory.getAll();
            $scope.editing = false;
            delete $scope.newUser;
            $scope.isFavoriteContentComic = false;
            $scope.isFavoriteContentGif = false;
            delete $scope.nameComics;
            delete $scope.nameGifs;
            delete $scope.comicswanted;
            delete $scope.gifswanted;
            $scope.searchDone = false;
            $scope.searchDoneComic = false;
        }
    }
})();