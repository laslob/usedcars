const mongoose = require('mongoose');
const { MONGODB } = require('../db_config');

module.exports = function() {
    mongoose.connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    //.catch(err => console.error('Could not connect do MongoDB...'))
}