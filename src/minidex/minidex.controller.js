(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .controller('DexCtrl', DexCtrl);

    function DexCtrl($scope, DBService, $mdDialog, JsonService) {

        function getAll() {
            $scope.listaPk = [];
            $scope.page = 0;
            $scope.limit = 60;
            $scope.nPag = new Array();

            DBService.count("dex").then(function (data) {
                console.log(data);

                if (data === 0) {
                    JsonService.get('src/minidex/data/complete_dex.json', function (data) {
                        var d = data.dex;
                        var i = 0;
                        var j = Object.keys(d).length;
                        $scope.adding = true;
                        $.each(d, function (key, val) {
                            console.info('Transacción ' + (++i) + '/' + Object.keys(d).length);
                            if (val.num > 0) {
                                val.id = key;
                                DBService.add(val, "dex").then(function () {
                                    if (--j === 0)
                                        LoadData();
                                });
                            } else {
                                if (--j === 0)
                                    LoadData();
                            }
                        });
                    });
                } else {
                    LoadData();
                }
            });
        }

        function LoadData() {
            DBService.getAllByIndex("dex", 'byNum').then(function (data) {
                $scope.listaPk = data;

                $scope.page = 0;
                $scope.limit = 60;
                $scope.nPag = new Array(Math.ceil(data.length / $scope.limit));

                $scope.adding = false;
            });

            DBService.get("dex", "venusaurmega").then(function (data) {
                console.log(data)
            });
        }

        DBService.open().then(function () {
            getAll();
        });

        $scope.details = function (pk, ev) {
            $mdDialog.show({
                controller: function ($scope, $state) {
                    $scope.pk = pk;

                    $scope.go = function (id) {
                        $mdDialog.hide();
                        $state.go('app.minidex.ability', {id: id});
                    };
                },
                templateUrl: 'src/minidex/templates/details.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        $scope.clear = function () {
            var confirm = $mdDialog.confirm()
                    .title('¿Limpiar tabla?')
                    .ok('Si')
                    .cancel('No')
                    .clickOutsideToClose(true);
            $mdDialog.show(confirm).then(function () {
                DBService.clear("dex").then(function (dataResponse) {
                    getAll();
                });
            }, function () {

            });
        };

        $scope.toggle = function (char, ev) {
            char.captured = !char.captured;

            DBService.add(char, "dex").then(function (data) {
                char = data;
            });
        };

        $scope.setPage = function (num) {
            $scope.page = num;
        };

        $scope.typeList = ["Grass", "Flying", "Ghost", "Fire", "Dark", "Water", "Fairy", "Normal", "Bug", "Poison", "Electric", "Psychic", "Rock", "Steel", "Fighting", "Ice", "Ground", "Dragon"];
    }
})();