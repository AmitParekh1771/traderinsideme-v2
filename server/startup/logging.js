const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    winston.add(new winston.transports.File({ filename: 'logFile.log' }));

    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtException.log' })
    );

    process.on('unhandledRejection', (err) => {
        throw err;
    });
}