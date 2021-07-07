
//Sacar la función Router del paquete de express 
const { Router } = require('express');

//Importación del metodo check para hacer las validaciones del correo
const { check } = require('express-validator');

//Importaciòn de controladores 
const { login } = require('../controller/auth_controller');

//Ejecutor de errores de validaciones 
const { validarCampos } = require('../middlewares/validar-campos');

//Definición de mi router que va contener mis peticiones
const router = Router();

//Login de usuario mediante correo y contraseña validas regitradas en la base de datos - Publico
router.post('/login', [

    //El correo no puede ser un argumento vacio
    check('correo', 'El correo es obligatorio').not().isEmpty(),

    //Validación de que se escriba una contraseña obligatoriamente
    check('password', 'Tiene que escribir una contraseña').not().isEmpty(),

    //Ejecución de errores
    validarCampos
    
],login)



module.exports = router;