var Foscam = require('./lib/index');
var config = require('./configs');

var api = new Foscam(config.username, config.password, config.host);

api.getOSDSetting()
    .then(function(response) {
        console.log(response);
    });
