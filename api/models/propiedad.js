const mongoose = require('mongoose');

const PropiedadSchema = mongoose.Schema({
	categoria:{
		type:String,
		index:true
	},
	subcategoria:{
		type:String,
		index:true
	},
	direccion:{
		type:String
	},
	precio:{
		type:String
	},
	descripcion:{
		type:String
	},
	imagenes: [],
	imagenes_id:[]
});

module.exports = mongoose.model('Propiedad',PropiedadSchema);
