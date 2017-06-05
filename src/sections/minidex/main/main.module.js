(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.minidex.main', {
                    abstract: true
                })
                .state('app.minidex.main.list', {
                    url: '/dex',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/main/main.html',
                            controller: 'DexCtrl as dex'
                        }
                    }
                })
                .state('app.minidex.main.details', {
                    url: '/dex/:id',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/main/templates/details.html',
                            controller: 'DexDetailsCtrl as ded'
                        }
                    }
                });
    }

})();