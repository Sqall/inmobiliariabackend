const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//DEFINED ROUTES TO THEIR FILES
const heroesRoutes = require('./api/routes/heroes');
const userRoutes = require('./api/routes/users');
const propiedadesRoutes = require('./api/routes/propiedades');

/* TO DO
*  -firebase-admin section to check auth/actions in server.
*
*
*
*/
//'mongodb://hermangatti:gattipass@ds113668.mlab.com:13668/inmobiliariahermangatti'
mongoose.connect('mongodb://hermangatti:gattipass@ds113668.mlab.com:13668/inmobiliariahermangatti',{useNewUrlParser: true})
.then(console.log('Connected'))
.catch(err => {console.log(err)});

mongoose.Promise = global.Promise;
//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//ROUTES REQUESTED
app.use('/heroes',heroesRoutes);
app.use('/user',userRoutes);
app.use('/propiedades',propiedadesRoutes);


app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;