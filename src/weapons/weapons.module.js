(function ()
{
    'use strict';

    angular
            .module('app.weapons', [])
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.weapons', {
                    url: '/weapons',
                    views: {
                        'content@': {
                            templateUrl: 'src/weapons/weapons.html',
                            controller: 'WeaponsCtrl as wc'
                        }
                    }
                });
    }

})();