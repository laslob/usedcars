const express = require('express');
const makes = require('../routes/makes');
const users = require('../routes/users');
const ads = require('../routes/ads');
const login = require('../routes/login');
const upload = require('../routes/upload');
const error = require('../middleware/error');


module.exports = function(app) {
    app.use(express.json());
    
    app.use('/api/users', users);
    app.use('/api/makes', makes);
    app.use('/api/ads', ads);
    app.use('/api/login', login);
    app.use('/api/upload', upload);
    app.use(error);
}