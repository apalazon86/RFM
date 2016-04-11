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