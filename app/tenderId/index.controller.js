﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('TenderId.IndexController', Controller);

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
            console.log("hi");
            
            vm.post = PostService.GetById();
            console.log(vm.post);

        }
    }

})();