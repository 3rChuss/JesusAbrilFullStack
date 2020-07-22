const   express = require('express'),
    bodyParser  = require('body-parser'),
            app = express(),
{ API_VERSION } = require('./config');


// Load routings
// ....
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Headers HTTP
// ....



// Routers
// ....
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);


module.exports = app;