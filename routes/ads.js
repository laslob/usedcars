const auth = require('../middleware/auth');
const express = require('express');
const { Ad, validate } = require('../models/ad');
const { User } = require('../models/user');
const formatQuery = require('../formatQuery');

const router = express.Router();


// READ all active ads with less details
router.get('/', async (req, res) => {
    const query =  formatQuery(req.query);    
    const ads = await Ad.find({isActive: true, ...query}).populate('user', 'name city phone').sort('make').select('title description make model year price fuel imgUrl');
    res.send(ads);    
});

// Read one ad with all details
router.get('/:id', async (req, res) => {
    const ad = await Ad.findById(req.params.id).populate('user', 'name city phone');
    if(!ad) return res.status(404).send('The ad with the given ID was not found');
    res.send(ad); 
});


// Deactivate ad
router.put('/deact/:id/', auth, async (req, res) => {
    const ad = await Ad.findByIdAndUpdate(req.params.id, {
            $set: {
                isActive: false
            }
        }, {new: true});

    if(!ad) return res.status(404).send('The ad with the given ID was not found');
    res.send(ad);
})

// CREATE
router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid user');

    let ad = await Ad.findOne({ user: req.body.userId, title: req.body.title });
    if (ad) return res.status(400).send('Ad already exists.');

    const { title, description, make, model, year, price, bodyType, ccm, fuel, HP, mileage, gearbox, doors, seats, imgUrl } = req.body;
    ad = new Ad({
        user,
        title,
        description,
        make,
        model,
        year,
        price,
        bodyType,
        ccm,
        fuel,
        HP,
        mileage,
        gearbox,
        doors,
        seats,
        imgUrl
    });
    
    await ad.save();
    res.send(ad);
});

// UPDATE
router.put('/:id', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);    

    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid user');

    const { title, description, make, model, year, price, bodyType, ccm, fuel, HP, mileage, gearbox, doors, seats, imgUrl } = req.body;
    let ad = await Ad.findByIdAndUpdate(req.params.id,
        {
            user,
            title,
            description,
            make,
            model,
            year,
            price,
            bodyType,
            ccm,
            fuel,
            HP,
            mileage,
            gearbox,
            doors,
            seats,
            imgUrl
        }, {new: true});
    
    if(!ad) return res.status(404).send('The ad with the given ID was not found');

    res.send(ad);
});


module.exports = router;