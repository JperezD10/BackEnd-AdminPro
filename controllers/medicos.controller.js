const Medico = require('../models/medico');

const getMedicos = async(req, resp) =>{
    const medicos = await Medico.find().populate('usuario','nombre').populate('hospital', 'nombre');
    resp.status(200).json({
        ok: true,
        medicos
    })
}
const crearMedico = async(req, resp) =>{
    const idUsuario = req.id;
    const medico = new Medico(
        {
            usuario: idUsuario,
            ...req.body,
        });

    try {
        
        await medico.save();

        resp.status(201).json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}
const editarMedico = (req, resp) =>{
    
}
const borrarMedico = (req, resp) =>{
    
}

module.exports = {
    getMedicos,
    crearMedico,
    editarMedico,
    borrarMedico
}