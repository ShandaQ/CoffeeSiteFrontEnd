var app = angular.module('app', ['ngRoute']);

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

app.controller('OptionsController', function($scope, $http){
  var API = 'http://localhost:8000';
  $http.get(API+'/options')
    .success(function(options){
      $scope.options = options.grind;

      console.log(options);
    });
});
