var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'inmobiliaria-gatti',
    folder: 'Gattidev',
    api_key: '167695282387732',
    api_secret: 'stxfgzblNBm-BUT2pTG1CLHqyGw'
  });

module.exports = cloudinary;