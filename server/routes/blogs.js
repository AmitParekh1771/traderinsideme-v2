const express = require('express');
const router = express.Router();
const { Blog, validateBlog } = require('../models/blog');
const { Author } = require('../models/author');
const auth = require('../middleware/auth');
const head = require('../middleware/head');

router.get('/', async (req, res) => {
    const blogs = await Blog
        .find()
        .populate('author')
        .sort({ modifyingDate: -1 })
        .select("author modifyingDate publishingDate contentTitle route description categories tags isPublished");
    
    res.send(blogs);
});

router.get('/:route', async (req, res) => {
    const blog = await Blog
        .findOne({ route: req.params.route })
        .populate('author'); 
    if(!blog) return res.status(404).send("Blog Not Found");

    res.send(blog);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateBlog(req.body);
    if(error) return res.status(400).send(error.details);

    const result = await Author.findById(req.body.author);
    if(!result) return res.status(400).send("Author with provided ObjectId does not exist");

    const blog = new Blog(req.body);

    await blog.save();
    
    res.send(blog);
});

router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const { error } = validateBlog(body);
    if(error) return res.status(400).send(error.details);
    
    const result = await Author.findById(body.author);
    if(!result) return res.status(400).send("Author with provided ObjectId does not exist");

    const blog = await Blog.findByIdAndUpdate(id, {
        $set: body,
        $currentDate: { modifyingDate: true },
        $inc: { __v: 1 }
    }, { new: true });
    if(!blog) return res.status(404).send("Blog Not Found");
    
    res.send(blog);
});

router.delete('/:id', [auth, head], async (req, res) => {
    const blog = await Blog.findByIdAndRemove(req.params.id); 
        if(!blog) return res.status(404).send("Blog Not Found");

    res.send(blog);
});


module.exports = router;
