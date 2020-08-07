const experienciasModel = require('../models/experienciasModel');
const mongoose = require('mongoose');



//lista de todas las experiencias 
exports.listAll = ((req, res, next) => {

        experienciasModel.find()
        .exec()
        .then(ExpeR=>{
            if(ExpeR.length <= 0) return res.status(400).json("No se registran esperiencias aún")

            const response = {
                elements: ExpeR.map(x => {
                    
                    return {
                        titulo: x.titulo,
                        descripcion: x.descripcion,
                        salaRef: x.salaRef,
                        _id: x._id,
                        imagen:x.imagen,
                        imagenRel:x.imagenRel,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/' + x._id
                        }
                    }
                })
            };
    
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({
                error: {
                    message: err
                }
            })
    
        });

 
    
});




//Modificar una experiencia (solo texto) 
exports.Update = ((req, res, next) => {

    const id = req.params.ID;
    const UpdateOps = {};

    for (const ops of req.body) {
        UpdateOps[ops.propName] = ops.value;
    }

    experienciasModel.update({ _id: id }, { $set: UpdateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    
});

//Eliminar una experiencia
exports.delete = ((req, res, next) => {
    const id = req.params.ID;

    experienciasModel.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

//Buscar una experiencia por id
exports.findbyId = ((req, res, next) => {
    const id = req.params.ID;
    experienciasModel.find({ _id: id })
    .select('_id titulo descripcion salaRef imagen imagenRel')
    .exec()
    .then(doc => {
        const response = {
            elements: doc.map(x => {
                
                return {
                    titulo: x.titulo,
                    descripcion: x.descripcion,
                    salaRef: x.salaRef,
                    _id: x._id,
                    imagen:x.imagen,
                    imagenRel:x.imagenRel,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + x._id
                    }
                }
            })
        };

        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })




});

//Buscar una experiencias de una misma sala por nombre
exports.listBy = ((req, res, next) => {
    const nombre = req.params.nombre;
    experienciasModel.find({ salaRef: nombre })
    .select('_id titulo descripcion salaRef imagen imagenRef')
    .exec()
    .then(doc => {
        const response = {
            elements: doc.map(x => {
                
                return {
                    titulo: x.titulo,
                    descripcion: x.descripcion,
                    salaRef: x.salaRef,
                    _id: x._id,
                    imagen:x.imagen,
                    imagenRel:x.imagenRel,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + x._id
                    }
                }
            })
        };

        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })




});

