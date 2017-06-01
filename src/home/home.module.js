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
                            templateUrl: 'src/home/home.html',
                            controller: 'HomeCtrl as home'
                        }
                    }
                });
    }
})();