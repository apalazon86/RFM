(function(){
//Creación del módulo
var RFM=angular.module('RFM', ['ngRoute']);

//Configuración de las rutas
RFM.config(function($routeProvider){
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

//Controlador de productos
RFM.controller('ProductsController',['$scope', '$http', function($scope, $http){
  $scope.productsList=[];
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

//Controlador de ofertas
RFM.controller('OffersController',['$scope', '$http', function($scope, $http){
  $scope.offersList=[];
  //Obtenemos el listado de ofertas
  $http.get('/offers').success(function(data){
    $scope.offersList=data;
  });        
}]);

//Controlador de recetas
RFM.controller('RecipesController',['$scope', '$http', function($scope, $http){
  $scope.recipesList=[];

  //Obtenemos el listado de recetas
  $http.get('/recipes').success(function(data){
    //Para cada receta
    data.forEach(function(rec){
      //Para cada ingrediente de la receta
      rec.ingredients.forEach(function (ingredient){
        //Formateamos el nombre del ingrediente
        if(ingredient.quantity==="" && ingredient.unit===""){
          ingredient.dispName=ingredient.name;
        }
        else{
          ingredient.dispName=ingredient.name+": "+formatQuantity(ingredient.quantity,ingredient.unit);
        }
      });
    });
    $scope.recipesList=data;
  });
}]);

RFM.controller('PanelController',function(){

  this.tab=1;

  this.selectTab=function(setTab){
    this.tab=setTab;
    console.log(setTab);
  };
  this.isSelected=function(checkTab){
    return this.tab===checkTab;
  };
});

})();