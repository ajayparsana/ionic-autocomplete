//By Ajay Parsana - ajay.parsana@gmail.com
//https://github.com/ajayparsana


(function(){
  'use strict';

  angular.module('ionic-autocomplete')
    .service('IonicAutoCompleteService', ['$q', '$timeout',function ($q, $timeout) {

        var searchString = function (searchFilter, list) {  
            var deferred = $q.defer();
            var matches;
            if (searchFilter && list) {
                matches = list.filter(function (item) {
                    if (item.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
                });

            } else {
                matches = [];
            };

            $timeout(function () {

                deferred.resolve(matches);

            }, 100);

            return deferred.promise;

        };

        return {

            searchString: searchString

        }
    }]);
})();