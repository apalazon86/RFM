//Si el post se ha hecho desde Arduino
if (this.arduino){
    //Se convierte a ASCII la cadena posteada desde Arduino
    var arduinoRead=hex2a(this.arduino);
    //Se almacena el nombre eliminando los espacios del final
    this.name=arduinoRead.substring(0,48).replace(/\s*$/,'');
    //El foodId
    this.foodId=arduinoRead.substring(48,53);
    //El grupo
    this.group=this.foodId.substring(0,2);
    //Las kcals
    this.energy=parseInt(arduinoRead.substring(55,59),10);
    //La cantidad
    this.quantity=parseInt(arduinoRead.substring(59,64),10);
    //Grasa
    this.fat=parseInt(arduinoRead.substring(64,67),10);
    //Carbohidratos
    this.carbo=parseInt(arduinoRead.substring(67,70),10);
    //Proteinas
    this.protein=parseInt(arduinoRead.substring(70,73),10);
    //cGluten
    this.cGluten=str2bool(arduinoRead.substring(73,74));
    //cEgg
    this.cEgg=str2bool(arduinoRead.substring(74,75));
    //cMilk
    this.cMilk=str2bool(arduinoRead.substring(75,76));
    //cSoy
    this.cSoy=str2bool(arduinoRead.substring(76,77));
    //cPeanuts
    this.cPeanuts=str2bool(arduinoRead.substring(77,78));
    //cNut
    this.cNut=str2bool(arduinoRead.substring(78,79));    
    //cFish
    this.cFish=str2bool(arduinoRead.substring(79,80));
    //cShellFish
    this.cShellFish=str2bool(arduinoRead.substring(80,81));
    //cCelery
    this.cCelery=str2bool(arduinoRead.substring(81,82));
    //cSesame
    this.cSesame=str2bool(arduinoRead.substring(82,83));
    //cMustard
    this.cMustard=str2bool(arduinoRead.substring(83,84));
    //fresh
    this.fresh=str2bool(arduinoRead.substring(84,85));
    //fecha de caducidad/envasado
    this.dateOfExpiry=arduinoRead.substring(85,87)+"/"+arduinoRead.substring(87,89)+"/"+arduinoRead.substring(89,93);
    //Unidades
    this.unit=arduinoRead.substring(93,96).replace(/\s*$/,'');
}
else{
    
}



//Funciones

//Funcion para pasar una cadena de hexadecimal a ASCII
function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

//Funcion para convertir Y/N en true/false
function str2bool(str){
    return str==="Y" ? true : false;
}