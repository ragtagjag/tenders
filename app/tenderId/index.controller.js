(function () {
    'use strict';

    angular
        .module('app')
        .controller('TenderId.IndexController', Controller);

    function Controller(UserService, PostService) {
        var vm = this;

        vm.user = null;
        vm.post = {};

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            console.log("hi");
            
            PostService.GetByTitle("megatown").then(function (post){
                console.log(JSON.stringify(post));
                vm.post = (post[0]);
                console.log(vm.post.title);
            });          

        }
    }

})();