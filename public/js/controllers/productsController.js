//Controlador de productos
RFM.controller('ProductsController',['$scope', '$http', function($scope, $http){

  $scope.productsList = [];
  $scope.offersList = [];

  //Obtenemos el listado de ofertas
  $http.get('/offers').success(function(data){
    $scope.offersList=data;
  });

  //Obtenemos el listado de productos
  $http.get('/products').success(function(data){
    //Para cada producto
    data.forEach(function(currentprod){    
      //Obtenemos las ofertas del producto actual
      currentprod.offers=$scope.offersList.filter(function(el){
        return el.foodId==currentprod.foodId;
      });
      //Si hay ofertas para el producto actual
      if((currentprod.offers).length>0){
        //Nos quedamos con la primera oferta
        currentprod.offerUrl=currentprod.offers[0].url;
      }
      else{
        currentprod.offerUrl="";
      }
    })
    //Se almacena el numero de productos que hay en el frigorifico
    $scope.fridgeCount=data.filter(function(prod){return prod.antenna==="01"}).length;
    //Se almacena el numero de productos que hay en la despensa 1
    $scope.pantry1Count=data.filter(function(prod){return prod.antenna==="02"}).length;
    //Se almacena el numero de productos que hay en la despensa 2
    $scope.pantry2Count=data.filter(function(prod){return prod.antenna==="03"}).length;
    //Se almacena el listado de productos
    $scope.productsList=data;
  });
}]);
