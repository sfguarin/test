
// Llamado de mis modelos, los llamo siempre la primera con mayuscula y como se llaman en el archivo
const Predio = require('./predio');
const Server = require('./server');
const Usuario = require('./usuario');


// Exportacion de mis modelos
module.exports = {
    Predio,
    Server,
    Usuario
}