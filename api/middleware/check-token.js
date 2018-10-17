const admin = require('firebase-admin');

const serviceAccount = require('./logininmobiliaria-firebase-adminsdk-d81yt-70d4f7c392.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = (req,res,next) => {
    admin.auth().verifyIdToken(req.headers.authorization).then((decodedToken) => {
        next();
    }).catch((error) => {
        // console.log(error);
        return res.status(401).json('Login viejo, por favor re identifiquese');
    });
};