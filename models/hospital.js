const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img:{
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales'});

HospitalSchema.method('toJSON', function(){
    //extraigo datos que no me interesan listar
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object
})

module.exports = model("Hospital", HospitalSchema);