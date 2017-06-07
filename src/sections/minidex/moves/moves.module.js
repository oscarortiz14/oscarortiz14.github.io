(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.minidex.moves', {
                    abstract: true
                })
                .state('app.minidex.moves.list', {
                    url: '/dex/moves',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/moves/moves.list.html',
                            controller: 'movesListCtrl as mvl'
                        }
                    }
                })
                .state('app.minidex.moves.typelist', {
                    url: '/dex/moves/type/:type',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/moves/moves.type.html',
                            controller: 'movesListByTypeCtrl as mvtl'
                        }
                    }
                })
                .state('app.minidex.moves.details', {
                    url: '/dex/moves/:id',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/moves/moves.details.html',
                            controller: 'movesDetailsCtrl as mvd'
                        }
                    }
                });
    }

})();