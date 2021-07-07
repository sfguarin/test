
//Importar los metodos de mongoose que necesito para crear un modelo
const { Schema, model } = require('mongoose');

//Definición de mi schema
const PredioSchema = Schema({

    
    //Propietario
    //El propietario del predio tiene que ser de un usuario registrado
    propietario: { 
        
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
        
    },
    
    //Dirección
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },

    //Matricula inmobiliaria
    matricula: {
        type: String,
        required: [true, 'La matrícula inmobiliaria es obligatoria']
    },

    // Para saber si el predio esta activo o no dentro de la base de datos
    estado: {
        type: Boolean,
        default: true,
        required: true 
    }, 

    //ciudad
    ciudad: {
        type: String
    },

    //barrio
    barrio: {
        type: Number
    },

    //Descripcion del predio
    descripcion: {
        type: String
    }


});


//Para determinar que quiero mostrar en postman o en consola del navegador web
PredioSchema.methods.toJSON =  function() {
    
    //Aca separo el __v y el estado del resto (predio) y solo retorno lo que quiero que se vea del predio
    const {__v, estado,...predio} = this.toObject();

    return predio;
}

//Exportación
module.exports = model( 'Predio', PredioSchema );