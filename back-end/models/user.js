const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean
});

module.exports = mongoose.model('User', UserSchema);