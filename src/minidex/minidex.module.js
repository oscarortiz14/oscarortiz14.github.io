(function ()
{
    'use strict';

    angular
            .module('app.minidex', [])
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.minidex', {
                    abstract: true
                })
                .state('app.minidex.complete', {
                    url: '/dex',
                    views: {
                        'content@': {
                            templateUrl: 'src/minidex/minidex.html',
                            controller: 'DexCtrl as dex'
                        }
                    }
                })
                .state('app.minidex.ability', {
                    url: '/dex/ability/:id',
                    views: {
                        'content@': {
                            template: '<h2>ola k ase</h2>'
                        }
                    }
                });
    }

})();