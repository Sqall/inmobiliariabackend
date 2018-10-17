const Propiedad = require('../models/propiedad');
const cloudinary = require('../controllers/cloudinary');

exports.propiedades_nueva_propiedad = (req,res,next) => {
    // console.log(req.body);
    const propiedad = new Propiedad({
        categoria: req.body.categoria,
        subcategoria: req.body.subcategoria,
        direccion: req.body.direccion,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagenes_id: req.body.imagenes_id,
        imagenes: req.body.imagenes
    });

    propiedad.save()
        .then(result => {
            res.status(200).json({message:'Propiedad Creada'});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.propiedades_edit_propiedad = (req,res,next) => {
    Propiedad.findById(req.params.id)
        .exec()
        .then((doc) =>{
            doc.categoria = req.body.categoria;
            doc.subcategoria = req.body.subcategoria;
            doc.direccion = req.body.direccion;
            doc.precio = req.body.precio;
            doc.descripcion = req.body.descripcion;
            let new_imagenes = [];
            let new_imagenes_id = [];
            new_imagenes = doc.imagenes.concat(req.body.imagenes);
            new_imagenes_id = doc.imagenes_id.concat(req.body.imagenes_id);
            doc.imagenes = new_imagenes;
            doc.imagenes_id = new_imagenes_id;
            doc.save()
            .then(result => {
                res.status(200).json('Editado Correctamente');
            }).catch(err => {
                res.status(500).json({error: err});
            });
        })
        .catch(err =>{
          console.log(err);
          res.status(500).json({ error: err});
        });
};

exports.propiedades_delete_propiedad = (req,res,next) => {
    Propiedad.findById(req.params.id)
        .exec()
        .then((doc) => {
            // DELETE IMAGES- check status of files
            cloudinary.v2.api.delete_resources(doc.imagenes_id,function(error, result){
                console.log(result);
            });
            Propiedad.findByIdAndRemove(req.params.id)
                .exec()
                .then( (response) => {
                    res.status(200).json({message: 'Propiedad Borrada Correctamente'});
                })
                .catch(err => {
                    res.status(500).json({ error: err});
                });
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        });
};