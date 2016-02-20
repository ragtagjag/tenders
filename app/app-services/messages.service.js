(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessageService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.SendMessage = SendMessage;

         /* No yet available
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        */

        return service;


        function GetAll(thisId, rp){
            var newObj = {xaxl: rp};
            return $http.post('/api/messages/' + thisId, newObj).then(handleSuccess, handleError);
        }
        
        function SendMessage(msg){
            console.log(JSON.stringify(msg));
            return $http.post('/api/messages/send', msg).then(handleSuccess, handleError);
        }


        // private functions

        function handleSuccess(res) {
            console.log("**" + JSON.stringify(res.data));
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
