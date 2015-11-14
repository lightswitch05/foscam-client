'use strict';
var express = require('express');
var version = require('./package.json').version;
var app = express();

app.use(express.static('docs/foscam-client/' + version));
app.listen(8080, function() {
    console.log('Listening at http://localhost:8080');
});
