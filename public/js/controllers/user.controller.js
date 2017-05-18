(function() {
'use strict';

    angular
        .module('JMAPP')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope','UserFactory','GiphyFactory'];
    function UserController($scope,UserFactory,GiphyFactory) {
        $scope.users = [];
        $scope.selectBtn = selectBtn;
        $scope.optionSelected = 'data';
        $scope.searchGifs = searchGifs;

        activate();

        ////////////////

        function activate() {
            $scope.users = UserFactory.getAll();
         }
         function selectBtn(option){
             $scope.optionSelected = option;
         }
         function searchGifs(nameGifs){
             var hola = GiphyFactory.getAll();
             console.log(hola);
         }
    }
})();