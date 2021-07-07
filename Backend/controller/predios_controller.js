const { request, response } = require("express");

//Importación de mi modelo
const { Predio } = require("../models");


//Obtener todos los predios registrados de todos los usuarios - paginado - total - populate - público
const obtenerPredios = async ( req = request, res = response) => {

    //Establecer desde y hasta que predio quiero que se muestre
    //Establesco estos valores por default si el usuario no agrega query.params
    const {limite = 5, desde = 0} = req.query;

    //Solo mostrar predios que se encuentren activos
    const activos = {estado: true}

    //Definicion del total de predios y predios a mostrar
    const [total, predios] = await Promise.all([

        //Contar total de predios activos
        Predio.countDocuments(activos),

        //Buscar todos los predios que se encuentran activos
        Predio.find(activos)

            //Para mostrar información del propietarios
            .populate({
                path: 'propietario',
                select: 'username nombre correo'
            })

            //Desde que numero se va mostrar teniendo en cuenta los query.params
            .skip(Number(desde))

            //limite de predios a mostrar segun los query.params
            .limit(Number(limite))


    ]);

    //Respuesta de total de predios
    res.json({
        total,
        predios 
    })
}


//Obtener un predio en especifico - pupulate - público
const obtenerUnPredio = async (req = request, res = response) => {

    //Capturar del id del predio que se intenta buscar
    const {id} = req.params;

    //Buscar predio por el id que capturo
    const predio = await Predio.findById( id )

            //Para mostrar información del propietario
            .populate({
                path: 'propietario',
                select: 'username nombre correo'
            })

    //Respuesta de predio encontrado
    res.status(200).json({
        msg: 'Predio encontrado',
        predio
    })

}

//Controlador que me permite crear un nuevo predio - privado
const crearPredio = async (req = request, res = response) => {

    //Tomo la data que me interesa que agregue el usuario para crear el nuevo predio
    const {estado, propietario, ...resto} = req.body;

    //Buscar si existe un predio ya registrado
    const predioDB = await Predio.findOne({ matricula: resto.matricula });
 
    //Si existe arrojar un error que ya existe
    if ( predioDB ) {
        return res.status(400).json({
            msg: `El predio con la matrícula inmobiliaria ingresada ya existe. `
        })
    } 

    //Generar la data para crear el nuevo predio
    const data = {
        ...resto,
        propietario: req.usuario._id
    }

    //Crear mi nuevo predio
    let predio = new Predio(data)

    //Guardar mi nueva predio
    await predio.save()

    //Buscar predio que cree previamente
    predio = await Predio.findById( predio._id )

    //Para mostrar información del propietario
    .populate({
        path: 'propietario',
        select: 'username nombre correo'
    })



    //Respuesta de creacion de predio
    res.status(201).json({
        msg: 'Nuevo predio creado', 
        predio
    })
}

//Actualizar información del predio - privado
const actualizarPredio = async ( req = request, res = response )=>{
    
    //Captura id de los params
    const {id} = req.params;

    //Tomo la data que pueda actualizar el usuario para actualizar la informacion del predio
    const {estado, propietario, ...resto} = req.body;

    //Comprobación que no se repita una matricula inmobiliaria
    const predioDB = await Predio.findOne({matricula: resto.matricula});

    //Si existe arrojar un error que ya existe un predio con esa matricula inmobiliaria
    if ( predioDB ) {
        return res.status(400).json({
            msg: `El predio con la matrícula inmobiliaria ingresada ya existe.`
        })
    }

    //Validación si ya existe la direccion que se ingreso para actualizar el predio
    if(resto.direccion){
    
        const predio2 = await Predio.findOne({direccion: resto.direccion});
    
        //Si no existe arrojar un error que no existe
        if ( predio2 ) {
            return res.status(401).json({
                msg: `La direccion que intenta ingresar ya existe para algun predio`
            })
        }
    
    }

    //Data para actualizar la información
    const data = {
        ...resto
    }

    //Actualización de data del predio 
    const actualizacion = await Predio.findByIdAndUpdate(id, data, {new: true})

                  //Para mostrar información del propietario
                  .populate({
                    path: 'propietario',
                    select: 'username nombre correo'
                })
    

    res.status(200).json({
        msg: 'Actualización realizada con exito',
        actualizacion
    })

}


//Borrar predio - cambiar estado a false
const borrarPredio = async ( req = request, res = response ) => { 
    
    //Captura id de los params
    const {id} = req.params;

    //Verificar si el predio ya se elimino previamente
    const verificar = await Predio.findById(id);

    if(verificar.estado==false){
        return res.json({
            msg: 'Este predio ya fue eliminado'
        })
    }

    //Borrar predio y ver los cambios realizados en el resultado 
    const borrar = await Predio.findByIdAndUpdate ( id, {estado: false}, {new:true} )

                //Para mostrar información del propietario
                .populate({
                    path: 'propietario',
                    select: 'username nombre correo'
                })
    
    //respuesta
    res.status(202).json({
        msg: 'El predio que se elimino fue el siguiente',
        borrar
    })
}


//Exportación de mis controladores
module.exports = {
    crearPredio,
    obtenerPredios,
    obtenerUnPredio, 
    actualizarPredio,
    borrarPredio
}