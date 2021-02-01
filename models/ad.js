const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();
const bodyTypes = ['Compact', 'Cabrio', 'Coupe', 'Hatchback','SUV', 'Sedan', 'Station Wagon', 'Van', 'Other'];
const fuels = ['Petrol', 'Diesel', 'LPG', 'CNG', 'Hybrid', 'Electric'];
const gearboxes = ['Automatic', '4 speed manual', '5 speed manual', '6 speed manual'];
const doorsEnum = ['2/3', '4/5'];

const adSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    description: {
        type: String,
        maxlength: 2000
    },
    make: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    model: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: currentYear
    },
    price: {
        type: Number,        
        min: 1,
        max: 10000000
    },
    bodyType: {
        type: String,
        enum: bodyTypes,
        required: true
    },
    ccm: {
        type: Number,
        required: true,
        min: 100,
        max: 8000
    },
    fuel: {
        type: String,
        enum: fuels,
        required: true
    },
    HP: {
        type: Number,
        required: true,
        min: 1,
        max: 1000
    },
    mileage: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    gearbox: {
        type: String,
        enum: gearboxes,
        required: true
    },
    doors: {
        type: String,
        enum: doorsEnum,
        required: true
    },
    seats: {
        type: Number,
        min: 1,
        max: 12
    },
    imgUrl: [String],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Ad = mongoose.model('Ad', adSchema);

function validateAd(ad) {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        title: Joi.string().min(3).max(40).required(),   
        description: Joi.string().max(2000),
        make: Joi.string().min(3).max(20),
        model: Joi.string().min(1).max(20),         
        year: Joi.number().min(1900).max(currentYear).required(),
        price: Joi.number().min(0).max(10000000),
        bodyType: Joi.string().valid(...bodyTypes).required(),
        ccm: Joi.number().min(100).max(8000).required(),
        fuel: Joi.string().valid(...fuels).required(),
        HP: Joi.number().min(1).max(1000).required(),
        mileage: Joi.number().min(0).max(1000000).required(),
        gearbox: Joi.string().valid(...gearboxes).required(),
        doors: Joi.string().valid(...doorsEnum).required(),
        seats: Joi.number().min(1).max(12)

    });
    return schema.validate(ad);
};

exports.Ad = Ad;
exports.validate = validateAd;