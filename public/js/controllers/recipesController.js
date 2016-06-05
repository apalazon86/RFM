//Controlador de recetas
RFM.controller('RecipesController',['$scope', '$http', function($scope, $http){
  $scope.recipesList = [];
  $scope.productsList = [];
  $scope.offersList = [];
  $scope.allergies={};

  //Obtenemos el listado de ofertas
  $http.get('/offers').success(function(data){
    $scope.offersList=data;
  });

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
        //Se recorre cada receta
        recipes.forEach(function(recipe){
          //Variable para almacenar el peso total de la receta y el de los productos disponibles
          var recipeWeight=0;
          var productsWeight=0;

          //Se almacena el listado de productos
          var products=$scope.productsList;

          //Se recorren los ingredientes de la receta
          recipe.ingredients.forEach(function(ingredient){
          //Se suma el peso del ingrediente actual al peso de la receta
          recipeWeight+=ingredient.weight;
            //Se comprueba si se tiene el ingrediente actual
            var prod=products.filter(function(product){
              return ingredient.foodId === product.foodId;
            });

            //Con el ingrediente actual se tiene para 0 personas
            ingredient.people=0;

            //Si se tiene el ingrediente se suma su peso
            if(prod.length){
              productsWeight+=ingredient.weight;
              //Si no viene indicada la cantidad de ingrediente necesaria
              if(ingredient.quantity===""){
                //Tenemos para infinitas personas
                ingredient.people=1000000000;
              }
              //En caso contrario
              else{
                //Se va a calcular la cantidad total del ingrediente que se tiene disponible
                var totalQuantity=0;
                prod.forEach(function (p){
                  totalQuantity+=p.quantity;
                });
                //Se calcula para cuantas personas tenemos el ingrediente
                ingredient.people=Math.floor(totalQuantity/(ingredient.quantity/recipe.people));
              }
              
            }
            else{
              ingredient.offers=$scope.offersList.filter(function(el){
                return el.foodId==ingredient.foodId;
              });
              //Si hay ofertas para el ingrediente actual
              if((ingredient.offers).length>0){
                //Nos quedamos con la primera oferta
                ingredient.offerUrl=ingredient.offers[0].url;
              }
              else{
                ingredient.offerUrl="";
              }
            }
          });
          recipe.userIsAllergic=false;
          //Se recorren las alergias de la receta y se comprueba si el usuario es alergico a alguna de ellas
          for (allergy in recipe.allergiesObject){
            //Para cada alergia de la receta a la que sea alergico el usuario
            if(recipe.allergiesObject[allergy] && $scope.allergies[allergy]){
              recipe.userIsAllergic=true;
              break;
            }   
          }
          //La receta se recomienda si el peso de los ingredientes disponibles es la mitad o mas del peso total
          recipe.recommended = productsWeight>=(recipeWeight/2) ? true : false;
          console.log(recipe.name+" "+recipeWeight+" "+productsWeight);
        });
      }
      $scope.recipesList = recipes;
    });

  //Funcion para filtrar las recetas en base a los productos disponibles
  $scope.myProdsFilter = function(element) {
    if($scope.myProdsChecked) return element.recommended;
    else return element;
  };

  //Funcion para filtrar las recetas a las que el usuario es alergico
  $scope.myAllergiesFilter = function(element) {
    if($scope.myAllergiesChecked) return !element.userIsAllergic;
    else return element;
  };
  
}]);