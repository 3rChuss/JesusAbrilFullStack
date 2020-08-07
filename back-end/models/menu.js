const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = Schema({
    title: String,
    menu: {
        title: String,
        url: String,
        order: Number,
        active: Boolean,
        cssClass: String,
        anchorId: String
    }
});

module.exports = mongoose.model('Menu', MenuSchema);