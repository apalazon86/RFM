//Si el usuario no está autentificado no se devuelven las recetas
cancelUnless(me, "You are not logged in", 401);

//Se formatea la cantidad de cada ingrediente de la receta
this.ingredients.forEach(function (ingredient){
    //Formateamos el nombre del ingrediente
    if(ingredient.quantity === "" && ingredient.unit === ""){
        ingredient.dispName = ingredient.name;
    }
    else{
        ingredient.dispName = ingredient.name + ": " + formatQuantity(ingredient.quantity,ingredient.unit);
    }
});

//Almacenamos las alergias y la información nutricional 
this.allergies=getAllergies(this);
this.nutrInfo=getNutriInfo(this);
this.showAller=this.allergies.length>0 ? true : false;

//Funciones

//Funcion que recibe una receta y devuelve un array con sus alergias preparadas para ser mostradas
function getAllergies(recipe){
  //Alergias de la receta
  var recAll=[];
  //Traducción de alergias
  var allergies={
  "cGluten":"Gluten",
  "cMilk":"Lácteos",
  "cEgg":"Huevo",
  "cNuts":"Frutos secos",
  "cFish":"Pescado",
  "cShellFish":"Marisco"
  };

  //Se recorren todas las alergias
  for (var allergy in allergies){
    //Para cada alergia positiva se añade al array de alergias
    recipe[allergy] ? recAll.push(allergies[allergy]) : '';
  }
  return recAll;
}

//Funcion que recibe una receta y devuelve un array con su información nutricional
function getNutriInfo(recipe){
  return [recipe.energy+" kcals","Proteinas: "+recipe.protein+" g","Hidratos: "+recipe.carbo+" g",
  "Grasas: "+recipe.fat+" g"];
}

function formatQuantity(quantity, unit){
  switch(unit){
    case "g":
      return (quantity < 1000) ?
        quantity+" "+unit : (quantity/1000).toFixed(2)+" kg";

    case "ml":
      return (quantity<1000) ?
        quantity+" "+unit : (quantity/1000).toFixed(2)+" l";

    default :
        return quantity+" "+unit;
  }
}