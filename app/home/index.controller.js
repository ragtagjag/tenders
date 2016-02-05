(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, PostService) {
        var vm = this;

        vm.user = null;
        vm.posts = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            
            vm.posts = PostService.GetAll();
        }
    }

})();