//Si el usuario no está autentificado no se devuelven las ofertas
cancelUnless(me, "You are not logged in", 401);

//Se añade una propiedad con el texto del precio
this.offerText=this.price+"€/"+this.unit;