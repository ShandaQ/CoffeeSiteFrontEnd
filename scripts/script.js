var app = angular.module('app', ['ngRoute','ngCookies']);

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
var credentials = {
  username: null,
  pswd: null
};

app.config(function($routeProvider){
    $routeProvider

    .when('/home', {
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
    .when('/thankyou', {
      controller: 'thankyouController',
      templateUrl: 'thankyou.html'
    })
    .when('/login',{
      controller: 'loginController',
      templateUrl: 'login.html'
    })
    .when('/register',{
      controller: 'registerController',
      templateUrl: 'register.html'
    })
    .when('/succesfullLogin',{
      controller: 'succesfullLoginController',
      templateUrl: 'succesfullLogin.html'
    });
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

app.controller('paymentController', function($scope, $http, $location){
// getting the infomraiton from the global var and displaying it on the page
   $scope.name = address.name;
   $scope.address = address.address;
   $scope.address2 = address.address2;
   $scope.city = address.city;
   $scope.state = address.state;
   $scope.zipCode = address.zipCode;
   $scope.deliveryDate = address.deliveryDate;
   $scope.grind = order.grind;
   $scope.quantity = order.quantity;
   $scope.total = order.total;

   $scope.showPayment = function(){
     $location.path('/thankyou');
   };
});

app.controller('thankyouController', function($scope, $http){

});

app.controller('loginController', function($scope, $http, $location, $cookies){
  $scope.login = function(){
    var credentials = {
      username: "",
      password:""
    };

    credentials.username = $scope.username;
    credentials.password = $scope.password;

    $http.post(API+"/login", credentials)
      .success(function(data){
        console.log(data);
        $cookies.put("token",data.token);
        $location.path('/home');
    })
    .catch(function(err){
      $scope.errorMessage = err.data.message;
      console.log(err.data.message);
    });
  };
});

app.controller('registerController', function($scope, $http, $location){

  $scope.register = function(){
    // want to pass the username to the db
    // want encrypt the pswd - pass it to the db

// setting global var from user input
    credentials.username = $scope.username;
    credentials.password = $scope.password;

    $http.post(API + '/signup',credentials)
      .success(function(){
        //account created message and prompt them to go the the login back
        // $location.path('/succesfullLogin');
        $location.path('/succesfullLogin');
      })
      .catch(function(err){
        console.log(err.message);
      });

  };
});

app.controller('succesfullLoginController', function($scope, $http, $location){

  $scope.goToLoginPage = function(){
    $location.path('/login');
  };
});
