(function ()
{
    'use strict';

    angular
            .module('app.home')
            .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, DBService, $mdDialog, JsonService) {

        $scope.clearDatabase = function () {
            var confirm = $mdDialog.confirm()
                    .title('¿Eliminar base de datos?')
                    .ok('Si')
                    .cancel('No')
                    .clickOutsideToClose(true);
            $mdDialog.show(confirm).then(function () {
                DBService.deleteDatabase();
//                location.reload(true);
            }, function () {

            });
        };

        $scope.getInfo = function () {
            DBService.open().then(function () {
                $scope.dbInfo = DBService.getDbInfo();
            });
        };
        $scope.getInfo();

        $scope.LoadData = function (tableName) {
            switch (tableName) {
                case 'dex':
                {
                    DBService.clear('dex').then(function () {
                        JsonService.get('src/sections/minidex/data/complete_dex.json', function (data) {
                            var d = data.dex;
                            $scope.j1 = Object.keys(d).length;
                            $scope.j1tam = Object.keys(d).length;

                            $.each(d, function (key, val) {
                                if (val.num > 0) {
                                    val.id = key;
                                    val.abilities_ = $.map(val.abilities, function (value, index) {
                                        return value;
                                    });

                                    DBService.add(val, "dex").then(function () {
                                        --$scope.j1;
                                    });
                                } else {
                                    --$scope.j1;
                                }
                            });
                        });
                    });
                    break;
                }

                case 'dex_ability':
                {
                    DBService.clear('dex_ability').then(function () {
                        JsonService.get('src/sections/minidex/data/abilities.json', function (data) {
                            var d = data.obj;
                            $scope.j2 = Object.keys(d).length;
                            $scope.j2tam = Object.keys(d).length;

                            $.each(d, function (key, val) {
                                if (val.num > 0) {
                                    DBService.add(val, "dex_ability").then(function () {
                                        --$scope.j2;
                                    });
                                } else {
                                    --$scope.j2;
                                }
                            });
                        });
                    });
                    break;
                }

                default:
                    console.log('Nombre de tabla incorrecto');
            }
        };
    }
})();