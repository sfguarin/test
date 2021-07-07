
//Importar los metodos de mongoose que necesito para crear un modelo de usuario
const { Schema, model } = require('mongoose');

//Definición de mi schema (propiedades o caracteristicas que tiene que completar el usuario para registrarse)
const UsuarioSchema = Schema({

    //Nombre
    nombre: { 
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    //Username
    username: {
        type: String,
        required: [true, 'El username es obligatorio'],
        unique: true
    },

    //Correo
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    //Contraseña
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    //Si es un usuario activo
    estado: {
        type: Boolean,
        default: true
    }

});


//Esto se crea para restringir que se muestra en la respuesta JSON mostrada en postman (para que no se vea la contraseña
//y la version). 
UsuarioSchema.methods.toJSON =  function() {
    //Aca separo el __v y el password del resto que lo llame (usuario) y solo retorno el usuario
    const {__v, password, _id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

//Esta exportación es diferente, se exporta como tal el metodo model ('nombre del objeto que estoy creando',
//'esquema de propiedades de dicho objeto que definimos anteriormente')
module.exports = model( 'Usuario', UsuarioSchema );