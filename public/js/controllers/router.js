angular.module('RFM', [
  'ngRoute',
  'ProductsController'
])
  .config(function($routeProvider){
      $routeProvider
      .when('/recipes', {
        template:
          `
            <h1>hola mundo</h1>
            
          `
      })
      .when('/products',{
        templateUrl: 'partials/products.html',
        controller: 'ProductsController'
      })
      .otherwise({
        redirectTo: '/'
      });
});
