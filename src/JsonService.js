(function ()
{
    'use strict';

    angular.module('app')
            .factory('JsonService', function ($resource) {
                return {
                    get: function (filePath, callback) {
                        $resource(filePath).get(callback);
                    }
                };
            });

})();