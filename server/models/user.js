const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true }
}));

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required().email()
    });

    const result = schema.validate(user);
    return result;
}

exports.User = User;
exports.validateUser = validateUser;