(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .controller('DexCtrl', DexCtrl)
            .controller('DexDetailsCtrl', DexDetailsCtrl);

    function DexCtrl($scope, DBService, $mdDialog, JsonService, $rootScope) {

        DBService.open().then(function () {
            $scope.listaPk = [];
            $scope.page = 0;
            $scope.limit = 60;
            $scope.nPag = new Array();

            DBService.getAllByIndex("dex", 'byNum').then(function (data) {
                $scope.listaPk = data;

                $scope.page = 0;
                $scope.limit = 60;
                $scope.nPag = new Array(Math.ceil(data.length / $scope.limit));
            });
        });

        $scope.toggle = function (char, ev) {
            char.captured = !char.captured;

            DBService.add(char, "dex").then(function (data) {
                char = data;
            });
        };

        $scope.setPage = function (num) {
            $scope.page = num;
        };
    }

    function DexDetailsCtrl($scope, DBService, $mdDialog, $state, $stateParams) {

        DBService.open().then(function () {
            DBService.get("dex", $stateParams.id).then(function (data) {
                $scope.pk = data;
            }, function () {
                $state.go('app.minidex.main.list');
            });
        });
    }
})();