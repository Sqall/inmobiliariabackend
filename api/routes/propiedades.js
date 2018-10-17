var express = require('express');
var router = express.Router();
var multer = require('multer');

const checkToken = require('../middleware/check-token');
var Propiedades = require('../models/propiedad');
const PropiedadesController = require ('../controllers/propiedades');

const cloudinary = require('../controllers/cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');



var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Gattidev',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, file.name);
  }
});

var parser = multer({ storage: storage });


router.get('/', function(req, res, next) {
  Propiedades.find()
              .limit(4)
              .exec()
              .then(docs => {
                  res.status(200).json(docs);
              })
              .catch(err => {
                  res.status(500).json({error: err});
              });
});

router.get('/:categoria',function(req,res,next){
  Propiedades.find({categoria: req.params.categoria})
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
});

router.get('/:categoria/:id',function(req,res,next){
  Propiedades.find({_id: req.params.id})
    .exec()
    .then(doc => {
      res.stauts(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
});

router.post('/images', checkToken, parser.array('images',5),function(req,res,next){  
  res.status(200).json(req.files);
});

router.post('/', checkToken, PropiedadesController.propiedades_nueva_propiedad);


router.patch('/edit/:id',checkToken, PropiedadesController.propiedades_edit_propiedad);

router.delete('/:id', checkToken, PropiedadesController.propiedades_delete_propiedad);

router.delete('/imagen/Gattidev/:id', checkToken, function(req,res,next){
  cloudinary.v2.api.delete_resources(['Gattidev/'+req.params.id],function(error, result){
    Propiedades.findOne({imagenes_id: 'Gattidev/'+req.params.id})
      .exec()
      .then( (doc) => {
        // REMOVE IMAGE PATH
        let new_imagenes = doc.imagenes.filter(item => !item.includes('Gattidev/'+req.params.id));
        doc.imagenes_id.pull('Gattidev/'+req.params.id);
        // SAVE DOC
        doc.imagenes = new_imagenes;
        doc.save()
            .then(result => {
                res.status(200).json('Imagen Borrada Correctamente');
            }).catch(err => {
                res.status(500).json({error: err});
            });
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({ error: err});
      })
	});
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};


module.exports = router;
