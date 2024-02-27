const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Admin } = require('../models/admin');


router.post('/', async (req, res) => {
    const { error } = validateAdmin(req.body);
    if(error) return res.status(400).send(error.details);

    const admin = await Admin.findOne({ email: req.body.email });
    if(!admin) return res.status(400).send("Invalid email or password");

    const isValidPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!isValidPassword) return res.status(400).send("Invalid email or password");

    // command to set environment variable: $env:variable_name='variable_value'
    const token = admin.generateAuthToken();

    res.send({ token: token });
});

function validateAdmin(admin) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const result = schema.validate(admin);
    return result;
}

module.exports = router;