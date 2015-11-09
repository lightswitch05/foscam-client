var rp = require('request-promise');
var Q = require('q');
var xml2js = require('xml2js');

/**
 * Foscam Client SDK
 * @class
 * @param {object} config
 * @param {string} config.username Username of a valid Foscam user.
 * @param {string} config.password Password of the Foscam user.
 * @param {string} config.host Host or IP address of the Foscam
 * @param {string} [config.port] Optional port to use. Defaults to 88.
 * @param {string} [config.protocol] Optional protocol to use. Defaults to http.
 * @constructor
 */
function Foscam(config) {
    if (!config) {
        throw new Error('no config was supplied');
    }

    this.username = config.username;
    this.password = config.password;
    this.address = config.host;
    this.port = config.port || 88;
    this.protocol = config.protocol || 'http';
    this.url = this.protocol + '://' + this.address + ':' + this.port + '/cgi-bin/CGIProxy.fcgi';
    rp = rp.defaults({
        qs: {
            'usr': this.username,
            'pwd': this.password
        }
    });
}

/**
 * get
 * @desc Sends an API request to the camera
 * @param {string} command CGI command to send
 * @param {object} [params] Params to include with the request
 * @returns {Promise}
 */
Foscam.prototype.get = function(command, params) {
    params = params ? params : {};
    params.cmd = command;

    return rp.get(this.url, {qs: params})
        .then( function(response) {
            return Foscam.parseResponse(response);
        });
};

/**
 * notImplemented
 * @desc Generic method to throw an error for API methods that haven't been implemented yet
 * @param  {string} message Custom error message
 * @private
 */
Foscam.prototype.notImplemented = function(message) {
    throw new Error('That method has not been implemented yet');
}

/**
 * parseResponse
 * @desc Parses the response from the camera API request
 * @param  {string} xml XML response
 * @return {Promise}
 */
Foscam.parseResponse = function(xml) {
    var deferred = Q.defer();
    var options = {
        valueProcessors: [ xml2js.processors.parseNumbers ],
        explicitArray: false
    };

    if (xml) {
        xml2js.parseString(xml, options, function (err, parsed) {
            if (!err && parsed) {
                if (parsed && parsed.CGI_Result) {
                    deferred.resolve(parsed.CGI_Result);
                } else {
                    deferred.resolve(parsed);
                }
            } else {
                deferred.resolve(xml);
            }
        });
    } else {
        deferred.resolve(xml)
    }

    return deferred.promise;
};

Foscam.numberToBoolean = function(object, property) {
    object[property] = object[property] === 1;
};

Foscam.booleanToNumber = function(bool) {
    return (bool === true) ? 1 : 0;
};

module.exports = Foscam;
