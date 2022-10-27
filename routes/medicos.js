const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, editarMedico, borrarMedico } = require('../controllers/medicos.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT ,getMedicos);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    validarCampos
], crearMedico);

router.put('/:id',[
    
], editarMedico);

router.delete('/:id',[],borrarMedico);

module.exports = router;
