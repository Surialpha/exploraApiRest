const mongoose = require('mongoose');

const ExperienciasSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    salaRef: { type: String, required: true },
    imagen: { type: String},
    imagenRel: { type: String},

});

module.exports = mongoose.model('ExperienciasSchema', ExperienciasSchema)