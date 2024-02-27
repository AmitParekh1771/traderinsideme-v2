const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    jwtPrivateKey: process.env.traderinsideme_jwtPrivateKey,
    apiKey: process.env.traderinsideme_apiKey,
    db: process.env.traderinsideme_db
}