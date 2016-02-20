(function () {
    'use strict';

    angular
        .module('app')
        .controller('Messages.IndexController', Controller);

    function Controller($scope, $stateParams, UserService, PostService, MessageService) {
        var vm = this;
        vm.user = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                MessageService.GetAll(vm.user.mailboxes, vm.user.pin).then(function (msgs) {
                    console.log(JSON.stringify(msgs));
                    vm.msgs = msgs;
            });
            });
            console.log("got user, lets get mail...");
           
            
            

            }         

        }

    

})();