/*Funcion de filtrado y recomendacion de recetas
  recipes: array de objetos de receta
  products: array de objetos producto, productos del usuario o vacío, según se quiera o no filtrar en base a productos disponibles
  recipeType: string con el tipo de receta
  allergies: objeto con los alérgenos que no deben incluir las recetas
*/
function getRecRecipes(recipes,products,recipeType,allergies){
  //Si no hay recetas se devuelve un array vacio
  if(!recipes || !recipes.length) return [];

  //En caso contrario
  //Si se ha filtrado por tipo de receta
  if(recipeType && recipeType !== "Todos"){
    recipes = recipes.filter(function(recipe){
      return recipe.type === recipeType;
    });
  }

  //Se filtran las recetas en base a las alergias
  //Se recorre el objeto de alergias
  for (allergy in allergies){
    //Para cada alergia positiva
    if(allergies[allergy]){
      //Se filtran las recetas, eliminando las que tengan la alergia actual
      recipes=recipes.filter(function(recipe){
          return recipe[allergy]===false;
      });
    }   
  }

  //Si se filtran las recetas en base a los productos disponibles
  if(products.length){
    //Se recorre cada receta, almacenando qué ingredientes se tienen y cuáles no
    recipes.forEach(function(recipe){

      ////Array para almacenar los productos que se necesitan
      var neededProds=[];

      //Se recorren los ingredientes de la receta
      recipe.ingredients.forEach(function(ingredient){
        //Se comprueba si se tiene el ingrediente actual
        var prod=products.filter(function(product){
          return ingredient.foodId === product.foodId;
        });
        //Si no se tiene el ingrediente se añade al array de productos que se necesitan
        if (!prod.length) neededProds.push(ingredient.name);
      });

      //Contador de productos disponibles
      var availableProducts = recipe.ingredients.length - neededProds.length;

      //Se añade al objeto recipe el % de productos que se tienen
      recipe.cProds=Number(((availableProducts*100)/recipe.ingredients.length).toFixed(2));

      //Se añaden al objeto recipe los productos que no se tienen
      recipe.nProds = neededProds.length ? neededProds.join(', ') : '';
    });

    //Se devuelven aquellas recetas para las que se tenga la mitad o más de ingredientes
    return recipes.filter(function(recipe){
      return recipe.cProds >= 50
    });
  }

  //Se devuelve el array de recetas
  return recipes;
};

//Funcion que recibe una receta y devuelve un array con sus alergias preparadas para ser mostradas
function getAllergies(recipe){
  //Alergias de la receta
  var recAll=[];
  //Traducción de alergias
  var allergies={
  "cGluten":"Gluten",
  "cMilk":"Leche",
  "cEgg":"Huevo",
  "cNuts":"Frutos secos",
  "cFish":"Pescado",
  "cShellFish":"Marisco"
  }

  //Se recorren todas las alergias
  for (allergy in allergies){
    //Para cada alergia positiva se añade al array de alergias
    recipe[allergy] ? recAll.push(allergies[allergy]) : recAll=recAll;
  }
return recAll;
}
