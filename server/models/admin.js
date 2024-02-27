const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
const _ = require('lodash');
const { jwtPrivateKey } = require('../envconfig');
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isHead: { type: Boolean, default: false }
});

adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id,
        isHead: this.isHead
    }, jwtPrivateKey, {
        expiresIn: '7d'
    });
    return token;
}


const Admin = mongoose.model('Admin', adminSchema);

function validateAdmin(admin) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        isHead: Joi.boolean(),
    });

    const result = schema.validate(admin);
    return result;
}


exports.Admin = Admin;
exports.validateAdmin = validateAdmin;