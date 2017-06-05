(function ()
{
    'use strict';

    angular
            .module('app.home')
            .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, DBService, $mdDialog) {

        $scope.clearDatabase = function () {
            var confirm = $mdDialog.confirm()
                    .title('¿Eliminar base de datos?')
                    .ok('Si')
                    .cancel('No')
                    .clickOutsideToClose(true);
            $mdDialog.show(confirm).then(function () {
                DBService.deleteDatabase();
                location.reload(true);
            }, function () {

            });

        };
    }
})();