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
                });
    }

})();