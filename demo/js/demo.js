angular.module('starter').controller('DemoCtrl', function ($scope, $state, $http, $ionicLoading) {

            $scope.asyncSearch = function (str) {

                $http.get('https://restcountries.eu/rest/v1/name/' + str).then(function (response) {

                    $scope.autocompleteInputAsync.searchlist = response.data;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                }, function () {
                    $scope.autocompleteInputAsync.searchlist = undefined;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                });
            };

            $scope.setModel = function (item) {
                $scope.selectedItem = item;

            };

            $scope.setModelAsync = function (item) {
                $scope.selectedItemAsync = item;

            };


            $scope.autocompleteInput = {
                'propNameToDisplay': 'name',
                'placeholder': 'Search Country - Static',
                'ID':'StaicData',
                'listClass': ['list-border-energized'],
                'labelContainerClass': ['bottom-border']
            };

            $scope.autocompleteInput.itemSelectCallback = $scope.setModel;

            $scope.autocompleteInputAsync = {
                'propNameToDisplay': 'name',
                'isAsyncSearch': true,
                 'ID':'AsyncData',
                'placeholder': 'Search Country - Async ',
                'listClass': ['list-border-energized'],
                'labelContainerClass': ['bottom-border']
            };

            $scope.autocompleteInputAsync.itemSelectCallback = $scope.setModelAsync;
            $scope.autocompleteInputAsync.asyncHttpCall = $scope.asyncSearch;

            // to take an action after the data loads, use the $loaded() promise
            $ionicLoading.show({
                template: 'Getting Country List...'
            });


            $http.get('https://restcountries.eu/rest/v1/name/' + 'a').then(function (response) {

                $scope.autocompleteInput.searchlist = response.data;
                $scope.$root.$broadcast($scope.autocompleteInput.ID);
                $ionicLoading.hide();
            }, function () {
                $scope.autocompleteInput.searchlist = undefined;
               $scope.$root.$broadcast($scope.autocompleteInput.ID);
            });
        });