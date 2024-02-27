const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app) {
    app.use('/api', helmet());
    app.use(compression());
}