const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../envconfig');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).send("Access denied. Token not available");

    try {
        const decode = jwt.verify(token, jwtPrivateKey);
        req.admin = decode;
        next();
    }
    catch {
        res.status(400).send("Invalid token.");
    }
}