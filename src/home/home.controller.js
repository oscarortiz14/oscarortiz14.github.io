(function ()
{
    'use strict';

    angular
            .module('app.home')
            .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, DBService) {

        $scope.clearDatabase = function () {
            DBService.deleteDatabase();
            location.reload(true);
        };
    }
})();