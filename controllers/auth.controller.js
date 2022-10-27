const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const login = async (req, resp) =>{
    try {
        const {email, password} = req.body;
        const existeUsuario = await Usuario.findOne({email});
        if(!existeUsuario) return resp.status(404).json({
            ok: false,
            msg: `No existe el email ${email}`
        })
        const validPassword = bcrypt.compareSync(password, existeUsuario.password);
        if(!validPassword) return resp.status(400).json({
            ok: false,
            msg: 'Contraseña incorrecta'
        });

        //generar token
        const token = await generarJWT(existeUsuario.id);

        resp.status(200).json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

module.exports = {
    login
}