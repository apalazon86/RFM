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

//Creamos un objeto con las alergias para poder saber si un usuario es alergico a la receta
this.allergiesObject={};
this.allergiesObject.cCelery = this.cCelery;
this.allergiesObject.cEgg = this.cEgg;
this.allergiesObject.cFish = this.cFish;
this.allergiesObject.cGluten = this.cGluten;
this.allergiesObject.cMilk = this.cMilk;
this.allergiesObject.cMustard = this.cMustard;
this.allergiesObject.cNut = this.cNut;
this.allergiesObject.cPeanuts = this.cPeanuts;
this.allergiesObject.cSesame = this.cSesame;
this.allergiesObject.cShellFish = this.cShellFish;
this.allergiesObject.cSoy = this.cSoy;


//Funciones

//Funcion que recibe una receta y devuelve un array con sus alergias preparadas para ser mostradas
function getAllergies(recipe){
  //Alergias de la receta
  var recAll=[];
  //Traducción de alergias
  var allergies={
  "cGluten":"Gluten",
  "cMilk":"Lácteos",
  "cSoy":"Soja",
  "cEgg":"Huevo",
  "cPeanuts":"Cacahuetes",
  "cNut":"Frutos con cáscara",
  "cFish":"Pescado",
  "cShellFish":"Marisco",
  "cCelery":"Apio",
  "cSesame":"Sesamo",
  "cMustard":"Mostaza"
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