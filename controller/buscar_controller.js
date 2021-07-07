const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Predio } = require("../models");

//Crear arreglo con las colecciones permitidas
const coleccionesPermitidas = [
    'usuarios',
    'predios'
]

//Se crea funciones independientes para cada case que el usuario pueda elegir, se manda como argumento el
//termino que ingresa el usuario que lo inicializo vacio, y el argumento res para de una vez arrojar la
//respuesta desde aca. OJO no agregar req porque tambien se lo tendria que mandar cuando llame mi funcion
const buscarUsuarios = async (termino='', res = response ) => {

    //Para ver si el id ingresado pertenece a un id de mongo estas dos opciones son validas, se deja la segunda
    //ya que es la usada en el ejercicio
    // const esMongoID = isValidObjectId(termino)
    const esMongoID = ObjectId.isValid( termino );

    //Condicional para que arroje un resultado si es un mongoId
    if( esMongoID ){

        //Busqueda del usuario por el id ingresado por el usuario
        const usuario = await Usuario.findById(termino);

        //Respuesta 
        return res.json({
            //Ternario: basicamente dice (usuario) <- (si esto es verdad) ? (da como resultado esto ) [usuario] : <-(de lo contario esto) []
            results : (usuario) ? [usuario] : []
        })
    }

    //Si el usuario no agrego un mongoId y realizo la busqueda por el nombre o correo se ejecuta lo siguiente

    //Definir la expresion regular, la expresion regular significa que al buscar este termino en postman o en el 
    //navegador asi lo escriba en mayusculas o minusculas el lo va a reconocer.
    //RegExp es el metodo para convertirlo a expresion regular (variable que quiero pasar a expresion regular,
    //'i' la i es para que sea insensible a las mayusculas o minusculas, que se pueda leer por cualquiera)
    const regex = new RegExp (termino, 'i');

    //Buscar todos los usuarios que coincidan con el termino pasado a expesion regular. El find tambien se puede 
    //mandar como un objeto
    const usuarios = await Usuario.find({

        //$or: sirve para buscar por cualquiera de las dos condiciones ya sea que el nombre o  correo 
        //coincida con la regex. Desde que el nombre o correo tenga algo de la expresion regular (termino ingresado
        //por el usuario) no va agragar como resultado de busqueda
        $or: [{ nombre: regex }, {correo: regex }],
        //Aparte se pone el $and: para que solo muestre los usuarios que esten activos osea que cumpla cualquiera
        //de los terminos puestos en el $or y su estado debe ser true 
        $and: [{ estado: true }]
    })

    //Mostrar el resultado de los usuarios encontrados
    res.json({
        results: usuarios
    })


}

const buscarPredio = async ( termino = '', res = response ) => {

    //Mirar si el termino ingresado por el usuario es un mongoId
    const esMongoID = ObjectId.isValid( termino );

    //Condicional para que arroje un resultado si es un mongoId
    if( esMongoID ){

        //Busqueda del predio por el id ingresado por el usuario y muestra del nombre del usuario con populate()
        const predio = await Predio.findById(termino)
                                         .populate('usuario', 'nombre')

        //Respuesta 
        return res.json({
            //Si el predio no es nulo muestra el predio de lo contrario []
            results : (predio) ? [predio] : []
        })
    }

    //Definición de expresión regular segun el termino ingresado por el usuario, para que sea encontrada por 
    //cualquier coincidencia insensible
    const regex = new RegExp(termino, 'i' );

    //Busqueda de predio que coincida su nombre con la regex y su estado sea true
    const predios = await Predio.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })
    //populate() para mostrar el nombre del usuario de todas los predios
    .populate('usuario', 'nombre')

    //Mostrar el resultado de los predios encontrados
    res.json({
        results: predios
    })


}


//Controlador para la url api/buscar
const buscar = ( req = request, res = response ) => {

    //Extraccion de la coleccion y termino ingresado por el usuario
    const {coleccion, termino} = req.params;

    //Condicional para ver si la coleccion ingresada por el usuario se encuentra dentro de las colecciones permitidas
    //Si no se incluye se arroja un error
    if(!coleccionesPermitidas.includes( coleccion )){

        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    //Opciones que puede ingresar el usuario en la coleccion y dependiento del case se ejecutan acciones 
    //diferentes
    switch (coleccion) {

        //En caso que la coleccion ingresada por el usuario sea 'usuarios'
        case 'usuarios':

            //Ejecuto mi metodo de buscada para usuarios previamente creado que recibe el termino y la response
            buscarUsuarios(termino, res);

        break;

        //Caso si la coleccion es predios
        case 'predios':

            //Ejecución del metodo para buscar predios si el usuario manda en coleccion 'predios'
            // y el termino de busqueda
            buscarPredio(termino, res);

        break;


        //Por si sucede algun error 
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            })


    }

}

module.exports = {
    buscar
}

