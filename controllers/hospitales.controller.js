const Hospital = require('../models/hospital');

const getHospitales = async(req, resp) =>{
    const hospitales = await Hospital.find().populate('usuario','nombre');
    resp.status(200).json({
        ok: true,
        hospitales
    })
}
const crearHospital = async(req, resp) =>{
    const idUsuario = req.id;
    const hospital = new Hospital(
        {
            usuario: idUsuario,
            ...req.body,
        });

    try {
        
        await hospital.save();

        resp.status(201).json({
            ok: true,
            hospital
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
    
}
const editarHospital = (req, resp) =>{
    
}
const borrarHospital = (req, resp) =>{
    
}

module.exports = {
    getHospitales,
    crearHospital,
    editarHospital,
    borrarHospital
}