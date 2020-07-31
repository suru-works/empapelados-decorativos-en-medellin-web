const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    verifyToken: {
        type: String
    },
    verified: {
        type: Boolean
    },
    forgotPasswordToken: {
        type: String
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);