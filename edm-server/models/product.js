const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new Schema({
    publisher: {
        type: ObjectId,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['jardin_sintetico', 'tela', 'empapelado'],
        default: 'empapelado',
        required: true
    },
    price: {
        type: Currency,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema],
    name: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;