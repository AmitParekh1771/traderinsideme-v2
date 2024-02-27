const { jwtPrivateKey } = require('../envconfig');

module.exports = function() {
    if(!jwtPrivateKey) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
    }
}