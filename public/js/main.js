//Creación del módulo
var RFM=angular.module('RFM', ['ngRoute'])

//Configuración de las rutas
.config(function($routeProvider){
  $routeProvider
  .when('/recipes', {
    templateUrl: 'partials/recipes.html',
    controller: 'RecipesController'
  })
  .when('/products',{
    templateUrl: 'partials/products.html',
    controller: 'ProductsController'
  })
  .when('/offers',{
    templateUrl: 'partials/offers.html',
    controller: 'OffersController'
  })
  .otherwise({
    redirectTo: '/products'
  });
});