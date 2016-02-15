(function () {
    'use strict';

    angular
        .module('app')
        .controller('TenderId.IndexController', Controller);

    function Controller($scope, $stateParams, UserService, PostService) {
        var vm = this;

        vm.user = null;
        vm.post = {};

        vm.deleteTender = deleteTender;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            console.log("hi");
            console.log("USerParams" + $stateParams.title);
            PostService.GetByTitle($stateParams.title).then(function (post){
                console.log("PostService.GetByTitle"+JSON.stringify(post));
                vm.post = (post[0]);
                console.log("PostService Title "+vm.post.title);
            });          

        }

        function deleteTender() {
            console.log("printing id... "+vm.post._id);
            PostService.deleteTender(vm.post._id).then(function (result){
                console.log(result);
            })
        }
    }

})();