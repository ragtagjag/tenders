(function () {
    'use strict';

    angular
        .module('app')
        .controller('Tenders.IndexController', Controller);

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
            
            PostService.GetAll().then(function (posts) {
                console.log("hey there yo");
                console.log(JSON.stringify(posts));
                vm.posts = posts;
            });
        }
    }

})();