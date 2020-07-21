const   bcrypt  = require('bcrypt-nodejs'),
        jwt     = require('jwt-simple');

const   User    = require('../models/user');

function signUp(req, res) {

    const {email, password, repeatPassword } = req.body;

    const user = new User({
        email: email.toLowerCase(),
        password: password,
        role: "admin",
        active: false
    });

    if (!password || !repeatPassword) {
        res.status(404).send({message: "Campo obligatorio: " + password + " & " + repeatPassword})
    } else {
        if (password !== repeatPassword) {
            res.status(404).send({message: 'Las contraseñas no coinciden'});
        } else {
            //bcrypt
            bcrypt.hash(password, null, null, function(err, hash) {
                if (err) {
                    res.status(500).send({message: 'Error al encriptar la contraseña'})
                } else {
                    user.password = hash;
                    //Save to the database
                    user.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({message: 'Error del servidor: ' + err});
                        } else {
                            if (!userStored) {
                                res.status(404).send({message: 'Error al crear el usuario: ' + err});
                            } else {
                                res.status(200).send({user: userStored})
                            }
                        }
                    });
                }
            })
        }
    }

};

module.exports = {
    signUp
}