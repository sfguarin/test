
//Sacar la función Router del paquete de express 
const { Router } = require('express');

//Importación del metodo check para hacer las validaciones del correo
const { check } = require('express-validator');
const { obtenerPredios, obtenerUnPredio, crearPredio, actualizarPredio, borrarPredio } = require('../controller/predios_controller');
const { existePredio, existeDireccion } = require('../helpers/db-validators');

// Importación de middlewares para validar JWT y validar campos en caso de exitir un error
const { validarJWT,
        validarCampos
       } = require('../middlewares');


//función router que me permite hacer las interacciones put, post,delete, etc.
const router = Router();

//Obtener todos los predios - Publico
router.get('/', obtenerPredios) 

//Obtener un predio por un id - Publico
router.get('/:id',[

       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existePredio),
       validarCampos

], obtenerUnPredio)

//Crear predio - privado - cualquier persona con un token valido
router.post('/',[

       validarJWT, 
       check('matricula', 'La matrícula inmobiliaria es obligatoria').not().isEmpty(),
       check('direccion', 'La direccion es obligatorio').not().isEmpty(),
       check('direccion').custom(existeDireccion),
       validarCampos

], crearPredio) 

//Actualizar un predio - privado - con un token valido
router.put('/:id',[
       validarJWT,
       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existePredio),
       validarCampos,
], actualizarPredio) 

//Borrar un predio - ADMIN
router.delete('/:id',[
       validarJWT,
       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existePredio),
       validarCampos
], borrarPredio) 

module.exports = router;
