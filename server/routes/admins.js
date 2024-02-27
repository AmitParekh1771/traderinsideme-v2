const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { Admin, validateAdmin } = require('../models/admin');
const auth = require('../middleware/auth');
const head = require('../middleware/head');

router.get('/', [auth, head], async (req, res) => {
    const admins = await Admin
        .find()
        .sort({ name: 1 })
        .select("-password");
    
    res.send(admins);
});

router.get('/me', auth, async (req, res) => {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.send(admin); 
});

router.post('/', [auth, head], async (req, res) => {
    const { error } = validateAdmin(req.body);
    if(error) return res.status(400).send(error.details);

    let admin;
    admin = await Admin.findOne({ email: req.body.email });
    if(admin) return res.status(400).send("Admin already registered");

    admin = new Admin(req.body);
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);

    await admin.save();

    const token = admin.generateAuthToken();

    res.header('x-auth-token', token).send(admin);
});

router.delete('/:id', [auth, head], async (req, res) => {
    const admin = await Admin.findByIdAndRemove(req.params.id);
    if(!admin) return res.status(404).send("Admin Not Found");

    res.send(admin);
});

module.exports = router;