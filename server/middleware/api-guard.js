const { apiKey } = require('../envconfig');
const express = require('express');
const router = express.Router();

router.all("*", function (req, res, next) {
    const key = req.header('x-api-key');
    if(!key) return res.status(401).send("Access denied. API key not available");

    if(key != apiKey) return res.status(400).send("Invalid API key");

    next();
});

module.exports = router;
