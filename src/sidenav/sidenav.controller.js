(function ()
{
    'use strict';

    angular
            .module('app')
            .controller('SidenavCtrl', SidenavCtrl);

    function SidenavCtrl($mdSidenav, $scope, $state, $rootScope) {
        $scope.$state = $state;

        $scope.navList = [
            {
                text: 'Inicio',
                icon: 'home',
                sref: 'app.home'
            },
            {
                text: 'Personajes',
                icon: 'account',
                sref: 'app.characters'
            },
            {
                text: 'Armas',
                icon: 'sword',
                sref: 'app.weapons'
            },
            {
                text: 'Objetos',
                icon: 'food-apple',
                sref: 'app.items'
            },
            {
                text: 'Dex',
                icon: 'pokeball',
                sref: 'app.minidex.main'
            }
        ];

        $rootScope.$on('$locationChangeStart', function ()
        {
            if ($mdSidenav('left').isOpen())
                $mdSidenav('left').close();
        });
    }
})();