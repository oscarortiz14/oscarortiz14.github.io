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
                    url: '/dex/ability/:id',
                    views: {
                        'content@': {
                            templateUrl: 'src/minidex/ability/minidex.ability.html',
                            controller: 'AbilityCtrl as abi'
                        }
                    }
                });
    }

})();