
//Importación de response y request
const {response, request} = require('express');

//Paquete para encriptar contraseñas 
const bcryptjs = require('bcryptjs');

//Importación de modelo usuario
const Usuario = require('../models/usuario');

//Almacenador de errores de las validaciones hechas en routes>usuarios.js
const { validationResult } = require('express-validator');



//Controlador para mostrar todos los usarios de la DB
const usuariosGet = async (req = request, res = response) => {

    //Limites de usuarios a mostrar determinados por el usuario o por sus valores por defecto
    const {limite = 5, desde = 0} = req.query;

    //Solo mostrar los usuarios activos
    const activos = { estado: true };

    //Promesa para contar el total y mostrar usuarios activos
    const [total, usuarios] = await Promise.all([

        //contar total de usuarios activos
        Usuario.countDocuments(activos),

        //buscar los usuarios activos teniendo en cuenta el desde y el limite de usuarios a mostrar
        Usuario.find(activos)
            //Desde que usuario se va a mostrar
            .skip(Number(desde))
            //Cuantos usuarios se van a mostrar
            .limit(Number(limite))
    ]);

    //Respuesta
    res.status(200).json({

        total,
        usuarios

    })
  }


//Creación de usuarios 
const usuariosPost =  async (req = request, res = response) => {


    //Parametros que recibo por el usuario en el body para la creación del usuario
    const {nombre, username, correo, password} = req.body;

    //Creación del nuevo usuario con la data
    const usuario = new Usuario({nombre,username, correo, password});


    //Numero de pasos para encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10);

    //Encriptación de contraseña
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar nuevo usuario en la DB
    await usuario.save();

    //Resultados
    res.status(201).json({

    msg: 'Usuario creado',
    usuario

    })
}

//Actualizar usuario
const usuariosPut =  async (req = request, res) => {

    //captura del id que quiere actualizar el usuario
    const {id} = req.params;

    //Separar los valores que no puede actualizar de los que si puede actualizar el usuario (...resto)
    const {_id, password, google, correo, username, estado, ...resto} = req.body;

    //actualización y encriptación de la nueva contraseña
    if(password){

        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    //Encontrar el usuario creado por id y actualizarlo con la nueva información
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    //Respuesta
    res.status(200).json({

    msg: 'Actualización satisfactoria',
    usuario

    })
}

//Eliminación de un usuario, es decir, solo cambio su estado porque su data me puede servir a futuro y no la 
//quiero eliminar del todo
const usuariosDelete = async(req = request, res = response) => {

    //Captura el id del usuario a eliminar que viene de los params 
    const { id } = req.params;

    //Actualizo la infomación del usuario cambiando su estado a falso
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false}, {new: true} );

    //Respuesta
    res.status(200).json({

    msg: 'El usuario que se elimino fue el siguiente',
    usuario

    });
}

//Exportar todos los controladores de mis peticiones
  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete
  }