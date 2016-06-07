ionic-autocomplete
===================


ionic-autocomplete directive is based on ionic framework which can be used for type ahead. This directive can be used with static or dynamic data(using http on each key press).


### Version
1.0.0
### Prerequisites
ionic-autocomplete uses a number of open source projects to work properly:

* node.js
* npm
* bower
* gulp
* Ionic Framework

And of course ionic-autocomplete itself is open source  on [GitHub](https://github.com/ajayparsana/ionic-autocomplete).

### Installation

 1. Download `ionic-autocomplete.bundle.min.js` file from [GitHub](https://github.com/ajayparsana/ionic-autocomplete/archive/master.zip) 
 2. Copy `dist/ionic-autocomplete.bundle.min.js` into your JS lib folder and give path in `index.html`

````html
<!-- path to ionic/angularjs -->
<script src="lib/ionic-autocomplete/dist/ionic-autocomplete.bundle.min.js"></script>
````
3. In your application module inject the dependency `ionic-autocomplete`, in order to work with the ionic autocomplete box
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-autocomplete']){
//
}
````
4) Use the below format in your corresponding controller where you want to use autocomplete box

````javascript
    $scope.autocompleteInput = {
      
      'propNameToDisplay': 'name',
      'ID':'AutoComplete',
      'itemSelectCallback' : foo , 
      'searchlist' : {}, // list where search needs to be done.
      'isAsyncSearch': false, // optional - Default :False
      'asyncHttpCall' : httpFoo, // Required when isAsyncSearch is true 
      'textBoxClass':['size-16'], // optional custom classes for search text box
      'placeholder': 'Search Organzations', // optional placeholder to be displayed in box
      'listClass': ['border-energized'], //optional cutsom classes for matched items
      'labelContainerClass': ['bottom-border'] //optional
    };
    //Note: Don't forget to replace dummy values
````
**$scope.autocompleteInput** is the main object, that we need to pass to the directive. **If any of the required property is missing then user will be prompted with message and directive will not work**

The properties of this object are as follows:

**a1) propNameToDisplay**(required) : if data source item has {'name':abc} then if you pass 'name' then 'abc' will be displayed on list

**a1) ID**(required) : Unique ID to identify search box and register broadcast event on rootscope, This is very helpful to have more than one autocomplete box

**b) itemSelectCallback**(required) : function that need to be executed on item select. This can be used to set model as well
 ````javascript
 $scope.autocompleteInput.itemSelectCallback = function(item){
   //use item object in controller for model seeting and other business logic
 };
 ````

**C) searchlist**(required) : This list where search need to be performed to display matched result. If data is static and available then directly set this property. 
 1) If complete list is reterieved via API only once then on success of data reterieval set set data equal to this property and broadcast $scope.autocompleteInputAsync.ID event on rootscope
 ````javascript
 $scope.autocompleteInput.searchlist = reterieved list;
 $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
 ````
 2) If list is reterieved via API on each key press then set **isAsyncSearch** to **true**  and write function to make http call and pass refrence to **asyncHttpCall** & on success of data reterieval set data equal to this  property and broadcast $scope.autocompleteInputAsync.ID event on rootscope
 ````javascript
         $scope.asyncSearch = function () {
            //use get or post depending on your implementation
            $http.get().then(
                function (response) {
                    //Success
                    $scope.autocompleteInput.searchlist = reterieved list;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                },
                function (response) {
                    //Failure
                    $scope.autocompleteInput.searchlist = null;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                });
            or
            $http.post().then(
                function (response) {
                    //Success
                    $scope.autocompleteInput.searchlist = reterieved list;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                },
                function (response) {
                    //Failure
                    $scope.autocompleteInput.searchlist = null;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                });
        }

 ````
**d) isAsyncSearch**(optional) : Default :False, You can set this property to true if you want to use $http service for data on each key press. Please refer point **c) 2 ** above.
**e) asyncHttpCall**(optional) : This need to passed when you have set isAysncSearch to true. Please refer point **c) 2 ** above.
Template used to display text box is below
````html
<label class="item item-input" ng-class="autocompleteInput.labelContainerClass" style="margin-bottom: 1px;"><input id="searchAJ" type="text" ng-change="search($event)" ng-model="searchData.search" ng-class="autocompleteInput.textBoxClass"><ion-spinner ng-show="loading"></ion-spinner></label>
````
**e) textBoxClass**(optional) : Pass array of css class that need to be applied to search text box

**f) placeholder**(optional) : Placholder that need to be displayed in textbox, Default is 'Enter search text'

**g) listClass**(optional) : Pass array of css class that need to be applied to list getting displayed in popover view after matching result is displayed

**h) labelContainerClass**(optional) : Pass array of css class that need to be applied to label tag of template above

5) Then use the below format in your template / html file

````html
 <ionic-autocomplete autocomplete-input="autocompleteInput"></ionic-autocomplete>
````

**a) ionic-autocomplete** is the directive, to which we can pass required vales.

**b) autocomplete-input**(required) : This is an object that We have to pass as shown above **Point 4**.

##License: MIT

##Contact:
gmail : ajay.parsana@gmail.com

github : https://github.com/ajayparsana

twitter : https://twitter.com/ajayparsana

paypal : ajay.parsana@gmail.com

Comment or fork it
