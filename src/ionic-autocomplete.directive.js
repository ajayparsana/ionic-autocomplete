//By Ajay Parsana - ajay.parsana@gmail.com
//https://github.com/ajayparsana

(function () {
    'use strict';

    angular.module('ionic-autocomplete')
        .directive('ionicAutocomplete', IonicAutoComplete);

    IonicAutoComplete.$inject = ['IonicAutoCompleteService', '$ionicPopover'];

    function IonicAutoComplete(IonicAutoCompleteService, $ionicPopover) {
        return {
            restrict: 'AE',

            scope: {
                inputObj: "=inputObj"
            },
            template: '<label class="item item-input bottom-border "><input id="searchAJ" type="text" class="" placeholder="Search" ng-change="search($event)" ng-model="searchData.search"><ion-spinner ng-show="loading"></ion-spinner></label>',
            link: function (scope, element, attrs) {

                scope.searchData = {};
                scope.prop = scope.inputObj.prop? scope.inputObj.prop :'name';
                scope.isAsync = scope.inputObj.isAsync ? true :false;
                scope.list = scope.inputObj.list? scope.inputObj.list:null;
                scope.loading = false;
               
                //This will search using value in text box
                var searchFoo = function () {
                    IonicAutoCompleteService.searchString(scope.searchData.search, scope.list).then(
                        function (matches) {
                            scope.searchData.items = matches;
                            if (scope.searchData.items.length > 0) {
                                scope.searchData.hideList = true;
                                var el = angular.element("#searchAJ");
                                if (scope.popover)
                                    scope.popover.remove();
                                var template = '<ion-popover-view style="margin-left:0px;top:' + (el.offset().top + el.height()) + 'px;left:' + el.offset().left + 'px;"><ion-content id="autocomplete"><li class="item list-border-energized " ng-repeat="item in searchData.items" ng-click="searchData.search = item[prop];closePopover();" style="padding:5px">{{item[prop]}}</li></ion-content></ion-popover-view>';

                                scope.popover = $ionicPopover.fromTemplate(template, {
                                    scope: scope
                                });

                                scope.popover.show();
                            }
                        }
                    )
                };
                scope.search = function () {
                    debugger;
                    scope.searchData.hideList = true;
                    if (!scope.isAsync) {
                        searchFoo()
                    } else {
                        if(scope.inputObj.asyncHttpCall)
                        scope.loading = true;
                        scope.inputObj.asyncHttpCall(scope.searchData.search);
                    }
                    }
                };

                scope.openPopover = function ($event) {
                    scope.popover.show($event);
                };
                scope.closePopover = function () {
                    scope.popover.hide();
                };
                //Cleanup the popover when we're done with it!
                scope.$on('$destroy', function () {
                    scope.popover.remove();
                });
                //  // Execute action on hide popover
                // scope.$on('popover.hidden', function() {
                //    // Execute action
                //  });
                //  // Execute action on remove popover
                // scope.$on('popover.removed', function() {
                //    // Execute action
                //  });
                //Called when the user clicks on the button to invoke the 'ionic-autocomplete'

                scope.$root.$on('SearchListUpdated', function () {
                    scope.list = scope.inputObj.list;
                    if (scope.isAsync) {
                         scope.loading = false;
                        searchFoo();
                        
                    }
                });
                //                element.focus(function () {
                //                    debugger;
                //                    //This code is added to set passed date from datepickerObject
                //                    scope.list = scope.inputObj.list;
                //                });
            }
        };
    }

})();