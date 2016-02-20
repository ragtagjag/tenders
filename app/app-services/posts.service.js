(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByTitle = GetByTitle;
        service.CreateTender = CreateTender;
        service.deleteTender = deleteTender;
        service.askQuestion = addQuestion;

         /* No yet available
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        */

        return service;

        function GetById(){
            return {
                "title" : "Test 1",
                "content" : "This is Test 1",
                "date" : "5 Feb 2016",
                "user" : "Oblong Shcism",
                "deadline" : ""
            };
        }

        function GetByTitle(title) {
            console.log("PostService Title = '/api/tender/" + title);
            return $http.get('/api/tender/' + title).then(handleSuccess, handleError);
        }

        function GetAll(){
            return $http.get('/api/tender/getAll').then(handleSuccess, handleError);
        }

        function CreateTender(tender){
            console.log("create tender PostService"+ JSON.stringify(tender) + tender);
            return $http.post('/api/tender/createTender', tender).then(handleSuccess, handleError);
        }

        function deleteTender(tenderId){
            console.log("tenderId.."+tenderId);
            return $http.post('/api/tender/deleteTender', tenderId).then(handleSuccess, handleError);
        }

        function addQuestion(newQuestion, tid){
            console.log("question"+newQuestion+"|"+tid);
            var qObj = {
                question: newQuestion,
                id: tid
             };
            return $http.post('/api/tender/addQuestion/'+tid, qObj).then(handleSuccess, handleError);
        }
        
        // private functions

        function handleSuccess(res) {
            console.log("**" + JSON.stringify(res.data[0]));
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
