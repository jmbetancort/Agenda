(function () {
    'use strict';

    angular
        .module('JMAPP')
        .factory('UserFactory', UserFactory);

    function UserFactory() {
        return {
            getAll: getAll,
            get: get,
            modify: modify,
            remove: remove,
            addUser: addUser,
        }

        function getAll() {
            if ('users' in localStorage) {
                return JSON.parse(localStorage.getItem('users'));
            } else {
                return [];
            }
        }

        function newIdUser() {
            return Math.random().toString(36).substr(2, 10);
        }

        function addUser(user) {
            user.id = newIdUser();
            var users = getAll();
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }

        function get() {}

        function modify(user) {
            var users = getAll();
            users.forEach(function(element,position){
                if (user.id == element.id){
                    users[position] = user;
                }
            })
            localStorage.setItem('users',JSON.stringify(users));
        }

        function remove(user) {
            var users = getAll();
            users.forEach(function (element,position){
                if (user.id == element.id){
                    users.splice(position,1);
                }
            })
            localStorage.setItem('users',JSON.stringify(users));
        }
    }
})();