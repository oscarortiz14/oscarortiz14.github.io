(function ()
{
    'use strict';

    angular
            .module('app.items')
            .controller('ItemsCtrl', ItemsCtrl);

    function ItemsCtrl($scope, DBService, $mdDialog) {

        function getAll() {
            DBService.getAll("items").then(function (data) {
                $scope.itemList = data;
            });
        }

        DBService.open("items").then(function () {
            getAll();
        });

        $scope.delete = function (obj) {
            var confirm = $mdDialog.confirm()
                    .title('¿Eliminar?')
                    .ok('Si')
                    .cancel('No')
                    .clickOutsideToClose(true);
            $mdDialog.show(confirm).then(function () {
                DBService.delete("items", obj.id).then(function (dataResponse) {
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
                templateUrl: 'src/items/templates/details.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        $scope.add = function (item) {
            $mdDialog.show({
                controller: AddCtrl,
                templateUrl: 'src/items/templates/edit.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    item: item
                }
            });
        };

        function AddCtrl(DBService, $scope, $mdDialog, item) {
            if (item)
                $scope.obj = angular.copy(item);

            $scope.add = function (obj) {
                DBService.add(obj, "items").then(function (data) {
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