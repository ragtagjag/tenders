(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;

        /*

        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        */

        return service;

        function GetAll() {
            var posts = [
            {
                "title" : "Test 1",
                "content" : "This is Test 1",
                "date" : "5 Feb 2016",
                "user" : "Oblong Shcism"
            },
            {
                "title" : "Test 2",
                "content" : " This is test 2",
                "date" : "4 Feb 2016",
                "user" : "Holtingdale Scrambler"
            },
            {
                "title" : "Test 3",
                "content" : "This is now the third of our fucking test posts",
                "date" : "2 Feb 2016",
                "user" : "Burt Bacharach"
            },
            {
                "title" : "Test 4",
                "content" : " This is test  4",
                "date" : "5 Feb 2016",
                "user" : "Orangutan Vestige"
            },
            {
                "title" : "Test 5",
                "content" : "This is now the fifth of our test posts",
                "date" : "",
                "user" : "Vicarious Dialect"
            },
            {
                "title" : "Test 6",
                "content" : " This is test 26",
                "date" : "",
                "user" : "Burned Vision"
            },
            {
                "title" : "Test 7",
                "content" : "This is now the fucking seventh of our test posts",
                "date" : "",
                "user" : "Romp Stomper"
            },
            {
                "title" : "Test 2",
                "content" : " This is test 2",
                "date" : "",
                "user" : "Bear Brigade"
            },
            {
                "title" : "Test 9",
                "content" : "This is now the third of our test posts",
                "date" : "",
                "user" : "Marble Launch"
            },
            {
                "title" : "Test 10",
                "content" : "The last and least test, fucking test TEN",
                "date" : "12/12/2015",
                "user" : "Bronze Sanctity"
            }
            ];

            return posts;
        }


    }

})();
