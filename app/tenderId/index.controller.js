(function () {
    'use strict';

    angular
        .module('app')
        .controller('TenderId.IndexController', Controller);

    function Controller($scope, $stateParams, UserService, PostService, MessageService) {
        var vm = this;

        vm.user = null;
        vm.post = {};
        vm.newQuestion = '';
        vm.newMessage = {};

        vm.deleteTender = deleteTender;
        vm.addToWatched = addToWatched;
        vm.askQuestion = askQuestion;
        vm.sendMessage = sendMessage;

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

        function addToWatched(){
            vm.user.tendersWatched.push(vm.post._id);
            UserService.Update(vm.user).then(function (result){
                console.log("result:"+result);
            })
        }

        function askQuestion(){
            console.log("trying..."+vm.newQuestion);
            PostService.askQuestion(vm.newQuestion, vm.post._id).then(function (result){
                console.log(result);
                vm.newQuestion = '';
            })
        }

        function sendMessage(){
            vm.newMessage.mailbox = vm.post.creator.mail;
            vm.newMessage.sender = vm.user.username;
            MessageService.SendMessage(vm.newMessage)
                .then(function (result){
                    console.log("send Message: "+result);
                })
        }
    }

})();