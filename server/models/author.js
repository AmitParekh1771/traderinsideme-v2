const mongoose = require('mongoose');
const Joi = require('joi');

const Author = mongoose.model('Author', new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    about: { type: String, required: true },
    socialMedia: {
        linkedin: String,
        facebook: String,
        instagram: String,
        twitter: String
    }
}));

function validateAuthor(author) {
    const schema = Joi.object({
        image: Joi.string().required(),
        name: Joi.string().required(),
        about: Joi.string().required(),
        socialMedia: Joi.object({
            linkedin: Joi.string().min(0),
            facebook: Joi.string().min(0),
            instagram: Joi.string().min(0),
            twitter: Joi.string().min(0)
        }).optional()
    });

    const result = schema.validate(author);
    return result;
}


exports.Author = Author;
exports.validateAuthor = validateAuthor;