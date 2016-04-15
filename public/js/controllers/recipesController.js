//Controlador de recetas
RFM.controller('RecipesController',['$scope', '$http', function($scope, $http){
  $scope.filter = {};

  $scope.recipesList = [];
  $scope.products = [];

  //Obtenemos el listado de recetas
  $http
    .get('/recipes')
    .success(function(recipes){
      $scope.recipesList = recipes;
    });
  //Obtenemos el listado de productos
  $http
    .get('/products')
    .success(function(products){
      $scope.productsList = products;
    });
}]);