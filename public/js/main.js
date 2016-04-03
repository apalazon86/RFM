(function(){
//Creación del módulo
var RFM=angular.module('RFM', ['ngRoute']);

//Configuración de las rutas
RFM.config(function($routeProvider){
      $routeProvider
      .when('/recipes', {
        template:
          ' <h1>hola mundo</h1>'
      })
      .when('/products',{
        templateUrl: 'partials/products.html',
        controller: 'ProductsController'
      })
      .otherwise({
        redirectTo: '/products'
      });
});

RFM.controller('ProductsController',['$scope', '$http', function($scope, $http){
  $scope.productsList=[];
  //Obtenemos el listado de productos
  $http.get('/products').success(function(data){
    //Para cada producto inicializamos el campo dateAlert a true si caduca en 2 días o menos
    data.forEach(function(currentprod){
      currentprod.dateAlert=dateDiffInDays(currentprod.dateOfExpiry)<=2?true:false;
      currentprod.quantityText=formatQuantity(currentprod.quantity,currentprod.unit)
    });
    //console.log(data);
    $scope.productsList=data;
  });
  //Inicializamos el índice en la tabla de productos del producto seleccionado
  $scope.selIdx= -1;
  //Funcion para seleccionar un producto
  $scope.selProduct=function(product,idx){
    $scope.selectedProduct=product;
    $scope.selIdx=idx;
  }
  //Funcion para comprobar si un producto es el producto seleccionado
  $scope.isSelProduct=function(product){
    return $scope.selectedProduct===product;
  }
              
}]);

})();

    