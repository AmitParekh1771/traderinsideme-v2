const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User
        .find()
        .sort({ email: 1 })
    
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details);

    let user;
    user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send("Email ID has already subscribed");

    user = new User(req.body);

    await user.save();
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send("User Not Found");

    res.send(user);
});

module.exports = router;