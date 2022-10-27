const jwt = require('jsonwebtoken');

const validarJWT = (req, resp, next) =>{

    //leer token
    const token = req.header('x-token');
    
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'No se encontro el token'
        })
    }
    try {
        const {id} = jwt.verify(token,process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }

}

module.exports = {
    validarJWT
}