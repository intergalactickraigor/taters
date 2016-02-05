angular.module('taters.controllers', [])
    .controller('TatersCtrl',
        ['$rootScope', '$scope', '$routeParams','$location', 'api', 'chosenPotato',
            function ($rootScope, $scope, $routeParams, $location, api, chosenPotato) {
                $scope.potatolist = [];
                $scope.loading = false;
                $scope.searching = false;
                $scope.searchText = "";

                $scope.follow = function($event, url) {
                    $event.stopPropagation();
                    window.location(url);
                };

                $scope.setChosenPotato = function(potato){
                  chosenPotato.set(potato);
                  $location.path('/taterView');
                };

                $scope.go = function(url){
                  $location.path(url);
                };

                var loadSuccess = function(result){
                    $scope.potatolist = result.data;
                    $scope.loading = false;
                };

                var loadFailed = function(result){
                    $scope.loading = false;
                };

                var getFlickrFeed = function() {
                    $scope.loading = true;
                    api.get().then(loadSuccess).then(loadFailed);
                }();

            }])
    .controller('TaterViewCtrl',
        ['$rootScope', '$scope', '$routeParams','$location', 'chosenPotato',
            function ($rootScope, $scope, $routeParams, $location, chosenPotato) {
                $scope.potato = '';
                $scope.tags = [];

                $scope.go = function(url){
                    $location.path(url);
                };

                var getChosenPotato = function() {
                    $scope.potato = chosenPotato.get();
                    if (!$scope.potato){
                        $location.path('/taters');
                    }
                    $scope.tags = $scope.potato.tags.match(/\S+/g);
                }();

            }]);