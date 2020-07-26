const jwt = require('jwt-simple'),
    moment = require('moment');

const SECRET_KEY = "!k-;r#HfH79LKG[S9vVKb`0}BuvOfXlzh.&mWL-d^=Ny7xpMc#.`YE#M_peSYf¡";

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'The request does not have auth header' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY);
        if (payload.exp <= moment.unix()) {
            return res.status(404).send({ message: 'Token expired!' });
        }
    } catch (error) {
        console.log('Error middleware/authenticated.js:19');
        return res.status(404).send({ message: 'Token not valid!' });
    }

    req.user = payload;
    next();
};
