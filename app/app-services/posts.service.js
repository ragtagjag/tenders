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
        service.CreateTender = CreateTender

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

        function CreateTender(title){

        }
        
        // private functions

        function handleSuccess(res) {
            console.log("**" + res.data);
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
