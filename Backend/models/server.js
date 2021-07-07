
//Importo paquete express para manejar el despliegue
const express = require('express')

//Paquete cors que sirve para proteger nuestro servidor y restringir el acceso de sitios web
const cors = require('cors');

//Función que importo para hacer la conexión con mongoDB
const { dbConnection } = require('../DB/config');

//Creación de mi servidor que es el que ejecuta la logica
class Server {

    //Constructor 
    constructor() {

        //definicion de variable app
        this.app = express();

        //Puerto que voy a utilizar para desarrollo 
        this.port = process.env.PORT;

        //Rutas de interacción con el usuario para hacer peticiones
        this.paths = {
            
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            predios:    '/api/predios',
            usuarios:   '/api/usuarios'
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Llamado a las rutas que tienen la logica para procesar peticiones
        this.routes();
    }

    //Metodo para conectar a la base de datos
    async conectarDB() {

        await dbConnection();
    }

    //Ejecución de middlewares
    middlewares() {

        // Cors - Permite proteger nuestro servidor 
        this.app.use( cors() );

        //lectura y parseo del body (postman)
        this.app.use( express.json() );

        //Directorio publico, para hacer uso del html que se ubica en la carpeta public (encargado del front)
        this.app.use( express.static('public') );
    }

    //Ejecución de la logica para procesar peticiones
    routes() {

        //funcion para llamar los endpoints puestos en ../routes/auth, con el url /api/auth
        this.app.use(this.paths.auth, require('../routes/auth'));

        //funcion para llamar los endpoints puestos en ../routes/buscar con el url /api/buscar
        this.app.use(this.paths.buscar, require('../routes/buscar'));

        //funcion para llamar los endpoints puestos en ../routes/predios con el url /api/predios
        this.app.use(this.paths.predios, require('../routes/predios'));
        
        //funcion para llamar los endpoints puestos en ../routes/usuarios, con el url /api/usuarios
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));

          
    }

    //Despliegue en mi puerto de desarrollo, el listen lo ejecuto desde app.js
    listen() {

        this.app.listen(this.port, () => {

            //Mensaje para verificar que la ejecución se logro satisfactoriamente
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

//Exportación de mi servidor
module.exports = Server;