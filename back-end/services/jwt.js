const jwt = require('jwt-simple'),
    moment = require('moment');

const SECRET_KEY = "!k-;r#HfH79LKG[S9vVKb`0}BuvOfXlzh.&mWL-d^=Ny7xpMc#.`YE#M_peSYf¡";


exports.createAccessToken = function (user) {
    const payload = {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdToken: moment().unix(),
        exp: moment()
            .add(3, "hours")
            .unix()
    };

    return jwt.encode(payload, SECRET_KEY);
}

exports.refreshToken = function (user) {
    const payload = {
        id: user._id,
        exp: moment()
            .add(30, "days")
            .unix()
    };

    return jwt.encode(payload, SECRET_KEY);
}
  

exports.decodedToken = function (token) { 
    return jwt.decode(token, SECRET_KEY, true);
 }