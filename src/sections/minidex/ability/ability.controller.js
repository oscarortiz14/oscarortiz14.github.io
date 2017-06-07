(function ()
{
    'use strict';

    angular
            .module('app.minidex')
            .controller('AbilityListCtrl', AbilityListCtrl)
            .controller('AbilityDetailsCtrl', AbilityDetailsCtrl);

    function AbilityListCtrl($scope, DBService, $stateParams) {

        DBService.open().then(function () {
            DBService.getAllByIndex("dex_ability", 'byName', $stateParams.id).then(function (data) {
                $scope.abilityList = data;
            });
        });

    }

    function AbilityDetailsCtrl($scope, DBService, $stateParams, $state) {

        DBService.open().then(function () {
            DBService.getAllByIndex("dex_ability", 'byName', $stateParams.id).then(function (data) {
                $scope.data = data[0];

                DBService.getAllByIndex("dex", 'byAbility', $stateParams.id).then(function (data) {
                    $scope.listaPk = data;
                });
            }, function () {
                $state.go('app.minidex.ability.list');
            });
        });

    }
})();