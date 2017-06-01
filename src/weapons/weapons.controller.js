(function ()
{
    'use strict';

    angular
            .module('app.weapons')
            .controller('WeaponsCtrl', WeaponsCtrl);

    function WeaponsCtrl($scope, DBService, $mdDialog) {

        function getAll() {
            DBService.getAll("weapons").then(function (data) {
                $scope.weaponList = data;
            });
        }

        DBService.open("weapons").then(function () {
            getAll();
        });

        $scope.delete = function (obj) {
            var confirm = $mdDialog.confirm()
                    .title('¿Eliminar?')
                    .ok('Si')
                    .cancel('No')
                    .clickOutsideToClose(true);
            $mdDialog.show(confirm).then(function () {
                DBService.delete("weapons", obj.id).then(function (dataResponse) {
                    getAll();
                });
            }, function () {

            });
        };

        $scope.details = function (char, ev) {
            $mdDialog.show({
                controller: function ($scope) {
                    $scope.char = char;
                },
                templateUrl: 'src/weapons/templates/details.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        $scope.add = function (weapon) {
            $mdDialog.show({
                controller: AddCtrl,
                templateUrl: 'src/weapons/templates/edit.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    weapon: weapon
                }
            });
        };

        function AddCtrl(DBService, $scope, $mdDialog, weapon) {
            if (weapon)
                $scope.obj = angular.copy(weapon);

            $scope.add = function (obj) {
                DBService.add(obj, "weapons").then(function (data) {
                    getAll();
                    $mdDialog.hide();
                });
            };
        }

        $scope.getStars = function (stars) {
            return new Array(stars);
        };
    }

})();