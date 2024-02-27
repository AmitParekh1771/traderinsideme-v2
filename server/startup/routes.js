const express = require('express');
const blogs = require('../routes/blogs');
const users = require('../routes/users');
const authors = require('../routes/authors');
const admins = require('../routes/admins');
const auth = require('../routes/auth');
const apiGuard = require('../middleware/api-guard');

module.exports = function(app) {
    app.use('/api', express.json());
    // app.use('/', apiGuard);
    app.use('/api/blogs', blogs);
    app.use('/api/users', users);
    app.use('/api/authors', authors);
    app.use('/api/admins', admins);
    app.use('/api/auth', auth);
}