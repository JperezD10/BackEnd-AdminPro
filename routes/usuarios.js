const { Router } = require('express');
const { check } = require('express-validator');
const {getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT ,getUsuarios);

router.post('/',[
    check('nombre', 'Debe indicar el nombre').not().isEmpty(),
    check('password', 'Debe indicar el password').not().isEmpty(),
    check('email', 'Debe indicar el email').isEmail(),
    validarCampos
], crearUsuarios);

router.put('/:id',[
    check('nombre', 'Debe indicar el nombre').not().isEmpty(),
    check('email', 'Debe indicar el email').isEmail(),
    validarCampos
], actualizarUsuario);

router.delete('/:id',[],borrarUsuario);


module.exports = router;