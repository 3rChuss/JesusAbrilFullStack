const   express = require('express'),
    bodyParser  = require('body-parser'),
            app = express(),
    { API_VERSION } = require
        ('./config');
const cors = require('cors');


// Load routings
// ....
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Headers HTTP
// ....

// CORS
// ....
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})


// Routers
// ....
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);

module.exports = app;