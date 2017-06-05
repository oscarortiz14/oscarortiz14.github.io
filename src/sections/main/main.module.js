(function ()
{
    'use strict';

    angular
            .module('app.home', [])
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.home', {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/main/main.html',
                            controller: 'HomeCtrl as home'
                        }
                    }
                });
    }
})();