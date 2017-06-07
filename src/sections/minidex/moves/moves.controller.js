(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .controller('movesListCtrl', movesListCtrl)
            .controller('movesListByTypeCtrl', movesListByTypeCtrl)
            .controller('movesDetailsCtrl', movesDetailsCtrl);

    function movesListCtrl($scope, DBService) {

        DBService.open().then(function () {
            DBService.getAll("dex_moves").then(function (data) {
                $scope.movesList = data;
            });
        });

    }

    function movesListByTypeCtrl($scope, DBService, $stateParams) {

        DBService.open().then(function () {
            DBService.getAllByIndex("dex_moves", "byType", $stateParams.type).then(function (data) {
                $scope.movesList = data;
            });
        });

    }

    function movesDetailsCtrl($scope, DBService, $stateParams, $state) {

        DBService.open().then(function () {
            DBService.get("dex_moves", $stateParams.id).then(function (data) {
                $scope.data = data;
            }, function () {
                $state.go('app.minidex.moves.list');
            });
        });

    }
})();