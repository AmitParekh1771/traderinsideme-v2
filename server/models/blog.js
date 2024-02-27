const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const Blog = mongoose.model('Blog', new mongoose.Schema({
    title: { type: String, required: true },
    route: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    contentTitle: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    publishingDate: { 
        type: Date, 
        default: Date.now },
    modifyingDate: { 
        type: Date, 
        default: Date.now },
    tags: [ String ],
    categories: [ String ],
    content: { type: String, required: true },
    canonicalURL: { type: String, required: true },
    isPublished: { type: Boolean, default: false }
}));

function validateBlog(blog) {
    const schema = Joi.object({
        title: Joi.string().required(),
        route: Joi.string().required(),
        description: Joi.string().required(),
        contentTitle: Joi.string().required(),
        image: Joi.string().required(),
        author: Joi.objectId().required(),
        tags: Joi.array().items(Joi.string()),
        categories: Joi.array().items(Joi.string()),
        content: Joi.string().required(),
        canonicalURL: Joi.string().required(),
        isPublished: Joi.boolean().required()
    });

    const result = schema.validate(blog);
    return result;
}

exports.Blog = Blog;
exports.validateBlog = validateBlog;

