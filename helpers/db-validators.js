
//importación del modelo rol que cree para hacer la validación del rol ingresado por el usuario
const { Predio } = require('../models');

//Importación del modelo Usuario que se creo para hacer la validación del email ingresado por el usuario
const Usuario = require('../models/usuario');


const emailExiste = async( correo='' ) => {

    //Verificar si el correo existe, esto es un boolean que busca si existe en la base de datos un correo repetido
    //por otro usuario que ya se registro {correo:correo} = {correo} significa lo mismo
    const existeEmail = await Usuario.findOne({ correo });
    //Se pone el if para que en caso de que ya exista el correo en la base de datos se retorne un error y se pare
    //la ejecución de la función arrojando el error  
    if (existeEmail) {
      throw new Error (`El correo ${correo} ya existe`)
    }
 
}

const userExiste = async( correo='' ) => {

  //Verifica si un usuario ya tiene existe con el correo ingresado
  const existeEmail = await Usuario.findOne({ correo });
  //Condicional si ya existe el correo 
  if (existeEmail) {
    throw new Error (`El correo ${correo} ya existe`)
  }

}

//validación personalizada de si el id que manda el usuario existe o no dentro de la base de datos
const idExiste = async( id ) => {

    //Verificar si el id existe para el modelo Usuarios, esto es un boolean que busca si existe en la base de datos el id ingresado
    const existeId = await Usuario.findById(id);
    //Se pone el if para que en caso de que no exista el id en la base de datos se retorne un error y se pare
    //la ejecución de la función arrojando el error  
    if (!existeId) {
      throw new Error (`El id ${id} no existe para ningun usuario`)
    }

}


//Para ver si existe un predio con ese id en la base de datos
const existePredio = async( id ) => {

  //Verificar si el id existe para el modelo Predio en la base de datos
  const existeId = await Predio.findById(id);
  //En caso que no exista ningun predio para el id ingresado
  if (!existeId) {
    throw new Error (`El id ${id} no existe para ningun predio`)
  }

}

//Para ver si existe un predio con una misma direccion
const existeDireccion = async( direccion ) => {

  //Verificar si ya existe un predio con esa direccion
  const existeId = await Predio.findOne({direccion});
  //Error si ya existe un predio con esa direccion
  if (existeId) {
    throw new Error (`La dirección ingresada ya existe para algún predio`)
  }

}



module.exports = {
    emailExiste,
    idExiste,
    existeDireccion,
    existePredio,
    userExiste
}