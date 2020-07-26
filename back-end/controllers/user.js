const
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('../services/jwt');

const   User    = require('../models/user');

function signUp(req, res) {

    const {name, lastName, email, password, repeatPassword } = req.body;

    const user = new User({
        name: name,
        lastName: lastName,
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

function signIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: 'Server error: controller/user.js:57 + ' + err });
        } else {
            if (!userStored) {
                res.status(404).send({ message: 'User not found!' });
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: 'Server error: controller/user.js:64 + ' + err });
                    } else if (!check) {
                        res.status(404).send({ message: 'Incorrect password' });
                    } else {
                        if (!userStored.active) {
                            res.status(200).send({ message: 'User inactive' });
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.refreshToken(userStored)
                            });
                        }
                    }
                })
            }
        }
    })
};

function getUsers(req, res) {
    User.find().then(users => {
        if (!users) {
            res.status(404).send({message: 'Any user found controllers/user.js:86'})
        } else {
            res.status(200).send({ users });
        }
    })
}

module.exports = {
    signUp,
    signIn,
    getUsers
}