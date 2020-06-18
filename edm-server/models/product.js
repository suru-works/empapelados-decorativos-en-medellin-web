const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    units: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;