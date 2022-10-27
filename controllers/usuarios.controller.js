const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');


const getUsuarios = async(req, resp) =>{
    const usuarios = await Usuario.find();

    return resp.status(200).json({
        ok: true,
        usuarios,
        id: req.id
    })
}

const crearUsuarios = async(req, resp) =>{
    const {password, email} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail) {
            return resp.status(400).json({
                ok:false,
                msg:'Correo ya existente'
            })
        }
        const usuario = new Usuario(req.body);
        
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);

        return resp.status(201).json({
            ok: true,
            usuario,
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

const actualizarUsuario = async(req, resp) =>{
    const id = req.params.id;
    
    try {
        const existeUsuario = await Usuario.findById(id);     
        if (!existeUsuario) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el usuario especificado'
            })
        }

        //asi separo las props del body
        const {email, password, google, ...camposBody} = req.body;

        if (existeUsuario.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) return resp.status(400).json({
                ok:false,
                msg: `El email ${email} ya se encuentra en uso`
            })
        }

        camposBody.email = email;
        const usuarioActualizar = await Usuario.findByIdAndUpdate(id, camposBody, {new: true});

        resp.status(200).json({
            ok: true,
            usuario: usuarioActualizar
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

const borrarUsuario = async (req, resp) =>{
    try {
        const id = req.params.id;

        const existeUsuario = await Usuario.findById(id);
        if(!existeUsuario){
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontro el usuario'
            }) 
        }
        await Usuario.deleteOne(existeUsuario);

        resp.status(200).json({
            ok: true,
            msg: `Usuario ${existeUsuario.nombre} eliminado correctamente`
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}