(function ()
{
    'use strict';

    angular
            .module('app')
            .controller('ToolbarCtrl', ToolbarCtrl);

    function ToolbarCtrl($mdSidenav, $scope, $state) {
        $scope.$state = $state;

        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };
        $scope.isOpenLeft = function () {
            return $mdSidenav('left').isOpen();
        };

        $scope.navList = {
            "app.home": "Inicio",
            "app.characters": "Personajes",
            "app.weapons": "Armas",
            "app.items": "Objetos",
            "app.minidex": "Dex"
        };
    }
})();