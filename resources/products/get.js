//Si el usuario no está autentificado no se devuelven los productos
cancelUnless(me, "You are not logged in", 401);

//Solo se devuelven los productos del usuario actual
if (me.fridge !== this.fridge){
    cancel();
}
//Propiedades añadidas
else{
    //Texto con la cantidad de producto
    this.quantityText=formatQuantity(this.quantity,this.unit);
    //Propiedad para saber si el producto va a caducar/esta caducado
    this.dateAlert=dateDiffInDays(this.dateOfExpiry)<=2?true:false;
    //Obtenemos la información nutricional
    this.nutrInfo=getNutriInfo(this);
    //Obtenemos los alérgenos
    this.allergies=getAllergies(this);
    //Calculamos si hay algún alérgeno
    this.showAller=this.allergies.length>0 ? true : false;
    
}

//Funciones

//Funcion para formatear la cantidad de producto
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

var _MS_PER_DAY = 1000 * 60 * 60 * 24;

//Funcion para calcular cuantos días quedan para llegar a la fecha a
function dateDiffInDays(espDate) {
  var date = new Date(convertToEngDate(espDate));
  var now = new Date();
  var utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  var utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}

//Funcion para convertir una fecha con el formato dd/mm/yyyy a mm/dd/yyy
function convertToEngDate(espDate){
  espDate = espDate || '';
	var day = espDate.substring(0, 2);
	var month = espDate.substring(3, 5);
	var year = espDate.substring(6, 10);
	return (month + "/" + day + "/" + year);
}

//Funcion que recibe una producto y devuelve un array con sus alergias preparadas para ser mostradas
function getAllergies(product){
  //Alergias del producto
  var prodAll=[];
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
    product[allergy] ? prodAll.push(allergies[allergy]) : '';
  }
  return prodAll;
}

//Funcion que recibe una producto y devuelve un array con su información nutricional
function getNutriInfo(product){
  return [product.energy+" kcals","Proteinas: "+product.protein+" g","Hidratos: "+product.carbo+" g",
  "Grasas: "+product.fat+" g"];
}