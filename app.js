const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');

//*Conección a base de datos mongo ATLAS, no compartir las credenciles de esta*/
mongoose.connect('mongodb+srv://USERNAME:' + process.env.MONGO_ATLAS_PW + '@CLUSTER.qnrva.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

const experienciasRoutes = require('./api/routes/experienciasRoute');

//Rutadescargas
app.use('/uploads', express.static('uploads'))


//* _middleware modo dev, para evitar reiniciar el servidor cada que se realizan cambios*/
app.use(morgan('dev'));

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

//Control de los CORS *Solo modificar en caso de querer hacer restringido el servicio una vez sea desplegado*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,PATCH,DELETE,POST,GET")
        return res.status(200).json({});
    }
    next();
});

app.use('/', experienciasRoutes);


//Error de que no se han encontrado el enlace solicitado por el usuario
app.use((req, res, next) => {
    const error = new Error('No se encontró la pagina solicitada');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
