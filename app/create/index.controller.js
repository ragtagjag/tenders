(function () {
    'use strict';

    angular
        .module('app')
        .controller('Create.IndexController', Controller);

    function Controller($window, UserService, FlashService, PostService) {
        

        var vm = this;

        vm.user = null;
        vm.tender;
        vm.createTender = createTender;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });

        }

        function createTender() {
            PostService.CreateTender(vm.tender)
                .then(function () {
                    FlashService.Success('Tender created! :D');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();