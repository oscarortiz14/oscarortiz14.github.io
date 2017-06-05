(function ()
{
    'use strict';

    angular
            .module('app', [
                'ngAnimate',
                'ngAria',
                'ngMessages',
                'ngResource',
                'ngMaterial',
                'ui.router',
                'ngRoute',
                
                'app.home',
                'app.minidex'
            ]);
})();