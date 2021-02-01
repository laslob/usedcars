const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { Make, validate } = require('../models/make');

const router = express.Router();

// READ one
router.get('/:id', async (req, res) => {   
       const make = await Make.findById(req.params.id);
    
        if(!make) return res.status(404).send('The make is not found');
        res.send(make);   
});

// READ all
router.get('/', async (req, res) => {
    const makes = await Make.find().select('name').sort('name');
    res.send(makes);    
});

// CREATE
router.post('/', [auth, admin], async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let make = await Make.findOne({ name: req.body.name });
    if (make) return res.status(400).send('Make already exists.');

    const { name, models } = req.body;
    make = new Make({
        name,
        models
    });
    
    await make.save();
    res.send(make);
});

// UPDATE
router.put('/:id', [auth, admin], async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const make = await Make.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        models: req.body.models
    },
    {
        new: true
    });

    if(!make) return res.status(404).send('The make is not found');
    res.send(make);
})

// DELETE
router.delete('/:id', [auth, admin], async (req, res) => {
    const make = await Make.findByIdAndRemove(req.params.id);
        
    if(!make) return res.status(404).send('The make is not found');

    res.send(make);
}); 

module.exports = router;