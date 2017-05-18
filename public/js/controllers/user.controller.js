(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope','UserFactory','GiphyFactory'];
    function UserController($scope,UserFactory,GiphyFactory) {
        $scope.users = [];
        $scope.newUser = {};
        $scope.newUser.gifs = [];
        $scope.gifswanted = [];
        $scope.selectBtn = selectBtn;
        $scope.optionSelected = 'data';
        $scope.searchGifs = searchGifs;
        $scope.offset = 0;
        $scope.optionSearch = optionSearch;
        $scope.sort = 'relevant';
        $scope.modeOffset = modeOffset;
        $scope.searchDone = false;
        $scope.addToFavoriteGif = addToFavoriteGif;
        $scope.removeToFavoriteGif = removeToFavoriteGif;
        $scope.saveNewUser = saveNewUser;
        activate();

        ////////////////

        function activate() {
            $scope.users = UserFactory.getAll();
         }
         function selectBtn(option){
             $scope.optionSelected = option;
         }
         function searchGifs(nameGifs){
             $scope.searchDone = true;
             $scope.nameGifs= nameGifs.toLowerCase();
             nameGifs = nameGifs.split(" ");
             nameGifs = nameGifs.join("+");
             GiphyFactory.getAll(nameGifs,$scope.sort,$scope.offset)
             .then(function (response){
                 $scope.gifswanted = response;
             })
         }
         function optionSearch(type){
             $scope.sort = type;
         }
         function modeOffset(num){
             $scope.offset = $scope.offset + num;
             if($scope.offset <= 0){
                 $scope.offset = 0;
             }
             searchGifs($scope.nameGifs);
         }
         function addToFavoriteGif(gifwanted){
             $scope.newUser.gifs.push(gifwanted);
         }
         function removeToFavoriteGif(gif){
             $scope.newUser.gifs.forEach(function (element, position){
                 if(gif == element){
                     $scope.newUser.gifs.splice(position,1);
                 }
             })
         }
         function saveNewUser(newUser){
             UserFactory.addUser(newUser);
             $scope.users = UserFactory.getAll();
         }
    }
})();