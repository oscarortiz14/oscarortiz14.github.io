(function ()
{
    'use strict';
    angular
            .module('app')
            .config(config);

    /** @ngInject */
    function config($urlRouterProvider, $stateProvider, $mdThemingProvider)
    {
        $urlRouterProvider.otherwise('/');

        $stateProvider
                .state('app', {
                    abstract: true,
                    views: {
                        'toolbar': {
                            templateUrl: 'src/toolbar/toolbar.html',
                            controller: 'ToolbarCtrl'
                        },
                        'sidenav': {
                            templateUrl: 'src/sidenav/sidenav.html',
                            controller: 'SidenavCtrl'
                        }
                    }
                });

        var fusePalettes = [
            {
                name: 'fuse-blue',
                options: {
                    '50': '#ebf1fa',
                    '100': '#c2d4ef',
                    '200': '#9ab8e5',
                    '300': '#78a0dc',
                    '400': '#5688d3',
                    '500': '#3470ca',
                    '600': '#2e62b1',
                    '700': '#275498',
                    '800': '#21467e',
                    '900': '#1a3865',
                    'A100': '#c2d4ef',
                    'A200': '#9ab8e5',
                    'A400': '#5688d3',
                    'A700': '#275498',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200 A100',
                    'contrastStrongLightColors': '300 400'
                }
            },
            {
                name: 'fuse-pale-blue',
                options: {
                    '50': '#ececee',
                    '100': '#c5c6cb',
                    '200': '#9ea1a9',
                    '300': '#7d818c',
                    '400': '#5c616f',
                    '500': '#3c4252',
                    '600': '#353a48',
                    '700': '#2d323e',
                    '800': '#262933',
                    '900': '#1e2129',
                    'A100': '#c5c6cb',
                    'A200': '#9ea1a9',
                    'A400': '#5c616f',
                    'A700': '#2d323e',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200 A100',
                    'contrastStrongLightColors': '300 400'
                }
            }
        ];
        var fuseThemes = {
            'default': {
                primary: {
                    name: 'fuse-pale-blue',
                    hues: {'default': '700', 'hue-1': '500', 'hue-2': '600', 'hue-3': '400'}
                },
                accent: {
                    name: 'light-blue',
                    hues: {'default': '600', 'hue-1': '400', 'hue-2': '700', 'hue-3': 'A100'}
                },
                warn: {name: 'red'},
                background: {
                    name: 'grey',
                    hues: {'default': 'A100', 'hue-1': '100', 'hue-2': '50', 'hue-3': '300'}
                }
            },
            'Pink': {
                primary: {
                    name: 'blue-grey',
                    hues: {'default': '800', 'hue-1': '600', 'hue-2': '400', 'hue-3': 'A100'}
                },
                accent: {
                    name: 'pink',
                    hues: {'default': '400', 'hue-1': '300', 'hue-2': '600', 'hue-3': 'A100'}
                },
                warn: {name: 'blue'},
                background: {
                    name: 'grey',
                    hues: {'default': 'A100', 'hue-1': '100', 'hue-2': '50', 'hue-3': '300'}
                }
            },
            'LightGreen': {
                primary: {
                    name: 'fuse-blue',
                    hues: {'default': '900', 'hue-1': '600', 'hue-2': '500', 'hue-3': 'A100'}
                },
                accent: {
                    name: 'teal',
                    hues: {'default': '500', 'hue-1': '400', 'hue-2': '600', 'hue-3': 'A100'}
                },
                warn: {name: 'deep-orange'},
                background: {
                    name: 'grey',
                    hues: {'default': 'A100', 'hue-1': '100', 'hue-2': '50', 'hue-3': '300'}
                }
            },
            "Indigo": {
                primary: {
                    name: "indigo",
                    hues: {"default": "900", "hue-1": "700", "hue-2": "800", "hue-3": "600"}
                },
                accent: {
                    name: "light-blue",
                    hues: {"default": "600", "hue-1": "400", "hue-2": "700", "hue-3": "A100"}
                },
                warn: {
                    name: "red",
                    hues: {"default": "500", "hue-1": "300", "hue-2": "800", "hue-3": "A100"}
                },
                background: {
                    name: "grey",
                    hues: {"default": "A100", "hue-1": "100", "hue-2": "50", "hue-3": "300"}
                }
            },
            "Orange": {
                primary: {
                    name: "fuse-pale-blue",
                    hues: {"default": "700", "hue-1": "500", "hue-2": "600", "hue-3": "400"}
                },
                accent: {
                    name: "orange",
                    hues: {"default": "800", "hue-1": "400", "hue-2": "700", "hue-3": "A100"}
                },
                warn: {
                    name: 'red',
                    hues: {"default": "500", "hue-1": "300", "hue-2": "800", "hue-3": "A100"}
                },
                background: {
                    name: "grey",
                    hues: {"default": "A100", "hue-1": "A100", "hue-2": "100", "hue-3": "300"}
                }
            },
            'Blue': {
                primary: {
                    name: 'fuse-pale-blue',
                    hues: {'default': '700', 'hue-1': '500', 'hue-2': '600', 'hue-3': '400'}
                },
                accent: {
                    name: 'light-blue',
                    hues: {'default': '600', 'hue-1': '400', 'hue-2': '700', 'hue-3': 'A100'}
                },
                warn: {
                    name: 'red',
                    hues: {"default": "500", "hue-1": "300", "hue-2": "800", "hue-3": "A100"}
                },
                background: {
                    name: 'grey',
                    hues: {'default': 'A100', 'hue-1': '100', 'hue-2': '50', 'hue-3': '300'}
                }
            },
            "Green": {
                primary: {
                    name: "fuse-pale-blue",
                    hues: {"default": "700", "hue-1": "500", "hue-2": "600", "hue-3": "400"}
                },
                accent: {
                    name: "green",
                    hues: {"default": "800", "hue-1": "400", "hue-2": "700", "hue-3": "A100"}
                },
                warn: {
                    name: "cyan",
                    hues: {"default": "500", "hue-1": "300", "hue-2": "800", "hue-3": "A100"}
                },
                background: {
                    name: "grey",
                    hues: {"default": "A100", "hue-1": "A100", "hue-2": "100", "hue-3": "300"}
                }
            },
            "Red": {
                primary: {
                    name: "fuse-pale-blue",
                    hues: {"default": "700", "hue-1": "500", "hue-2": "600", "hue-3": "400"}
                },
                accent: {
                    name: "red",
                    hues: {"default": "600", "hue-1": "400", "hue-2": "700", "hue-3": "A100"}
                },
                warn: {
                    name: "cyan",
                    hues: {"default": "500", "hue-1": "300", "hue-2": "800", "hue-3": "A100"}
                },
                background: {
                    name: "grey",
                    hues: {"default": "A100", "hue-1": "A100", "hue-2": "100", "hue-3": "300"}
                }
            }
        };

        // Define custom palettes
        angular.forEach(fusePalettes, function (palette)
        {
            $mdThemingProvider.definePalette(palette.name, palette.options);
        });

        // Register custom themes
        angular.forEach(fuseThemes, function (theme, themeName)
        {
            $mdThemingProvider.theme(themeName)
                    .primaryPalette(theme.primary.name, theme.primary.hues)
                    .accentPalette(theme.accent.name, theme.accent.hues)
                    .warnPalette(theme.warn.name, theme.warn.hues)
                    .backgroundPalette(theme.background.name, theme.background.hues);
        });

        $mdThemingProvider.setDefaultTheme('Red');
    }

})();