const winston = require('winston');
const mongoose = require('mongoose');
const { db } = require('../envconfig');

module.exports = function() {
    mongoose.connect(db)
    .then( () => { winston.info("Connected to database") } );
}