const           express = require('express'),
        UserController  = require('../controllers/user');

const api = express.Router();

api.post('/sign-up', UserController.signUp);

module.exports = api;