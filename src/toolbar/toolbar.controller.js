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
            "app.minidex.main.list": "Dex",
            "app.minidex.ability.list": "Dex",
            "app.minidex.moves.list": "Lista de movimientos"
        };
    }
})();