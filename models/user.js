const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const cities = ['Beograd', 'Valjevo', 'Vranje', 'Zaječar', 'Zrenjanin', 'Jagodina', 'Kragujevac', 'Kraljevo',
    'Kruševac', 'Leskovac', 'Loznica', 'Niš', 'Novi Pazar', 'Novi Sad', 'Pančevo', 'Požarevac', 'Priština',
    'Smederevo', 'Sombor', 'Sremska Mitrovica', 'Subotica', 'Užice', 'Čačak', 'Šabac', 'Pirot'];

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    city: {
        type: String,
        required: true,
        enum: cities,
        minlength: 2,
        maxlength: 30
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));  
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        city: Joi.string().min(2).max(30).valid(...cities).required(),
        phone: Joi.string().min(8).max(15).required()
    });
    return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;