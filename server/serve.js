const express = require('express');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/', proxy('https://api.smarkets.com/'));
app.listen(3000);