const express = require('express');
const route = express.Router();
const experienciasController = require('../controllers/experienciasController');
const experienciasModel = require('../models/experienciasModel');
const mongoose = require('mongoose');


//API para de imagenes y sus dependencias
const fetch = require('node-fetch');
const { toJson } = require('unsplash-js');
const Unsplash = require('unsplash-js').default;
global.fetch = fetch;


//KEY ACCESS para hacer peticiones al API
const unsplash = new Unsplash({ accessKey: "MvSbZb8umAZ7AMwJMALWOaPiW-cXLZlp9E68-yT0ACw" });




//rutas disponibles

//traer todas las experiencias
route.get("/", experienciasController.listAll);

//Actualizar experiencia
route.put("/:ID", experienciasController.Update);

//Eliminar
route.delete('/:ID',experienciasController.delete );

//Buscar por id
route.get('/:ID',experienciasController.findbyId );

//Buscar experiencias de una misma sala
route.get('/sala/:nombre',experienciasController.listBy );



//Codigo necesario para que la imagen sea cargada desde el clliente al servidor
const multer = require('multer');

//Ruta para guardar imagenes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

//Filtro de tipo de dato
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Configuración de la variable de subida para tener varias validaciones en el 
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //Maximo peso del archivo 5MB 
    },
    fileFilter: filter
});




//Routa para subir una nueva experiencia con su respectiva imagen
route.post("/", upload.single('imagen'), (req, res, next) => {

    console.log(req.file)
    let imagenRefe=""
    const Query = req.body.salaRef
    console.log(Query)

    unsplash.photos.getRandomPhoto({query:Query})
    .then(toJson)
    .then(json=>{

        console.log(json)
        let path;
        console.log(json.urls['small']);

        if( JSON.stringify(json) === '{"total":0,"total_pages":0,"results":[]}'){
            imagenRefe="uploads/Placeholder/placeholder.png";
        }
        else{
            imagenRefe=json.urls['small'];
        }

        try{
            path =req.file.path;
        }catch (e) {
            path ="uploads/Placeholder/placeholder.png";
          }

        const newExpe = new experienciasModel({
            _id: new mongoose.Types.ObjectId,
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            salaRef:req.body.salaRef,
            imagenRel:imagenRefe,
            imagen:path,
        })
    
        newExpe.save().then(result => {
    
            //Las respuestas de este tipo son simplemente para hacer un API más informativa y descriptiva
            res.status(200).json({
                _id:result._id,
                titulo:result.titulo,
                descripcion:result.descripcion,
                salaRef:result.salaRef,
                imagen:result.imagen,
                imagenRel:result.imagenRel,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/' + result._id
                }
            });
        })
        
    


    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});


module.exports = route;