//Controlador de productos
RFM.controller('ProductsController',['$scope', '$http', function($scope, $http){

  $scope.productsList = [];
  $scope.offersList = [];

  //Obtenemos el listado de ofertas
  dpd.offers.get(function(results, error) {
    $scope.offersList=results;
  });

  //Obtenemos el listado de productos
  $http.get('/products').success(function(data){

    //Para cada producto
    data.forEach(function(currentprod){
      //Inicializamos el campo dateAlert a true si caduca en 2 días o menos
      currentprod.dateAlert=dateDiffInDays(currentprod.dateOfExpiry)<=2?true:false;
      //Formateamos el texto de la cantidad de producto
      currentprod.quantityText=formatQuantity(currentprod.quantity,currentprod.unit);
      //Obtenemos la información nutricional
      currentprod.nutrInfo=getNutriInfo(currentprod);
      //Obtenemos los alérgenos
      currentprod.allergies=getAllergies(currentprod);
      //Calculamos si hay algún alérgeno
      currentprod.showAller=currentprod.allergies.length>0 ? true : false;
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

