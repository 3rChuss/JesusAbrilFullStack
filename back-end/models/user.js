const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String,
});

module.exports = mongoose.model('User', UserSchema);