const   express = require('express'),
    bodyParser  = require('body-parser'),
            app = express(),
{ API_VERSION } = require('./config');


// Load routings
// ....

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Headers HTTP
// ....



// Routers
// ....


module.exports = app;