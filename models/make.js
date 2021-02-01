const mongoose = require('mongoose');
const Joi = require('joi');

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    models: [String]        
});

const Make = mongoose.model('Make', makeSchema);

function validateMake(make) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),        
        models: Joi.array().min(1).required(),
        models: Joi.array().items(Joi.string().min(1).required())
    });
    return schema.validate(make);
};

exports.Make = Make;
exports.validate = validateMake;