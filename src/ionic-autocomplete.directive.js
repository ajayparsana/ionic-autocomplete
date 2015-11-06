//By Ajay Parsana - ajay.parsana@gmail.com
//https://github.com/ajayparsana


(function () {
    'use strict';

    angular.module('ionic-autocomplete')
        .directive('ionicAutoComplete', IonicAutoComplete);

    IonicAutoComplete.$inject = ['IonicAutoCompleteService'];

    function IonicAutoComplete(IonicAutoCompleteService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                inputObj: "=inputObj"
            },
            link: function (scope, element, attrs) {

               
                //Called when the user clicks on the button to invoke the 'ionic-autocomplete'
                element.on("click", function () {
                    //This code is added to set passed date from datepickerObject
                 
                });
            }
        };
    }

})();