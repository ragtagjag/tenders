(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, PostService, MessageService) {
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
                
                console.log(JSON.stringify(posts));
                vm.posts = posts;
            });

            MessageService.GetAll().then(function(mb) {
                vm.mail = mb[0];
            });
        }
    }

})();