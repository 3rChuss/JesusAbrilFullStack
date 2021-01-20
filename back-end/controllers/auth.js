const jwt = require('../services/jwt'),
    moment = require('moment');

const User = require('../models/user');


function willExpiredToken(token) {
    const { exp } = jwt.decodedToken(token);
    const currentDate = moment().unix();
    if (currentDate > exp) {
        return true;
    }
    return false;
};

function refreshAccessToken(req, res) {
    console.log("hola!");
    const { refreshToken } = req.body;
    
    const isTokenExpired = willExpiredToken(refreshToken);

    if (isTokenExpired) {
        res.status(404).send({ message: "refreshToken Expired" });
    } else {
        const { id } = jwt.decodedToken(refreshToken);
        User.findById(id, (err, userStored) => {
            if (err) {
                res.status(500).send({ message: 'controllers/auth.js:27 + error!' })
            } else {
                if (!userStored) {
                    res.status(404).send({ message: 'User not found' });
                } else {
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStored),
                        refreshToken: refreshToken
                    })
                }
            }
        })
    }
}

module.exports = {
  refreshAccessToken,
};