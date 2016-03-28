var _MS_PER_DAY = 1000 * 60 * 60 * 24;
//Funcion para calcular cuantos días quedan para llegar a la fecha a
function dateDiffInDays(a) {
  a=new Date(convertToEngDate(a));
  b=new Date();
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}

//Funcion para convertir una fecha con el formato dd/mm/yyyy a mm/dd/yyy
function convertToEngDate(espDate){
	var day=espDate.substring(0,2);
	var month=espDate.substring(3,5);
	var year=espDate.substring(6,10);
	return(month+"/"+day+"/"+year);
}