var taters = angular.module('taters', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngAnimate', 'angularMoment', 'taters.controllers', 'taters.services',
    'taters.directives', 'taters.filters']);

taters.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {

        //this will remove caching so that IE works
        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        $routeProvider.when('/taterView', {
            templateUrl: "./templates/taterView.html",
            controller: 'TaterViewCtrl'
        }).when('/taters', {
            templateUrl: "./templates/tatersList.html",
            controller: 'TatersCtrl'
        }).otherwise({
            redirectTo: '/taters'
        });
    }]);

taters.config(['$mdThemingProvider',
    function ($mdThemingProvider) {
        var customPrimary = {
            '50': '#e3ddd9',
            '100': '#d8d1ca',
            '200': '#cdc4bc',
            '300': '#c2b7ad',
            '400': '#b7aa9f',
            '500': 'AC9D90',
            '600': '#a19081',
            '700': '#968373',
            '800': '#897766',
            '900': '#7a6a5c',
            'A100': '#edeae8',
            'A200': '#f8f7f6',
            'A400': '#ffffff',
            'A700': '#6c5d51'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#a6cbdd',
            '100': '#94c0d6',
            '200': '#81b5cf',
            '300': '#6fabc8',
            '400': '#5ca0c1',
            '500': '4A95BA',
            '600': '#4187aa',
            '700': '#3a7897',
            '800': '#336a85',
            '900': '#2c5b72',
            'A100': '#b9d6e4',
            'A200': '#cbe1eb',
            'A400': '#deebf2',
            'A700': '#254c60'
        };
        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        var customWarn = {
            '50': '#ee654c',
            '100': '#ec5135',
            '200': '#ea3d1e',
            '300': '#da3314',
            '400': '#c22d12',
            '500': 'AB2810',
            '600': '#94230e',
            '700': '#7c1d0c',
            '800': '#651809',
            '900': '#4e1207',
            'A100': '#f07964',
            'A200': '#f38d7b',
            'A400': '#f5a192',
            'A700': '#360d05'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        var customBackground = {
            '50': '#aaa09a',
            '100': '#9f938c',
            '200': '#93867f',
            '300': '#877971',
            '400': '#796c66',
            '500': '#6B605A',
            '600': '#5d544e',
            '700': '#4f4743',
            '800': '#413b37',
            '900': '#342e2b',
            'A100': '#b6ada8',
            'A200': '#c2bab6',
            'A400': '#cdc7c4',
            'A700': '#262220'
        };
        var whiter = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#fff',
            '600': '#f2f2f2',
            '700': '#e6e6e6',
            '800': '#d9d9d9',
            '900': '#cccccc',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#bfbfbf'
        };
        $mdThemingProvider
            .definePalette('whiter',
                whiter);


        $mdThemingProvider
            .definePalette('customBackground',
                customBackground);

        $mdThemingProvider.theme('white')
            .primaryPalette('whiter')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground');

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground');
    }]);