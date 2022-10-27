const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/',[
    check('email', 'Debe indicar el email').isEmail(),
    check('password', 'Debe indicar el password').not().isEmpty(),
],login);

module.exports = router;
