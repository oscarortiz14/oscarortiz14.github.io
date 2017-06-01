(function ()
{
    'use strict';

    angular
            .module('app.items', [])
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.items', {
                    url: '/items',
                    views: {
                        'content@': {
                            templateUrl: 'src/items/items.html',
                            controller: 'ItemsCtrl as item'
                        }
                    }
                });
    }

})();