const express = require('express');
const path = require('path');
const winston = require('winston');
const app = express();

require('./server/startup/logging')();
require('./server/startup/config')();
require('./server/startup/routes')(app);
require('./server/startup/db')();
require('./server/startup/prod')(app);

app.use(express.static(path.join(__dirname, "dist/traderinsideme-v2"), { maxAge: "1y" }));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist/traderinsideme-v2/index.html")));

app.use(require('./server/middleware/error'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}...`)});

module.exports = server;