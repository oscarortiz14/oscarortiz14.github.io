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
                    url: '/dex',
                    views: {
                        'content@': {
                            templateUrl: 'src/minidex/main/minidex.main.html',
                            controller: 'DexCtrl as dex'
                        }
                    }
                });
    }

})();