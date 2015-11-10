'use strict';

var Foscam = require('./lib/index');
var config = require('./configs');

var api = new Foscam(config);

api.getOSDSetting()
    .then(function(response) {
        console.log(response);
    });
