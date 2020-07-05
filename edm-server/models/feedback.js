const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    feedback: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    agree: {
        type: Boolean
    },
    contactType: {
        tyoe: String
    }
}, {
    timestamps: true
});

var Feedbacks = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedbacks;