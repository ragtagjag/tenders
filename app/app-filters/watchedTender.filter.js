(function () {
    'use strict';

    angular
        .module('app')
        .filter('watchedFilter', function () {  
               return function(inputs,ids) {
                  console.log("ids:" + JSON.stringify(ids[0]) + JSON.stringify(ids[1]) + JSON.stringify(ids[2]));
                  console.log("Input:" + JSON.stringify(inputs[0]) + JSON.stringify(inputs[1]) + JSON.stringify(inputs[2]));
                  var output = [];
                  angular.forEach(inputs, function (input) {
                    angular.forEach(ids, function (id) {
                      console.log ("inside loop ***** " + input._id + " | " + id);
                      if (input._id == id){
                        output.push(input);
                      }
                    });
                   });
                   console.log("OK************ "+ output);
                   return output;
               };
            });

})();
