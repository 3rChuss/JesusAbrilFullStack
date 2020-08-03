const
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('../services/jwt'),
    fs = require('fs'),
    path = require('path');

const   User    = require('../models/user');
const { param } = require('../routes/user');
const { send } = require('process');
const { exists } = require('../models/user');

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

function getUsersActive(req, res) {
    const query = req.query;
    User.find({active: query.active}).then(users => {
        if (!users) {
            res.status(404).send({ message: 'Any user found controllers/user.js:86' })
        } else {
            res.status(200).send({ users });
        }
    })
}

function uploadAvatar(req, res) {
    const params = req.params;
    
    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({message: 'Server error, cant upload avatar'})
        } else {
            if (!userData) {
                res.status(404).send({ message: 'User not found' });
            } else {
                let user = userData;
                
                if (req.files) {
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split("\\");
                    let fileName = fileSplit[2];

                    let extSplit = fileName.split(".");
                    let fileExt = extSplit[1];

                    if (fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'wepb') {
                        res.status(400).send({ message: 'File ext not valid (.jpg, .pnh, .wepb' });
                    } else {
                        user.avatar = fileName;
                        User.findByIdAndUpdate({ _id: params.id }, user, (err, userResult) => {
                            if (err) {
                                res.status(500).send({message: 'Server error'})
                            } else {
                                if (!userResult) {
                                    res.status(404).send({message: 'User not found'})
                                } else {
                                    res.status(200).send({ avatar: fileName });
                                }
                            }
                        })
                    }
                }
            }
        }
    })
}

function getAvatar(req, res) {
    const avatarName = req.params.avatar;
    const filePath = "./uploads/avatar/" + avatarName;

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).send({ message: 'Avatar not found!' });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

async function updateUser(req, res) {
    let userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;

    if (userData.password) {
        await bcrypt.hash(userData.password, null, null, (err, hashedPswd) => {
            if (err) {
                res.status(500).send({message: 'Erro during encrypting password'})
            } else {
                userData.password = hashedPswd;
            }
        })
    }

    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Server error, controller/user.js:169' });
        } else {
            if (!userUpdated) {
                res.status(404).send({message: 'User not found, controller/user.js:172'})
            } else {
                res.status(200).send({ message: "User updated successfully" });
            }
        }
    })
}

function activateUser(req, res) {
    const { id } = req.params;
    const { active } = req.body;

    User.findByIdAndUpdate(id, { active }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: 'Server error' });
        } else {
            if (!userStored) {
                res.status(404).send({ message: 'User not found: controller/user.js:202' });
            } else {
                if (active === true) {
                    res
                      .status(200)
                      .send({ message: "User activated successfully." });
                } else {
                    res.status(200).send({ message: 'User marked as inactive successfully.' });
                }
            }
        }
    })
}

function deleteUser(req, res) {
    const { id } = req.params;

    User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            res.status(500).send({message:'Server Error'})
        } else {
            if (!deleteUser) {
                res.status(404).send({message: 'User not found.'})
            } else {
                res.status(200).send({
                    message: 'User removed successfully.'
                });
            }
        }
    })
}

function createNewUser(req, res) {
    const { name, lastName, email, password, role } = req.body;

    const user = new User({
        name: name,
        lastName: lastName,
        email: email.toLowerCase(),
        password: password,
        role: role,
        active: true
    });

    if (!password) {
        res.status(500).send({message: 'All inputs are required.'})
    } else {
        bcrypt.hash(password, null, null, (err, hash) => {
            if (err) {
                res.status(500).send({ message: 'Server error.' })
            } else {
                user.password = hash;
                user.save((err, newUser) => {
                    if (err) {
                        res.status(500).send({ message: 'The user already exists.' });
                    } else {
                        if (!newUser) {
                            res.status(404).send({ message: 'Error while creating new user: controller/user.js:261' });
                        } else {
                            res.status(200).send({ user: newUser, message: 'User create successfully.' });
                        }
                    }
                });
            }
        });
    };
};

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
  activateUser,
  deleteUser,
  createNewUser,
};