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
            
            MessageService.GetAll().then(function (mb) {
                console.log(JSON.stringify(mb));
                vm.mail = mb[0];
            });
            
            console.log("got user, lets get mail...");
           
            
            

            }         

        }

    

})();