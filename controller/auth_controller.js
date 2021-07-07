
//Importación de request y response
const {response, request} = require('express');

//Importación de paquete para manejar contraseñas
const bcryptjs = require('bcryptjs');

//Impotación del modelo usuario para realizar busquedas de todos los usuarios registrados aca
const Usuario = require('../models/usuario');

//Metodo para generar un JWT 
const { generarJWT } = require('../helpers/generar-jwt');


//Controlador para login de usuario
const login =  async (req = request, res = response) => {

    //Capturo las variables que manda el usuario para hacer la autenticación
    const {correo, password} = req.body;

    //try y catch por si algo sale mal 
    try {

        //Verificar si el usuario existe con el email suministrado
        const usuario = await Usuario.findOne({correo});

        // Si el usuario no existe haga lo siguiente
        if (!usuario){

            return res.status(400).json({
                msg: 'El correo ingresado no corresponde a ningún usuario'
            })
        }

        //Verificar si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'El usuario ingresado no se encuentra activo'
            })
        }

        //Verificar que la contraseña ingresada corresponda a la registrada en la base de datos
        const validPassword = bcryptjs.compareSync(password,usuario.password);

        //Condicional si la contraseña no coincide
        if( !validPassword ){
            return res.status(400).json({
                msg: 'La contraseña ingresada no corresponde al usuario'
            })
        }

        //Generar el JWT del usuario autenticado si todo sale bien
        const token = await generarJWT(usuario.id);

        //Respuesta cuando todo se ejecuta correctamente
        res.status(200).json({
            msg: 'Login satisfacctorio',
            usuario,
            token
        })
        
    } catch (error) {
        //Error imprevisto
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


//Exportación de los controladores
module.exports = {
    login
}