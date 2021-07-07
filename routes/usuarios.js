
//Sacar la función Router del paquete de express 
const { Router } = require('express');

//Importación del metodo check para hacer las validaciones
const { check } = require('express-validator');

//Importación de funciones del controlador de usuarios
const { usuariosGet, 
        usuariosPut, 
        usuariosPost,  
        usuariosDelete} = require('../controller/usuarios_controller');

//helper que me ayuda a hacer validaciones
const { emailExiste, idExiste, userExiste } = require('../helpers/db-validators');

//ejecutor de errores en caso de existir uno
const { validarCampos } = require('../middlewares/validar-campos');

//Metodo para validar JWT
const { validarJWT } = require('../middlewares/validar-jwt');


//Creación del router que va contener las peticiones que puede hacer el usuario
const router = Router();

        //Petición GET para obtener todos los usuarios activos registrados en la base de datos - Publico
        router.get('/', usuariosGet)

        //Petición PUT para actualizar la información de un usuario mandado por id - debe tener un JWT válido 
        //para poder actualizar la información - Privado
        router.put('/:id', [

                //Validar el JWT ingresado
                validarJWT,
                //Verifica si el id ingresado corresponde a un formato de id de mongo
                check('id', 'No es un ID válido').isMongoId(),
                //Verifica si el id ingresado corresponde a un id de algun usuario registrado, existe en la DB
                check('id').custom(idExiste),
                //Ejecución de errores acumulados en los check
                validarCampos
        ],
        usuariosPut)

        //Petición POST para la creación de un nuevo usuario - Publico
        router.post('/',
        [       
                //El username no puede ser un argumento vacio
                check('username', 'El username es obligatorio').not().isEmpty(),
                //El nombre no puede ser un argumento vacio
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                //El password debe tener minimo 6 caracteres
                check('password', 'El password debe ser más de 6 letras').isLength( {min:6} ),
                //El correo debe ser valido
                check('correo', 'El correo no es válido').isEmail(),
                //despues de verificar que sea un correo valido mira si existe o no ya en la base de datos
                check('correo').custom(emailExiste),
                //verificar si el correo ya existe
                check('correo').custom(userExiste),
                //Ejecución de errores acumulados en los check
                validarCampos

        ] ,usuariosPost)   

        //Petición DELETE para eliminar un usuario recibido por id, es decir, cambiar su estado a false. 
        //Esto se hace porque puede ser que la data del usuario se necesite a futuro y no se quiere eliminar por 
        //completo. Debe tener un JWT válido para poder eliminar un usuario y debe tener el rol de ADMIN_ROLE para 
        //poder ejecutar la acción - Privado
        router.delete('/:id', [

                //Validación de JWT 
                validarJWT,
                //Verifica si el id ingresado corresponde a un formato de id de mongo
                check('id', 'No es un ID válido').isMongoId(),
                //Verifica si el id ingresado corresponde a un id de algun usuario registrado
                check('id').custom(idExiste),
                //Ejecutor de errores acumulados en los check
                validarCampos
                  
        ],usuariosDelete)   


//Exportar router con las modificaciones previamente hechas 
module.exports = router;