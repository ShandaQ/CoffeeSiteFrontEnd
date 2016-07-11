var app = angular.module('app', ['ngRoute']);

var API = 'http://localhost:8000';
var order = {
  quantity: 'quantity',
  grind: 'grind',
  total: null
};
var address = {
  name: 'name',
  address: 'address',
  address2: 'address2',
  city: 'city',
  state: 'state',
  zipCode: null,
  deliveryDate: null
};

app.config(function($routeProvider){
    $routeProvider

    .when('/', {
      controller: 'MainController',
      templateUrl: 'home.html'
    })

    .when('/options', {
      controller:  'OptionsController',
      templateUrl: 'options.html'
    })

    .when('/delivery', {
      controller:  'deliveryController',
      templateUrl: 'delivery.html'
    })

    .when('/payment', {
      controller:  'paymentController',
      templateUrl: 'payment.html'
    })
});


app.controller('MainController', function($scope){

});

app.controller('OptionsController', function($scope, $http, $location){
  $http.get(API+'/options')
    .success(function(options){
      $scope.options = options.grind;

      //console.log(options);
    });

    $scope.goToDelivery = function(grind, qty, total){
      // saves the vaule the user selected to the order ojbect
      order.grind = grind;
      order.quantity = qty;
      order.total = total;

      $location.path('/delivery');
    };
});

// on the delivery page when the user clicks the submit btn save the order and address information to the database
app.controller('deliveryController', function($scope, $http, $location){

  $scope.goToPayment = function(){
    address.name = $scope.name;
    address.address = $scope.address;
    address.address2 = $scope.address2;
    address.city = $scope.city;
    address.state = $scope.state;
    address.zipCode = $scope.zipCode;
    address.deliveryDate = $scope.deliveryDate;

    $location.path('/payment');
  };
});

app.controller('paymentController', function($scope, $http){

});
