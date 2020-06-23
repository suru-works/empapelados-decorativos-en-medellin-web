const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;