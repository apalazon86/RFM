//Controlador de recetas
RFM.controller('RecipesController',['$scope', '$http', function($scope, $http){
  $scope.recipesList = [];
  $scope.productsList = [];
  $scope.allergies={};

  //Obtenemos el listado de productos
  $http
    .get('/products')
    .success(function(products){
      $scope.productsList = products;
    });

  //Obtenemos las alergias del usuario actual
  $http
    .get('/users/me')
    .success(function(user){
      $scope.allergies.cCelery = user.cCelery;
      $scope.allergies.cEgg = user.cEgg;
      $scope.allergies.cFish = user.cFish;
      $scope.allergies.cGluten = user.cGluten;
      $scope.allergies.cMilk = user.cMilk;
      $scope.allergies.cMustard = user.cMustard;
      $scope.allergies.cNut = user.cNut;
      $scope.allergies.cPeanuts = user.cPeanuts;
      $scope.allergies.cSesame = user.cSesame;
      $scope.allergies.cShellFish = user.cShellFish;
      $scope.allergies.cSoy = user.cSoy;
    });

  //Obtenemos el listado de recetas
  $http
    .get('/recipes')
    .success(function(recipes){
      //Si hay recetas
      if(recipes.length){
        //Se recorre cada receta, almacenando qué ingredientes se tienen y cuáles no
        recipes.forEach(function(recipe){
          //Se almacena el listado de productos
          var products=$scope.productsList;
          ////Array para almacenar los productos que se necesitan
          recipe.neededProds=[];
          ////Array para almacenar los productos que se tienen
          recipe.availableProds=[];
          //Se recorren los ingredientes de la receta
          recipe.ingredients.forEach(function(ingredient){
            //Se comprueba si se tiene el ingrediente actual
            var prod=products.filter(function(product){
              return ingredient.foodId === product.foodId;
            });
            //Se añade el producto al array correspondiente
            prod.length ? recipe.availableProds.push(ingredient.foodId) : recipe.neededProds.push(ingredient.foodId); 
          });
          //Se añade al objeto recipe el % de productos que se tienen
          recipe.availableProdsPercent=Number(((recipe.availableProds.length*100)/recipe.ingredients.length).toFixed(2));
          recipe.userIsAllergic=false;
          //Se recorren las alergias de la receta y se comprueba si el usuario es alergico a alguna de ellas
          for (allergy in recipe.allergiesObject){
            //Para cada alergia de la receta a la que sea alergico el usuario
            if(recipe.allergiesObject[allergy] && $scope.allergies[allergy]){
              recipe.userIsAllergic=true;
              break;
            }   
          }
        });
      }
      $scope.recipesList = recipes;
      console.log(recipes);
    });

  //Funcion para filtrar las recetas en base a los productos disponibles
  $scope.myProdsFilter = function(element) {
    if($scope.myProdsChecked) return element.availableProdsPercent>=50;
    else return element;
  };

  //Funcion para filtrar las recetas a las que el usuario es alergico
  $scope.myAllergiesFilter = function(element) {
    if($scope.myAllergiesChecked) return !element.userIsAllergic;
    else return element;
  };

}]);