const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MenuSchema = Schema(
    {
        title: String,
        items:
            [
                {
                    title: String,
                    url: String,
                    order: Number,
                    active: Boolean,
                    cssClass: String,
                    anchorId: String,  
                },
            ]
    }
);

module.exports = mongoose.model('Menu', MenuSchema);