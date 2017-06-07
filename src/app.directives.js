(function ()
{
    'use strict';
    angular
            .module('app')
            .directive('pkTemplate', PkTemplate)
            .directive('ngRightClick', ngRightClick);


    function PkTemplate(DBService) {
        var directive = {
            restrict: 'E',
            scope: {
                pk: '='
            },
            template: '<div class="layout-row layout-align-start-center flex" ng-class="{\'captured\':pk.captured}">' +
                    '       <md-button class="md-icon-button" ng-click="toggle(pk)" aria-label="pk">' +
                    '           <md-icon class="mdi mdi-pokeball"></md-icon>' +
                    '       </md-button>' +
                    '       <div layout="row" class="layout-row layout-align-start-center" ui-sref="app.minidex.main.details({id:\'{{pk.id}}\'})" flex>' +
                    '           <span class="number">{{pk.num}}</span>' +
                    '           <span class="name" flex>{{pk.species}}</span>' +
                    '           <span ng-repeat="type in pk.types" class="{{type}} type-badge">{{type}}</span>' +
                    '       </div>' +
                    ' </div>',
            link: function (scope, element, attrs) {
                scope.toggle = function (char) {
                    char.captured = !char.captured;

                    DBService.add(char, "dex").then(function (data) {
                        char = data;
                    });
                };
            }
        };
        return directive;
    }

    function ngRightClick($parse) { //Ejemplo: <div ng-right-click="i()">...
        return function (scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, {$event: event});
                });
            });
        };
    }
})();