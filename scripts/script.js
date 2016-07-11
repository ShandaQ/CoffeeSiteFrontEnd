var app = angular.module('app', ['ngRoute']);

var API = 'http://localhost:8000';
var order = {
  quantity: 'quantity',
  grind: 'grind'
};
var address = {
  name: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  deliveryDate: ''
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

      console.log(options);
    });

    $scope.order = order;
    $scope.total = 0;

// total not showing up dynamically
    $scope.order = function(order){
      $scope.total = order.quantity * '.50';
      console.log($scope.total);
      return $scope.total;
      //savedOrder.push(order);
    };

    $scope.goToDelivery = function(){
      $location.path('/delivery');
    };
});

// on the delivery page when the user clicks the submit btn save the order and address information to the database
app.controller('deliveryController', function($scope, $http, $location){
  $scope.address = address;
  //$scope.address.deliveryDate = new Date($scope.address.deliveryDate);

  $scope.submitOrder= function(address){
    console.log(order, address);
  };

  $scope.goToPayment = function(){
    $location.path('/payment');
  };
});

app.controller('paymentController', function($scope, $http){

});
