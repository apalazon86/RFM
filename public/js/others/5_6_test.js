(function (){
	//Funcion para mostrar por consola los productos y las recetas
	function prodRec2Text(prod,rec){
		var textoProd="";
		var textoRec="";
		if(prod.length){
			prod.forEach(function (p){
				textoProd+=p.name+", ";
			});
			textoProd=textoProd.substring(0,textoProd.lastIndexOf(","));
		}

		if(rec.length){
			rec.forEach(function (r){
				textoRec+=r.name+", ";
			});
			textoRec=textoRec.substring(0,textoRec.lastIndexOf(","));
		}
		return "Productos: "+textoProd+" <> Recetas: "+textoRec;
	}
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
	        //Se comPASO si se tiene el ingrediente actual
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
	  //Se devuelve el array de recetas
	  return recipes;
	  }
	  else{
	  	return [];
	  }
	};

	//Recetas
	var recetas=[
		{
		    "_id": "fa35252838adc8f7",
		    "name": "Ensalada de hortalizas",
		    "type": "Ensaladas y Verduras",
		    "instructions": "Pelar los tomates y pepinos, cortarlos en rodajas. Pelar las cebollas y cortarlas en aros. Añadir las aceitunas, mezclar todos los ingredientes y aliñar.",
		    "photo": "Ensalada de hortalizas",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 6,
		    "ingredients": [
		        {
		            "foodId": "11695",
		            "name": "Tomates",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "11205",
		            "name": "Pepinos",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebollas",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "9193",
		            "name": "Aceitunas",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02068",
		            "name": "Vinagre",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 180,
		    "fat": 7.5,
		    "carbo": 24,
		    "protein": 4
		},
		{
		    "_id": "4ba6fcbb757d58e2",
		    "name": "Parrillada de Verduras",
		    "type": "Ensaladas y Verduras",
		    "instructions": "En primer lugar lavamos todas las verduras con abundante agua. A continuación cortamos la berenjena en rodajas, y extendemos las piezas sobre una fuente amplia, sazonamos y dejamos reposar un poco para que suelte el agua y pierda el amargor. Cortamos el calabacín y la cebolla en rodajas y los pimientos en tiras y sazonamos. Ponemos todas las verduras sobre una parrilla previamente calentada y echamos una cucharadita de postre de aceite de oliva sobre todas las verduras. Una vez estén hechas, damos la vuelta y repetimos la misma operación. Cuando estén hechas las verduras, las retiramos del fuego y servimos.",
		    "photo": "Parrillada Verduras",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11477",
		            "name": "Calabacín",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "11209",
		            "name": "Berenjena",
		            "unit": "g",
		            "quantity": "540"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "180"
		        },
		        {
		            "foodId": "11334",
		            "name": "Pimiento rojo",
		            "unit": "g",
		            "quantity": "180"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "30"
		        }
		    ],
		    "energy": 135,
		    "fat": 6.7,
		    "carbo": 15,
		    "protein": 5.7
		},
		{
		    "_id": "4e2756f1adc26845",
		    "name": "Berenjenas rellenas con carne picada",
		    "type": "Ensaladas y Verduras",
		    "instructions": "Corta la berenjena en 2 trozos a lo largo, sazona y ponla en el horno a 200°, 30 minutos. Retira del horno y vacía el interior con una cuchara y reserva. Pica cebolla y pimiento verde en juliana. Rehogo en la sartén con aceite a fuego lento para que no se queme, añade sal. Cuando lleve unos minutos, añade la berenjena y acaba de cocinar.Cuando está hecho, añade la carne picada, pimienta negra y tomillo y un poco de sal.Remuévelo para que se vaya cocinando la carne.Dispón las mitades de berenjena en una bandeja y rellena con la carne. Puedes rallar tomate por encima y listo",
		    "photo": "Berenjenas Rellenas",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "07908",
		            "name": "Carne Picada",
		            "unit": "g",
		            "quantity": "240"
		        },
		        {
		            "foodId": "11209",
		            "name": "Berenjena",
		            "unit": "g",
		            "quantity": "540"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "30"
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 374,
		    "fat": 17.5,
		    "carbo": 17.7,
		    "protein": 31.5
		},
		{
		    "_id": "e0be144d85d7a97d",
		    "name": "Mejillones al vapor con vinagreta",
		    "type": "Mariscos",
		    "instructions": "Cocer los mejillones, mientras se preparar la vinagreta. Para la vinagreta picar los tomates, la cebolla, y el pimiento, añadir sal, vinagre, pimienta y aceite de oliva. Echar la vinagreta sobre los mejillones y servir.",
		    "photo": "Mejillones Vapor",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": true,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "15165",
		            "name": "Mejillones",
		            "unit": "g",
		            "quantity": "1000"
		        },
		        {
		            "foodId": "11695",
		            "name": "Tomates",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "80"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "160"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "45"
		        },
		        {
		            "foodId": "02068",
		            "name": "Vinagre",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 395,
		    "fat": 22,
		    "carbo": 15.6,
		    "protein": 34
		},
		{
		    "_id": "63309054a9a0b9f8",
		    "name": "Ensalada de pulpo con cilantro y menta",
		    "type": "Ensaladas y Verduras",
		    "instructions": "Introducir el pulpo en una olla grande, llevar a ebullición, añadir el ajo y el cilantro.Reducir el fuego y cocer, unos 30 minutos. Retirar el pulpo de la cazuela, se puede guardar el caldo. Cortarlo a trocitos.En un cuenco batir los ingredientes del aliño con un tenedor. Añadir el pulpo y remover para impregnarlo. Cortar el aguacate y el queso feta en dados, mezclarlo con el pulpo. Enfriar en la nevera hasta el momento de servir.Para la vinagreta, mezcla en un bol, la miel con dos cucharadas de vinagre, 100 ml de aceite, sal y las hojas de menta bien picadas.",
		    "photo": "Ensalada de pulpo",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": true,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "15166",
		            "name": "Pulpo",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "15166",
		            "name": "Queso feta",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "09037",
		            "name": "Aguacate",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11165",
		            "name": "Cilantro",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "g",
		            "quantity": "10"
		        },
		        {
		            "foodId": "19296",
		            "name": "Miel",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02068",
		            "name": "Vinagre",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "100"
		        },
		        {
		            "foodId": "02065",
		            "name": "Menta",
		            "unit": "hojas",
		            "quantity": "5"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 1183,
		    "fat": 96,
		    "carbo": 18,
		    "protein": 61.5
		},
		{
		    "_id": "1618c71deebd3870",
		    "name": "Salmón a la parrilla",
		    "type": "Pescados",
		    "instructions": "Limpiamos y secamos bien el salmón. Lo salpimentamos. Ponemos una sartén o plancha en el fuego y cuando éste esté caliente, ponemos los filetes de salmón durante 3-4 minutos por cada lado. Para la salsa, lavamos y cortamos los pimientos en trozos finos. Pelamos y fileteamos los pomelos recogiendo el zumo que sueltan. Ponemos una sartén con aceite, rehogamos el pimiento y añadimos el pomelo junto con el zumo se ha soltado. Condimentamos con sal, pimienta, una pizca de azúcar. Incorporamos el salmón para que hierva junto con la salsa. Esperamos a que reduzca el caldo y apagamos el fuego",
		    "photo": "Salmon parrilla",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "15076",
		            "name": "Salmón",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "09113",
		            "name": "Pomelos",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "140"
		        },
		        {
		            "foodId": "11334",
		            "name": "Pimiento rojo",
		            "unit": "g",
		            "quantity": "140"
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "15"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "19335",
		            "name": "Azúcar",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 513,
		    "fat": 29,
		    "carbo": 15.6,
		    "protein": 46.5
		},
		{
		    "_id": "696e5f91abf81a84",
		    "name": "Lentejas guisadas con verdura y arroz",
		    "type": "Legumbres",
		    "instructions": "La noche anterior habremos colocado las lentejas cubiertas de agua para que se ablanden. Lavamos las verduras (zanahoria, pimiento) y pelamos la cebolla y los dientes de ajo. Cortamos todo en trozos no muy pequeños por si una vez cocido queremos retirar las verduras. Cogemos una cazuela de tamaño mediano y echamos las verduras, a continuación las lentejas y cubrimos todo con agua. Lo salpimentamos y añadimos la cucharada de aceite. Ponemos todo a hervir a fuego lento y cuando falten 20 minutos para que termine la cocción, añadimos el arroz. Una vez esté cocido, paramos el fuego. Sacamos las verduras (pimiento, cebolla, zanahoria, dientes de ajo), lo pasamos por la batidora, y lo echamos de nuevo en la cazuela.",
		    "photo": "Lentejas con arroz",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "16069",
		            "name": "Lentejas",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "20044",
		            "name": "Arroz",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "11124",
		            "name": "Zanahoria",
		            "unit": "g",
		            "quantity": "50"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "15"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 296,
		    "fat": 6.5,
		    "carbo": 42,
		    "protein": 15
		},
		{
		    "_id": "4967f6036355882e",
		    "name": "Pasta con salteado de verduras, pollo y nueces",
		    "type": "Pastas y Pizzas",
		    "instructions": "Cocer los espaguetis en abundante agua hirviendo con una pizca de sal procurando que queden al dente. Enfriar con agua añadiendo un poco de aceite y reservar. Calentar aceite en una sartén y saltear el diente de ajo picado durante 1 minuto. Añadir rápidamente el pollo cortado en tiras. Saltear hasta que esté cocido, salar ligeramente, añadir las nueces, mezclar y a continuación retirar y reservar. Limpiar la sartén con un trapo o papel, añadir una cucharada de aceite y en cuánto esté caliente saltear las verduras previamente cortadas. Primero saltear la cebolla en tiras. Pasado 2 minutos, las judías cortadas, después de 3 minutos las zanahorias en tiras y a los 2 minutos más el calabacín también en tiras. Por último, incorporar las setas en láminas. Añadir el pollo con las nueces, aliñar y cubrir con este salteado los espaguetis que tenemos reservados calientes.",
		    "photo": "Pasta con verduras",
		    "cGluten": true,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "20126",
		            "name": "Espaguetis",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "07932",
		            "name": "Pechuga de pollo",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11477",
		            "name": "Calabacín",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "16022",
		            "name": "Judías verdes",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11260",
		            "name": "Setas",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "12087",
		            "name": "Nueces",
		            "unit": "30",
		            "quantity": "g"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": "1"
		        },
		        {
		            "foodId": "11124",
		            "name": "Zanahoria",
		            "unit": "g",
		            "quantity": "80"
		        }
		    ],
		    "energy": 430.8,
		    "fat": 12.17,
		    "carbo": 54.8,
		    "protein": 25.3
		},
		{
		    "_id": "ae84b92dc55168fd",
		    "name": "Revuelto de ajetes, setas y gambas",
		    "type": "Setas y Hongos",
		    "instructions": "Lavamos muy bien las setas para evitar que queden restos de hierbas o tierra, las cortamos y reservamos. Ponemos en una sartén a fuego medio el aceite de oliva y los ajos troceados. Cuando se estén dorando los ajos, añadimos las setas. Según se vayan poniendo tiernas, añadimos los ajos tiernos. Movemos todo un poquito y salpimentamos al gusto. A continuación incorporamos las gambas, previamente cortadas  por la mitad (según el tamaño). Sabremos que las gambas están hechas cuando dejen de ser transparentes y adquieran color blanco-rosado. Por último solo nos queda echar los huevos. Los rompemos directamente sin necesidad de batirlos. Bajamos el fuego y vamos moviendo la mezcla hasta que coagule el huevo. Queda más jugoso y no se cuaja el huevo completamente pero eso depende también del gusto de cada persona. Espolvoreamos un poco de perejil picado sobre el revuelto y servimos.",
		    "photo": "Revuelto setas",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": true,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11216",
		            "name": "Ajetes",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11260",
		            "name": "Setas",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "2"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "15"
		        },
		        {
		            "foodId": "11297",
		            "name": "Perejil",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 234,
		    "fat": 13.5,
		    "carbo": 4.5,
		    "protein": 24
		},
		{
		    "_id": "1685a818626758f9",
		    "name": "Paella con pollo",
		    "type": "Arroces",
		    "instructions": "Lo primero que tenemos que hacer es dorar un poco la carne, la cocinamos por un lado y por otro hasta que tomen un buen color. Después ponerlo a hervir con 8 vasos de agua. A continuación vamos a hacer un sofrito con las alcachofas, los ajos, los pimientos y los tomates. Una vez listo esto, le añadimos el arroz. Una vez sofrito el arroz junto con el resto de ingredientes, vamos a añadir todo a la paellera, junto con el pollo y el agua de su cocción. Añadimos también el jugo de limón, la pimienta, el azafrán, el tomillo, el romero y una pizca de sal. Cocinamos nuestra paella a fuego intenso durante diez minutos, pasado este tiempo le bajamos la intensidad a la mitad y dejamos 10 minutos más. Por último comprobamos que tanto el arroz como la carne de pollo están bien cocinados, entonces apartamos del fuego y lo dejamos reposar unos 5 minutos. ",
		    "photo": "Paella pollo",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20044",
		            "name": "Arroz",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "05091",
		            "name": "Pollo troceado",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "11334",
		            "name": "Pimientos rojos",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "11695",
		            "name": "Tomates",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "9150",
		            "name": "Limón",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02037",
		            "name": "Azafrán",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11297",
		            "name": "Perejil",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02037",
		            "name": "Romero",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02042",
		            "name": "Tomillo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 566,
		    "fat": 23.6,
		    "carbo": 58.5,
		    "protein": 46
		},
		{
		    "_id": "672fe366fa9568c6",
		    "name": "Risotto de espinacas",
		    "type": "Arroces",
		    "instructions": "Lava las espinacas, escúrrelas y córtalas. Pela y trocea la cebolla. Pela y lamina los dos dientes de ajo. Y pica también la guindilla. Usa una sartén con un poco de aceite de oliva, pon el ajo, echa las espinacas y rehogalas 5 minutos,resérvalas para usar después. Sofríe la cebolla con un puñado de sal, hasta que esté pochada, y echas entonces la guindilla. A continuación echa el arroz y déjalo que se vaya cociendo unos minutos, sin dejar de remover. Cuando pasen 3 o 4 minutos le añades el vino blanco y dejas que se consuma a fuego medio. A continuación hay que echar agua hasta que cubra el arroz y dejarlo a fuego medio-lento, para que vaya cociéndose poco a poco y absorbiendo los sabores. Añade sal y pimienta a tu gusto. Cuando el agua esté casi consumida del todo, agrega otra vez lo justo para cubrirlo, y repite este proceso hasta que el arroz esté tierno del todo. Una vez que el arroz esté en su punto, vamos echar las espinacas que reservamos antes y dejamos un par de minutos a que se rehogue todo bien. Al final vamos a rallar el queso sobre la sartén y removemos para que se mezcle bien.",
		    "photo": "Risotto espinacas",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20044",
		            "name": "Arroz",
		            "unit": "g",
		            "quantity": "350"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "11457",
		            "name": "Espinacas",
		            "unit": "g",
		            "quantity": "325"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "01032",
		            "name": "Parmesano",
		            "unit": "g",
		            "quantity": "80"
		        },
		        {
		            "foodId": "14106",
		            "name": "Vino blanco",
		            "unit": "ml",
		            "quantity": "150"
		        },
		        {
		            "foodId": "14106",
		            "name": "Guindilla",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 416,
		    "fat": 28.6,
		    "carbo": 58.5,
		    "protein": 26
		},
		{
		    "_id": "622cfa79c425a872",
		    "name": "Cordero al horno con miel",
		    "type": "Carnes",
		    "instructions": "Lavamos bien la carne, le hacemos unos cortes y salpimentamos bien por todos lados, para que vaya tomando sabor. Precalentamos nuestro horno a unos 220-225ºC, activado por encima y por debajo, para que mientras acabamos la preparación ya esté a la temperatura deseada. Pelamos las patatas y las cebollas que vayamos a emplear como guarnición, y las cortamos en rodajas. Las colocamos repartidas en una bandeja de horno, con un chorreón de aceite de oliva virgen y sal por encima, y sobre ellos colocamos la pierna de cordero. Después mezclamos el vino blanco, el zumo de limón, el agua, los ajos machacados y la miel, y con esta mezcla líquida vamos a regar la pata de cordero.",
		    "photo": "Asado cordero",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "17015",
		            "name": "Pierna de cordero",
		            "unit": "g",
		            "quantity": "600"
		        },
		        {
		            "foodId": "14106",
		            "name": "Vino blanco",
		            "unit": "ml",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11362",
		            "name": "Patatas",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "9150",
		            "name": "Limón",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "19296",
		            "name": "Miel",
		            "unit": "g",
		            "quantity": "20"
		        },
		        {
		            "foodId": "02037",
		            "name": "Romero",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 750,
		    "fat": 43.8,
		    "carbo": 12,
		    "protein": 65
		},
		{
		    "_id": "e55c7f26c2b9089a",
		    "name": "Filetes de cerdo empanado",
		    "type": "Carnes",
		    "instructions": "Ponemos los filetes en una bandeja y salpimentamos, pasamos por harina, retiramos el exceso, seguimos por huevo batido y empanamos con el pan rallado. Los freímos en abundante aceite y los retiramos dejando reposar en un plato sobre papel de cocina para que vayan soltando el aceite sobrante. Una vez han soltado el aceite podemos ir sirviendo en los platos.",
		    "photo": "Cerdo empanado",
		    "cGluten": true,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "10179",
		            "name": "Filetes de cinta de lomo",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "2"
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "183760",
		            "name": "Pan rallado",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 790,
		    "fat": 58,
		    "carbo": 26,
		    "protein": 38
		},
		{
		    "_id": "326d0c740f07f8d0",
		    "name": "Conejo a la cazadora",
		    "type": "Carnes",
		    "instructions": "Primero ponemos en un almirez los ajos, la pimienta y la sal y lo majamos. Añadimos a un bol junto con el conejo para adobarlo. Dejamos reposar tapado durante unas horas. En una sartén ponemos el aceite de oliva y freímos el conejo hasta que se dore y reservamos. Mientras en una cacerola, ponemos un par de cucharadas de aceite y vamos dorando los demás ingredientes a fuego medio. Añadimos en este orden pues, la cebolla picada, la zanahoria en trozos grandes, y los champiñones cortados a cuartos o laminados. Añadimos el tomate rallado. Y dejamos reducir unos minutos. Rectificamos el punto de sal, tapamos y dejamos a fuego medio unos 20 minutos, hasta que el conejo esté blandito.",
		    "photo": "Conejo cazadora",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "17181",
		            "name": "Conejo trozeado",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11124",
		            "name": "Zanahorias",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "11260",
		            "name": "Champiñones",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "14106",
		            "name": "Vino blanco",
		            "unit": "ml",
		            "quantity": "100"
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 584,
		    "fat": 30,
		    "carbo": 4,
		    "protein": 30
		},
		{
		    "_id": "f0e5ea7894993855",
		    "name": "Ensalada murciana",
		    "type": "Ensaladas y Verduras",
		    "instructions": "Cocer en agua los huevos hasta dejarlos en su punto, unos 10 minutos, para que la yema no se pase demasiado. Dejar enfriar. Cortar la cebolla en juliana y disponer en un plato hondo con agua fría y sal. Dejar reposar unos minutos y enjuagar bien. Así será más suave. Abrir el bote de conserva de tomate y escurrirlos con suavidad sobre un colador para que pierdan el agua de la conserva, sin aplastarlos. Disponerlos en una fuente o ensaladera y trocearlos com cuchillo o simplemente macharlos al gusto con un tenedor. Lo ideal es que queden algunos trozos enteros, pero con el tomate en gran parte deshecho. Pelar los huevos y cortarlos en rodajas. Abrir la conserva de atún, escurrirlo y desmigarlo ligeramente com un tenedor. Incorporar estos ingredientes más la cebolleta a la ensaladera, agregar las aceitunas y aliñar con aceite de oliva virgen extra y sal al gusto. Mezclar todo bien, probar y ajustar el aliño. Añadir algunas aceitunas más por encima.",
		    "photo": "Ensalada murciana",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "11693",
		            "name": "Tomates en conserva",
		            "unit": "g",
		            "quantity": "800"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "ml",
		            "quantity": "120"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "2"
		        },
		        {
		            "foodId": "15128",
		            "name": "Atún en conserva",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "9193",
		            "name": "Aceitunas negras",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 350,
		    "fat": 8,
		    "carbo": 40,
		    "protein": 35
		},
		{
		    "_id": "2367a89a54152990",
		    "name": "Ensalada griega",
		    "type": "Ensaladas y Verduras",
		    "instructions": "Se corta el tomate, el pepino, el pimiento y la cebolla, lo mezclamos todo bien en un bol, con un poco de sal y un chorro abundante de aceite de oliva. Después añadimos las olivas y rematamos con el queso feta cortado en dados.",
		    "photo": "Ensalada griega",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11695",
		            "name": "Tomates",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11205",
		            "name": "Pepino",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "9193",
		            "name": "Aceitunas negras",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "15166",
		            "name": "Queso feta",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 250,
		    "fat": 11,
		    "carbo": 10,
		    "protein": 30
		},
		{
		    "_id": "f47814b9bec6e833",
		    "name": "Flan de huevo",
		    "type": "Postres",
		    "instructions": "Batir los huevos junto con el azúcar hasta que estén espumosos. Cubrir el molde con caramelo. Incorporar la leche junto con el azúcar y los huevos y mezclar todo bien. Poner toda la mezcla en el molde. Cubrir una bandeja para horno con agua e incorporar dentro el molde con la mezcla. Meter al horno precalentado a 200º C, durante unos 40 minutos.",
		    "photo": "Flan",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "19335",
		            "name": "Azúcar",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "01109",
		            "name": "Leche",
		            "unit": "ml",
		            "quantity": "800"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "8"
		        }
		    ],
		    "energy": 244,
		    "fat": 7.4,
		    "carbo": 37.4,
		    "protein": 7
		},
		{
		    "_id": "3ae3c18f751af8bc",
		    "name": "Guisantes con jamón",
		    "type": "Legumbres",
		    "instructions": "Pon 1 l de agua en una cazuela pequeña, añade una pizca de sal y ponla a cocer. Cuando empiece a hervir, agrega los guisantes y deja cocer a fuego medio el tiempo que indique el envase (aproximadamente 6-8 minutos). Escúrrelos y reserva el caldo. Pela y pica la cebolla en daditos. Pela y pica el diente de ajo en láminas a lo largo, apílalas y córtalas en tiras, apílalas nuevamente y córtalas en daditos. Corta el jamón en dados. Pon el aceite en una cazuela, añade el ajo y la cebolleta (picados), rehoga durante un par de minutos, incorpora el jamón y fríelo un poco. Incorpora la harina, mezcla bien y añade los guisantes. Vierte 1/2 vaso del caldo resultante de cocer los guisantes y remueve. Cuando empiece a hervir cocina todo junto durante 3 minutos para que espese la salsa y sirve.",
		    "photo": "Guisantes jamon",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11304",
		            "name": "Guisantes",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "10150",
		            "name": "Jamón serrano",
		            "unit": "g",
		            "quantity": "50"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "20129",
		            "name": "Harina",
		            "unit": "g",
		            "quantity": "30"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "diente",
		            "quantity": "1"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "45"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 224,
		    "fat": 9,
		    "carbo": 18,
		    "protein": 15
		},
		{
		    "_id": "77441cbbf720cbe8",
		    "name": "Judías blancas con almejas",
		    "type": "Legumbres",
		    "instructions": "Pon las alubias a remojo de víspera. Pon el caldo de pescado  en la cazuela. Incorpora las alubias escurridas. Añade la zanahoria, el calabacín y el puerro, todo troceado. Sazona y cocínalas a fuego lento durante 1 hora aproximadamente. Pasa las verduras y un poco de caldo al vaso de la batidora y tritura. Añade a la cazuela y remueve. Pica finamente el ajo y dóralo en una tartera con aceite de oliva. Incorpora las almejas y perejil recién picado. Vierte un buen chorro de vino blanco. Cuando empiecen a abrirse, incorpora las alubias y dale un hervor de 5 minutos al conjunto. Espolvorea con perejil picado y sirve.",
		    "photo": "Judias almejas",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": true,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "11973",
		            "name": "Alubias blancas",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "15157",
		            "name": "Almejas",
		            "unit": "g",
		            "quantity": "750"
		        },
		        {
		            "foodId": "11124",
		            "name": "Zanahoria",
		            "unit": "g",
		            "quantity": "60"
		        },
		        {
		            "foodId": "11477",
		            "name": "Calabacín",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11246",
		            "name": "Puerro",
		            "unit": "",
		            "quantity": "1"
		        },
		        {
		            "foodId": "14106",
		            "name": "Vino blanco",
		            "unit": "ml",
		            "quantity": "150"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "06174",
		            "name": "Caldo de pescado",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11297",
		            "name": "Perejil",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 509,
		    "fat": 22,
		    "carbo": 39,
		    "protein": 27
		},
		{
		    "_id": "9ecee9f1ef00b885",
		    "name": "Potaje de garbanzos con bacalao",
		    "type": "Legumbres",
		    "instructions": "Poner el bacalao a remojo durante 12 a 24 h. Tambien pondremos los garbanzos a remojo o a hidratar la noche anterior. Pondremos la olla con agua a calentar y mientras vamos limpiando y lavando las verduras, las troceamos y vamos poniendo los garbanzos ya lavados y escurridos, incluimos las verduras y cerramos la olla unos 25-30 minutos.Cuando abrimos la olla añadiremos las patatas cortadas en trozos a nuestro gusto. En una sarten con un culín de aceite freimos las almendras y las ponemos en un mortero para machacarlas, vamos a dorar los tomates secos, añadiremos la ñora yo la suelo usar cruda pero picada, si la teneis entera la freis y luego la machacais en el mortero. Añadiremos un poco de pimentón dulce solo dorarlo que no se queme que amarga. y un poco de harina, añadiremos a la sarten un poco del caldo de la olla y se formara una mezcla espesa que añadiremos a la olla para que espese un poco el caldo y también las almendras machacadas. Cuando tengamos las patatas cocidas añadiremos los trozos de bacalao pero esto mejor en el último momento para servir el plato enseguida y se quede el bacalo jugoso.",
		    "photo": "Potaje bacalao",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "11147",
		            "name": "Acelgas",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "11124",
		            "name": "Zanahorias",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "11362",
		            "name": "Patatas",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "20129",
		            "name": "Harina",
		            "unit": "g",
		            "quantity": "30"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "45"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimentón dulce",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "12061",
		            "name": "Almendras",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 450,
		    "fat": 10,
		    "carbo": 60,
		    "protein": 35
		},
		{
		    "_id": "15d8b6879b683869",
		    "name": "Espaguetis a la carbonara",
		    "type": "Pastas y Pizzas",
		    "instructions": "Hervimos los espaguetis en abundante agua con sal durante 7 minutos. Escurrimos, enfriamos y reservamos. Incorporamos aceite de oliva o girasol para que no se peguen entre ellos y picamos los dientes de ajo. A continuación batimos con tenedor los cuatro huevos.En una sartén con aceite de oliva, salteamos el bacon hasta dorar, añadimos el ajo picado, incorporamos los huevos y los cocinamos hasta que cuajen. Con una espátula, vamos removiendo mientras introducimos la pasta. Mezclamos, añadimos pimienta (opcional) y queso rallado",
		    "photo": "Carbonara",
		    "cGluten": true,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20126",
		            "name": "Espaguetis",
		            "unit": "g",
		            "quantity": "750"
		        },
		        {
		            "foodId": "7921",
		            "name": "Bacon",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "4"
		        },
		        {
		            "foodId": "01032",
		            "name": "Parmesano",
		            "unit": "g",
		            "quantity": "80"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 448,
		    "fat": 15,
		    "carbo": 58,
		    "protein": 26
		},
		{
		    "_id": "c3ce20940b3fb88f",
		    "name": "Pasta marinera",
		    "type": "Pastas y Pizzas",
		    "instructions": "Hervimos la pasta, escurrimos y enfriamos. En una sartén con aceite de oliva salteamos el tomate. Con una cuchara vamos rompiendo los tomates, incorporamos sal.Aparte, hacemos un aceite de ajo -perejil. Pelamos los ajos, deshojamos el perejil, lo incorporamos en un vaso de túrmix y añadimos aceite de oliva a cubrir. Turbinamos hasta conseguir un aceite homogéneo. A continuación, limpiamos y cortamos el calamar, lo salteamos en aceite de oliva hasta que dore y le incorporamos sal. En otra sartén con un poco de aceite de oliva, el tomate y las almejas. Añadimos el aceite de ajo-perejil previamente preparado, la pasta y los calamares.",
		    "photo": "Pasta marinera",
		    "cGluten": true,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": true,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20126",
		            "name": "Espaguetis",
		            "unit": "g",
		            "quantity": "750"
		        },
		        {
		            "foodId": "15175",
		            "name": "Calamares",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "15157",
		            "name": "Almejas",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "11693",
		            "name": "Tomates en conserva",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11297",
		            "name": "Perejil",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 418,
		    "fat": 8,
		    "carbo": 55,
		    "protein": 28
		},
		{
		    "_id": "7dc24e28bc2908e1",
		    "name": "Pasta boloñesa y berenjena",
		    "type": "Pastas y Pizzas",
		    "instructions": "Empezamos hirviendo la pasta en una olla con abundante agua y sal, siguiendo las instrucciones del paquete, escurrimos y enfriamos. Podemos añadir un chorro de aceite para que la pasta no se pegue.A continuación, cortamos las berenjenas en finas láminas y las salteamos en una sartén con aceite de oliva hasta que estén hechas. Incorporamos sal y pimienta al gusto, y las reservamos.Calentamos la salsa en una olla e introducimos la pasta hervida, mezclándola bien. Añadimos la berenjena y servimos la pasta con queso rallado.",
		    "photo": "Pasta bolo",
		    "cGluten": true,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20124",
		            "name": "Macarrones",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "43384",
		            "name": "Salsa boloñesa",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11209",
		            "name": "Berenjenas",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "01032",
		            "name": "Parmesano",
		            "unit": "g",
		            "quantity": "80"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 556.5,
		    "fat": 26.56,
		    "carbo": 63.94,
		    "protein": 15.86
		},
		{
		    "_id": "6611ea9995570be0",
		    "name": "Atún con pisto",
		    "type": "Pescados",
		    "instructions": "Primero, cortamos en pequeños dados el pimiento, la cebolla, la berenjena y el calabacín. En una sartén con aceite de oliva salteamos las verduras una a una durante 5 minutos, o hasta que estén hechas, dejándolas al dente. Incorporamos sal. Una vez tenemos todas las verduras salteadas las volvemos a incorporar a la sartén. Esta vez todas juntas. Añadimos el ajo picado y salteamos un par de minutos. Incorporamos el sofrito de tomate y dejamos cocer unos 10 minutos o hasta que se evapore el agua que puedan soltar las verduras.Después, asamos el atún en una sartén con aceite de oliva, marcando todos los lados y dejando el centro crudo. Incorporamos el atún en el pisto y añadimos una rama de romero. Lo calentamos todo junto un par de minutos.",
		    "photo": "Atun pisto",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "15117",
		            "name": "Lomos de atún",
		            "unit": "g",
		            "quantity": "600"
		        },
		        {
		            "foodId": "11334",
		            "name": "Pimiento rojo",
		            "unit": "g",
		            "quantity": "50"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11209",
		            "name": "Berenjena",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11477",
		            "name": "Calabacín",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "02037",
		            "name": "Romero",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "06972",
		            "name": "Salsa de Tomate",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "ml",
		            "quantity": "15"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 500.28,
		    "fat": 18,
		    "carbo": 20,
		    "protein": 36.64
		},
		{
		    "_id": "f156011bcaae78d2",
		    "name": "Papillote de merluza",
		    "type": "Pescados",
		    "instructions": "Limpia el calabacín y los puerros, pela las zanahorias y pica todo en juliana fina. Reserva. Extiende 4 trozos grandes de papel de aluminio. Coloca en medio de cada lámina una mezcla de las verduras. Salpimienta y vierte un chorrito de aceite. Coloca encima, un lomo de pescado. Salpimienta. Vierte un chorrito de aceite y otro de vino blanco por encima y cierra cada papel herméticamente (para que al cocinarlos no se salga el vapor) de tal forma que queden unos paquetitos cuadrados bien doblados por las esquinas. Coloca los paquetitos en la placa de horno y hornea a 220º C (con el horno precalentado) durante 10 minutos.Pon cada paquetito sobre un plato y con unas tijeras hazles una cruz para abrirlos . Sirve en un plato y vierte el jugo",
		    "photo": "Papillote merluza",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "15130",
		            "name": "Merluza",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "11246",
		            "name": "Puerros",
		            "unit": "g",
		            "quantity": "80"
		        },
		        {
		            "foodId": "11124",
		            "name": "Zanahorias",
		            "unit": "g",
		            "quantity": "120"
		        },
		        {
		            "foodId": "11477",
		            "name": "Calabacín",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "14106",
		            "name": "Vino blanco",
		            "unit": "ml",
		            "quantity": "150"
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 180,
		    "fat": 5,
		    "carbo": 20,
		    "protein": 35
		},
		{
		    "_id": "bacb6bdf37134894",
		    "name": "Pescadilla empanada al pimentón con pimientos y ensalada",
		    "type": "Pescados",
		    "instructions": "Lava los pimientos, colócalos en la fuente de horno, riégalos con un chorrito de aceite y sazónalos. Hornéalos a 180º C durante 35-40 minutos aproximadamente. Deja que se templen, pélalos y córtalos en tiras. Pela y pica medio diente de ajo y añádelo. Aliña con sal y aceite. Mezcla y resérvalos. Lava la lechuga, pícala y sécala. En el momento de consumirla, pica la cebolleta en juliana fina, añádela y alíñala con sal, aceite y vinagre. Limpia la pescadilla, ábrela por la mitad, retírale las espinas y la piel y córtala en trozos. Sazona.Bate los huevos con una pizca de sal. Mezcla el pan rallado con el pimentón. Pasa los trozos de pescado por el huevo batido y por la mezcla de pan rallado y pimentón. Fríelos en una sartén con el resto de dientes de ajo enteros y sin pelar.",
		    "photo": "Pescadilla empanada",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "15033",
		            "name": "Pescadilla",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "11257",
		            "name": "Lechuga",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "11334",
		            "name": "Pimientos rojos",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "3"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "183760",
		            "name": "Pan rallado",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimentón dulce",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02068",
		            "name": "Vinagre",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 160,
		    "fat": 35,
		    "carbo": 40,
		    "protein": 45
		},
		{
		    "_id": "8e4d4bf6255fca00",
		    "name": "Leche frita",
		    "type": "Postres",
		    "instructions": "En un bol batimos los huevos y el azúcar, hasta que doblen el tamaño. Después añadimos la harina, y seguimos batiendo. Por último, añadimos la leche, y batimos hasta que todo esté bien integrado. Ponemos un cazo con la mezcla del bol a calentar, la pizca de sal y la corteza de limón, y dejamos cocer durante 30 minutos a fuego suave, dando vueltas, hasta que queda una masa espesa. Retiramos la corteza de limón, untamos una fuente con aceite y vertemos la mezcla. Dejamos enfriar. Calentamos una sartén con aceite de oliva. Preparamos los ingredientes para el rebozado, cortamos en cuadrados la masa, y vamos pasando cada uno por harina y huevo y los pasamos a la sartén, dándoles vueltas, para que se doren por los dos lados. Después los sacamos con una espumadera y los pasamos por un bol lleno de azúcar.",
		    "photo": "Leche frita",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20129",
		            "name": "Harina",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "19335",
		            "name": "Azúcar",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "01109",
		            "name": "Leche",
		            "unit": "ml",
		            "quantity": "1000"
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "4"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "9150",
		            "name": "Corteza de limón",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 452,
		    "fat": 3,
		    "carbo": 54,
		    "protein": 9
		},
		{
		    "_id": "b8538632db982832",
		    "name": "Tiramisú",
		    "type": "Postres",
		    "instructions": "Batimos la nata montada. Le añadimos el mascarpone. Luego la ralladura de naranja y mezclamos todo. Empapamos los dedos en el café y contamos hasta 3 y los ponemos en la bandeja. Ponemos una capa de mascarpone bien repartido y luego una de cacao en polvo y repetimos el proceso una vez más. En la última ya no hará falta y reservamos en la nevera hasta que lo tengamos que servir. Al servirlo espolvoreamos con un poco de chocolate en polvo por encima y listo.",
		    "photo": "Tiramisu",
		    "cGluten": true,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "19335",
		            "name": "Azúcar",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "01054",
		            "name": "Nata para montar",
		            "unit": "ml",
		            "quantity": "200"
		        },
		        {
		            "foodId": "01037",
		            "name": "Queso Mascarpone",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "9205",
		            "name": "Ralladura de naranja",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "14214",
		            "name": "Café",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "18133",
		            "name": "Bizcochos soletilla",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "19165",
		            "name": "Cacao en polvo",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 492,
		    "fat": 32,
		    "carbo": 43,
		    "protein": 8
		},
		{
		    "_id": "9d945ae37661084d",
		    "name": "Sopa de ajo",
		    "type": "Sopas y cremas",
		    "instructions": "Coger un buen trozo o barra de pan duro del día anterior y lo trocearemos en rodajas bien finas y pequeñas. Corta las lonchas de jamón en tiras bastante finas. Por último pela los dientes de ajo y los cortas en forma de finas láminas. Ahora calentamos el aceite de oliva en una sartén un poco profunda. Una vez caliente echamos los trocitos de ajo, cuando estén dorados los. Una vez dorado el pan añade una cucharadita de pimentón y aparta del fuego la sartén. Vierte el agua a la sartén, agrega el ajo que hemos dorado, las tiras de jamón y pon de nuevo a calentar. Un poco de sal y pimienta y deja unos veinte minutos a fuego medio. Pasado este tiempo, dale intensidad al fuego hasta que la sopa comience a hervir. Cuando esto ocurra cascamos los huevos y los echamos a la sopa para que se vayan cuajando. En unos cinco minutos aproximadamente estarán cuajados y tendrás tu sopa de ajo lista para tomar. ",
		    "photo": "Sopa de ajo",
		    "cGluten": true,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "18033",
		            "name": "Pan duro",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "4"
		        },
		        {
		            "foodId": "10150",
		            "name": "Jamón serrano",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "061172",
		            "name": "Caldo de pollo",
		            "unit": "ml",
		            "quantity": "1500"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimentón dulce",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 502,
		    "fat": 41,
		    "carbo": 18.6,
		    "protein": 13.3
		},
		{
		    "_id": "90b77800e11ff9db",
		    "name": "Puré de zanahoria",
		    "type": "Sopas y cremas",
		    "instructions": "Primero partimos las zanahorias y las patatas en dados. Ponemos en una olla las zanahorias y las patatas ya cortadas ,añadimos la pastilla de avecrem y agua hasta cubrir. Dejamos hervir unos cinco minutos .Cuando finalice lo pasamos por la batidora , añadimos la leche y listo!",
		    "photo": "Pure de zanahoria",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11124",
		            "name": "Zanahorias",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "11362",
		            "name": "Patatas",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "01109",
		            "name": "Leche",
		            "unit": "ml",
		            "quantity": "100"
		        }
		    ],
		    "energy": 157,
		    "fat": 8.9,
		    "carbo": 15,
		    "protein": 2.8
		},
		{
		    "_id": "6903999bde1c187e",
		    "name": "Puré de patatas",
		    "type": "Sopas y cremas",
		    "instructions": "En un cazo cocemos las patatas. Cuando están cocidas escurrimos las patatas. En un bol ponemos la patata salpimentamos al gusto y la mantequilla y batimos con la batidora hasta formar el puré. En una sartén sofreímos los ajos con un poco de aceite. Le quitamos el aceite a los ajos y ponemos los ajos al puré y lo mezclamos bien.",
		    "photo": "Pure de patatas",
		    "cGluten": false,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11362",
		            "name": "Patatas",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "01001",
		            "name": "Mantequilla",
		            "unit": "g",
		            "quantity": "50"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 149,
		    "fat": 7.1,
		    "carbo": 17.1,
		    "protein": 2.9
		},
		{
		    "_id": "a23a147e31e1983f",
		    "name": "Gazpacho",
		    "type": "Sopas y cremas",
		    "instructions": "Lo primero de todo es echar el pan remojado en un bol. Después echamos los tomates, previamente pelados; para eso tenemos que escaldarlos. Después cortamos el pepino en trozos pequeños, los dientes de ajo, y añadimos la sal, el vinagre y el aceite en este orden. Una vez triturado todo echamos agua al gusto y lo metemos al frigo porque tiene que estar muy frío. Incluso podemos echar algún cubito. Servimos adornado con trozos de pepino, pimiento verde y, si queremos, podemos ponerle tomate o los trozos de pan tostado.",
		    "photo": "Gazpacho",
		    "cGluten": true,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cShellFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 2,
		    "ingredients": [
		        {
		            "foodId": "11695",
		            "name": "Tomates",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11205",
		            "name": "Pepino",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "18033",
		            "name": "Pan duro",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02068",
		            "name": "Vinagre",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 162,
		    "fat": 9.2,
		    "carbo": 15.5,
		    "protein": 2.9
		},
		{
		    "_id": "7120a703b8e2082b",
		    "name": "Paella de marisco",
		    "type": "Arroces",
		    "instructions": "Cocer los mejillones, los pones en una cacerola tapada y los sacamos en cuanto se abran, les quitas la concha y reservas. Lava las almejas y reserva. Ahora a preparar el caldo. Rehoga los gambones en la paellera con un chorrito de aceite durante 5 minutos. Resérvalos en un plato y mantén el jugo en la paellera. Pela y pica los dientes de ajo, la cebolla y los pimientos los cortas en juliana y añades todo a la paellera. Echar el calamar partido y lo sofríes todo durante unos minutos. Corta el tomate en daditos y lo echas también. Cuando esté todo bien rehogado, incorpora el arroz y sofríelo unos minutos removiendo de vez en cuando. Ahora echa el caldo, las hebras de azafrán y la sal al gusto. Si lo deseas puedes poner un poco de colorante o de pimentón para que el arroz coja color. Coloca encima las almejas y cocina 5 minutos más a fuego suave. Cocina durante 2-3 minutos a fuego suave. Cuando veas que asoma el arroz es hora de echar los gambones y los guisantes. Remuévelo todo de vez en cuando para que no se pegue. Retira del fuego, incorpora los mejillones y tapa con un paño, deja reposar unos minutos para que el grano tenga la cocción ideal habiendo terminado de absorber el caldo.",
		    "photo": "Paella de marisco",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": true,
		    "cShellFish": true,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 4,
		    "ingredients": [
		        {
		            "foodId": "20044",
		            "name": "Arroz",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "15165",
		            "name": "Mejillones",
		            "unit": "g",
		            "quantity": "1000"
		        },
		        {
		            "foodId": "15175",
		            "name": "Calamar",
		            "unit": "",
		            "quantity": "1"
		        },
		        {
		            "foodId": "15149",
		            "name": "Gambones",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "15157",
		            "name": "Almejas",
		            "unit": "g",
		            "quantity": "250"
		        },
		        {
		            "foodId": "11695",
		            "name": "Tomates",
		            "unit": "g",
		            "quantity": "200"
		        },
		        {
		            "foodId": "11334",
		            "name": "Pimiento rojo",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11333",
		            "name": "Pimiento verde",
		            "unit": "g",
		            "quantity": "100"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "75"
		        },
		        {
		            "foodId": "11246",
		            "name": "Puerro",
		            "unit": "",
		            "quantity": "1"
		        },
		        {
		            "foodId": "11304",
		            "name": "Guisantes",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "11297",
		            "name": "Perejil",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02037",
		            "name": "Azafrán",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "11215",
		            "name": "Ajo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 866,
		    "fat": 28.7,
		    "carbo": 127,
		    "protein": 23.2
		},
		{
		    "_id": "8e7c8b3932e5fb9b",
		    "name": "Torrijas",
		    "type": "Postres",
		    "instructions": "Pon la leche en un cazo con el azúcar, un trozo de corteza de limon y una rama de canela partida por la mitad. Ponlo al fuego y cuando rompa a hervir apágalo. Corta el pan en rebanadas de unos 2cm de grosor y pon abundante aceite en una sarten para freir. Baña las rebanadas de pan en la leche, dales la vuelta para que se impregnen bien. Pásalas por el huevo batido y de ahí a la sartén, le vas dando la vuelta hasta que coja el mismo color que en la foto. Después sácalas y quita el exceso de aceite que pueda tener. Por ultimo, mezcla en un bol un poco de azucar y canela molida a partes iguales. Reboza las torrijas por la mezcla y ya las tendremos",
		    "photo": "Torrijas",
		    "cGluten": true,
		    "cMilk": true,
		    "cSoy": false,
		    "cEgg": true,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": false,
		    "people": 6,
		    "ingredients": [
		        {
		            "foodId": "01123",
		            "name": "Huevos",
		            "unit": "",
		            "quantity": "4"
		        },
		        {
		            "foodId": "9150",
		            "name": "Limón",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "19335",
		            "name": "Azúcar",
		            "unit": "g",
		            "quantity": "150"
		        },
		        {
		            "foodId": "01109",
		            "name": "Leche",
		            "unit": "ml",
		            "quantity": "1000"
		        },
		        {
		            "foodId": "18033",
		            "name": "Pan",
		            "unit": "g",
		            "quantity": "400"
		        },
		        {
		            "foodId": "02010",
		            "name": "Canela",
		            "unit": "rama",
		            "quantity": "1"
		        },
		        {
		            "foodId": "04053",
		            "name": "Aceite de Oliva",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 566,
		    "fat": 39.6,
		    "carbo": 38.9,
		    "protein": 12.4,
		    "cShellFish": false
		},
		{
		    "_id": "134b9c427ad27bb7",
		    "name": "Solomillo de la abuela Concha",
		    "type": "Carnes",
		    "instructions": "Se ponen en remojo los frutos secos con el vino. Se pochan las 2 cebollas. Con el horno precalentado a 200º, se pone el solomillo con lal mostaza y la manteca de cerdo. A los 15 minutos se incorpora la cebolla en los laterales, y los frutos secos con el vino. Se deja cocinar otros 15 minutos en el horno. Se sirve en rodajas con la cebolla y las pasas",
		    "photo": "Solomillo",
		    "cGluten": false,
		    "cMilk": false,
		    "cSoy": false,
		    "cEgg": false,
		    "cPeanuts": false,
		    "cNut": false,
		    "cFish": false,
		    "cCelery": false,
		    "cSesame": false,
		    "cMustard": true,
		    "people": 3,
		    "ingredients": [
		        {
		            "foodId": "10061",
		            "name": "Solomillo de cerdo",
		            "unit": "g",
		            "quantity": "500"
		        },
		        {
		            "foodId": "04002",
		            "name": "Manteca de cerdo",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02046",
		            "name": "Mostaza",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "02030",
		            "name": "Pimienta",
		            "unit": "",
		            "quantity": ""
		        },
		        {
		            "foodId": "14140",
		            "name": "Vino dulce",
		            "unit": "ml",
		            "quantity": "150"
		        },
		        {
		            "foodId": "09299",
		            "name": "Pasas",
		            "unit": "g",
		            "quantity": "50"
		        },
		        {
		            "foodId": "11282",
		            "name": "Cebolla",
		            "unit": "g",
		            "quantity": "300"
		        },
		        {
		            "foodId": "02047",
		            "name": "Sal",
		            "unit": "",
		            "quantity": ""
		        }
		    ],
		    "energy": 500,
		    "fat": 22.6,
		    "carbo": 21.9,
		    "protein": 32.4,
		    "cShellFish": false
		}
	];

	//Productos
	var productos=[];
	//Alergias
	var alergias={
	  "cGluten":false,
	  "cMilk":false,
	  "cSoy":false,
	  "cEgg":false,
	  "cPeanuts":false,
	  "cNut":false,
	  "cFish":false,
	  "cShellFish":false,
	  "cCelery":false,
	  "cSesame":false,
	  "cMustard":false
	};
	var i=0;
 	i++;
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Patatas","foodId":"11362"});
	productos.push({"name":"Leche","foodId":"01109"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Sal","foodId":"02047"});
	productos.push({"name":"Pimienta negra","foodId":"02030"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Huevos","foodId":"01123"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Aceite de Oliva","foodId":"04053"});
	productos.push({"name":"Cebolla","foodId":"11282"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Arroz","foodId":"20044"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Berenjenas","foodId":"11209"});
	productos.push({"name":"Tomate","foodId":"11695"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Muslos de pollo","foodId":"05091"});
	productos.push({"name":"Queso Feta","foodId":"010019"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Atún","foodId":"15117"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
 	i++;
	productos.push({"name":"Pulpo","foodId":"15166"});
	console.log("PASO "+i+" <<>> "+prodRec2Text(productos,getRecRecipes(recetas,productos,"Todos",alergias)));
})();