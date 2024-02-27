const express = require('express');
const router = express.Router();
const { Author, validateAuthor } = require('../models/author');
const auth = require('../middleware/auth');
const head = require('../middleware/head');

router.get('/', async (req, res) => {
    let authors;

    authors = await Author.find();

    res.send(authors);
});

router.get('/:id', async (req, res) => {
    let author;

    author = await Author.findById(req.params.id); 
    if(!author) return res.status(404).send("Author Not Found");

    res.send(author);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateAuthor(req.body);
    if(error) return res.status(400).send(error.details);

    const author = new Author(req.body);

    await author.save();

    res.send(author);
});

router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const { error } = validateAuthor(body);
    if(error) return res.status(400).send(error.details);
    
    const author = await Author.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            about: body.about,
            image: body.image,
            socialMedia: body.socialMedia
        },
        $inc: { __v: 1 }
    }, { new: true });
    if(!author) return res.status(404).send("Author Not Found");
    
    res.send(author);
});

router.delete('/:id', [auth, head], async (req, res) => {
    const author = await Author.findByIdAndRemove(req.params.id); 
    if(!author) return res.status(404).send("Author Not Found");

    res.send(author);
});


module.exports = router;