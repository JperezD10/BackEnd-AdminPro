const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, editarHospital, borrarHospital } = require('../controllers/hospitales.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT ,getHospitales);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('hospital', 'El id de hospital debe ser valido').isMongoId(),
    validarCampos
], crearHospital);

router.put('/:id',[
    
], editarHospital);

router.delete('/:id',[],borrarHospital);

module.exports = router;
