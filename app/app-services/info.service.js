(function () {
    'use strict';

    angular
        .module('app')
        .factory('InfoService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetActs = GetActs;
        service.GetVenues = GetVenues;

         /* No yet available
        service.GetEvents = GetEvents;

        */

        return service;


        function GetActs(){
            return $http.post('/api/info/acts').then(handleSuccess, handleError);
        }
        
         function GetVenues(){
            return $http.post('/api/info/venues').then(handleSuccess, handleError);
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
