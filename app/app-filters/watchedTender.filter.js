(function () {
    'use strict';

    angular
        .module('app')
        .filter('watchedFilter', function () {  
               return function(inputs,ids) {
                  var output = [];
                  angular.forEach(inputs, function (input) {
                    angular.forEach(ids, function (id) {
                      console.log("///" + input._id + " " + id);
                      if (input._id == id){
                        output.push(input);
                      }
                    });
                   });
                   return output;
               };
            });

})();
