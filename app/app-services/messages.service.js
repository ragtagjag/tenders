(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessageService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
       

         /* No yet available
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        */

        return service;


        function GetAll(thisId){
            return $http.get('/api/messages/' + thisId).then(handleSuccess, handleError);
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
