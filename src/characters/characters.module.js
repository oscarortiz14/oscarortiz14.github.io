(function ()
{
    'use strict';

    angular
            .module('app.characters', [])
            .config(config);

    function config($stateProvider)
    {
        $stateProvider
                .state('app.characters', {
                    url: '/characters',
                    views: {
                        'content@': {
                            templateUrl: 'src/characters/characters.html',
                            controller: 'CharCtrl as char'
                        }
                    }
                });
    }
})();