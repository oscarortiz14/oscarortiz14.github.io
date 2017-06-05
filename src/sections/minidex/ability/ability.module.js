(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.minidex.ability', {
                    abstract: true
                })
                .state('app.minidex.ability.list', {
                    url: '/dex/ability',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/ability/ability.list.html',
                            controller: 'AbilityListCtrl as abl'
                        }
                    }
                })
                .state('app.minidex.ability.details', {
                    url: '/dex/ability/:id',
                    views: {
                        'content@': {
                            templateUrl: 'src/sections/minidex/ability/ability.details.html',
                            controller: 'AbilityDetailsCtrl as abd'
                        }
                    }
                });
    }

})();