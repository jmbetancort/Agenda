(function() {
'use strict';

    angular
        .module('JMAPP')
        .factory('UserFactory', UserFactory);

    function UserFactory() {
        return {
            getAll: getAll,
            get: get,
            modify: modify,
            remove: remove
        }
        function getAll(){
            if('user' in localStorage){
                if(localStorage.getItem('users')){
                    return JSON.parse(localStorage.getItem('users'));
                } else {
                    return [];
                }
            }
        }
        function get(){}
        function modify(){}
        function remove(){}
    }
})();