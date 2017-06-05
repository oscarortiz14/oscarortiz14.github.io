(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .controller('AbilityListCtrl', AbilityListCtrl)
            .controller('AbilityDetailsCtrl', AbilityDetailsCtrl);

    function AbilityListCtrl($scope, DBService, JsonService, $stateParams) {
        DBService.open().then(function () {
            DBService.count("dex_ability").then(function (data) {
                console.log(data);

                if (data === 0) {
                    JsonService.get('src/sections/minidex/data/abilities.json', function (data) {
                        var d = data.obj;
                        var i = 0;
                        var j = Object.keys(d).length;
                        $scope.adding = true;
                        $.each(d, function (key, val) {
                            console.info('Transacción ' + (++i) + '/' + Object.keys(d).length);
                            if (val.num > 0) {
                                DBService.add(val, "dex_ability").then(function () {
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
        });

        function LoadData() {
            DBService.getAllByIndex("dex_ability", 'byName', $stateParams.id).then(function (data) {
                $scope.abilityList = data;
                console.log(data)

                $scope.adding = false;
            });
        }
    }

    function AbilityDetailsCtrl($scope, DBService, JsonService, $stateParams, $rootScope) {
        DBService.open().then(function () {
            DBService.count("dex_ability").then(function (data) {
                console.log(data);

                if (data === 0) {
                    JsonService.get('src/sections/minidex/data/abilities.json', function (data) {
                        var d = data.obj;
                        var i = 0;
                        var j = Object.keys(d).length;
                        $scope.adding = true;
                        $.each(d, function (key, val) {
                            console.info('Transacción ' + (++i) + '/' + Object.keys(d).length);
                            if (val.num > 0) {
                                DBService.add(val, "dex_ability").then(function () {
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
        });

        function LoadData() {
            DBService.getAllByIndex("dex_ability", 'byName', $stateParams.id).then(function (data) {
                $scope.data = data[0];

                $scope.adding = false;
            });

            DBService.getAllByIndex("dex", 'byAbility', $stateParams.id).then(function (data) {
                $scope.listaPk = data;
            });
        }
    }
})();