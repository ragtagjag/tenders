(function () {
    'use strict';

    angular
        .module('app')
        .controller('Create.IndexController', Controller);

    function Controller($window, UserService, FlashService, PostService) {
        

        var vm = this;

        vm.user = null;
        vm.tender = null;
        vm.createTender = createTender;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });

        }

        function createTender() {
            vm.tender.creator = {};
            vm.tender.creator.name = vm.user.firstName + " " + vm.user.lastName;
            vm.tender.creator.id = vm.user._id;
            vm.tender.creator.company = vm.user.companyName;

            vm.tender.date_created = new Date();
            vm.tender.date_updated = new Date();

            vm.tender.questions = [];
            vm.tender.attachments = [];

            vm.tender.applicants = [];
            
            vm.tender.active = true;
            vm.status = "new";


            console.log(JSON.stringify(vm.tender));
            PostService.CreateTender(vm.tender)
                .then(function () {
                    FlashService.Success('Tender created! :D');
                })
                .catch(function (error) {
                    FlashService.Error("Aw Shucks folks, no dice this time :D");
                });
        }
    }

})();