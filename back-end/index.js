const   mongoose    = require('mongoose'),
        app         = require('./app'),
        port        = process.env.PORT || 3977,
    { API_VERSION } = require('./config');


// Connecting Database
// ....
    mongoose.set('useFindAndModify', false);
    mongoose.connect('mongodb+srv://portfolio:qifFTJ4a05hogjRy@cluster0-v6xpx.mongodb.net/portfolio?retryWrites=true&w=majority', 
        {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
            if (err) {
                throw err;
            } else {
                console.log('Database Connected');

                app.listen(port, () => {
                    console.log('##########');
                    console.log('#### API_REST ####');
                    console.log('##########');
                    console.log(`api/${API_VERSION}`);
                })
            }
        })