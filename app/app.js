(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('tenders', {
                url: '/tenders',
                templateUrl: 'tenders/index.html',
                controller: 'Tenders.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'tenders' }
            })
            .state('tenders.tenderId', {
                url: '^/tenders/:title',
                views: {
                    '@': {
                            templateUrl: 'tenderId/index.html',
                            controller: 'TenderId.IndexController',
                            controllerAs: 'vm',
                            data: { activeTab: 'tenders' }
                        }
                    }
            }).state('tenders.create', {
                url: '/tenders/create',
                views: {
                    '@': {
                            templateUrl: 'create/index.html',
                            controller: 'Create.IndexController',
                            controllerAs: 'vm',
                            data: { activeTab: 'tenders' }
                        }
                    }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();