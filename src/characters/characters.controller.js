(function ()
{
    'use strict';

    angular
            .module('app.characters')
            .controller('CharCtrl', CharCtrl);

    function CharCtrl($scope, DBService, $mdDialog) {

        function getAll() {
            DBService.getAll("characters").then(function (data) {
                $scope.charList = data;
            });
        }

        DBService.open("characters").then(function () {
            getAll();
        });

        $scope.delete = function (obj) {
            var confirm = $mdDialog.confirm()
                    .title('¿Eliminar?')
                    .ok('Si')
                    .cancel('No')
                    .clickOutsideToClose(true);
            $mdDialog.show(confirm).then(function () {
                DBService.delete("characters", obj.id).then(function (dataResponse) {
                    getAll();
                });
            }, function () {

            });
        };

        $scope.details = function (char, ev) {
            $mdDialog.show({
                controller: function ($scope) {
                    $scope.char = char;

                    $scope.toggleFav = function () {
                        $scope.char.fav = !$scope.char.fav;
                        DBService.add($scope.char, "characters").then(function (data) {
                            getAll();
                        });
                    };
                },
                templateUrl: 'src/characters/templates/details.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        $scope.add = function (char) {
            $mdDialog.show({
                controller: AddCtrl,
                templateUrl: 'src/characters/templates/edit.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    char: char
                }
            });
        };

        function AddCtrl(DBService, $scope, $mdDialog, char) {
            if (char)
                $scope.obj = angular.copy(char);

            $scope.add = function (obj) {
                DBService.add(obj, "characters").then(function (data) {
                    getAll();
                    $mdDialog.hide();
                });
            };
        }
    }
})();