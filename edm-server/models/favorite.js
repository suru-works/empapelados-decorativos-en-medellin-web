const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var favoriteDishSchema = new Schema({
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }
}, {
    timestamps: true
});


const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [   favoriteDishSchema    ]
}, {
    timestamps: true
});


var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;