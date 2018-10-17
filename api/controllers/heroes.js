const Hero = require('../models/heroe');


exports.heroes_get_all = (req,res,next) => {
    Hero.find()
        //.select('name price _id')
        .exec()
        .then(docs => {
            /*const response = {
                count: docs.length,
                heroes: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        location: doc.location,
                        needs: doc.needs,
                        reques: {
                            type: 'GET',
                            url: 'URL TO SINGLE REQUEST(BY ID)'
                        }
                    }
                })
            };*/

            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
}