

const validarCampos = require('./validar-campos')
const validarJWT = require('./validar-jwt')


// Se utiliza los 3 puntos para exportar todo lo que traiga ese
// archivo para exportar, si no lo hago asi ocurre un error
module.exports = {
    ...validarCampos,
    ...validarJWT
}