'use strict';

var request = require('request');
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
    this.rejectUnauthorizedCerts = 'rejectUnauthorizedCerts' in config ? config.rejectUnauthorizedCerts : true;
    this.baseUrl = this.protocol + '://' + this.address + ':' + this.port;
    this.url = this.baseUrl + '/cgi-bin/CGIProxy.fcgi';
    this.streamUrl = this.baseUrl + '/cgi-bin/CGIStream.cgi';
    this.rpClient = rp.defaults({
        rejectUnauthorized: this.rejectUnauthorizedCerts,
        qs: {
            usr: this.username,
            pwd: this.password
        }
    });
}

/**
 * get
 * @desc Sends an API request to the camera and parses the response.
 * @param {string} command CGI command to send
 * @param {object} [params] Params to include with the request
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.get = function(command, params) {
    return this.getRaw(command, params)
        .then(function(response) {
            return Foscam.parseResponse(response);
        });
};

/**
 * getRaw
 * @desc Sends an API request to the camera and returns the raw response.
 * @param {string} command CGI command to send.
 * @param {object} [params] Params to include with the request.
 * @param {object} [options] Additional options to pass to request-promise
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getRaw = function(command, params, options) {
    params = params ? params : {};
    params.cmd = command;

    options = options || {};
    options.qs = params;

    return this.rpClient.get(this.url, options);
};

Foscam.prototype.stream = function(command) {
    var options = {
        uri: this.streamUrl
    };

    options.qs = {
        cmd: command,
        usr: this.username,
        pwd: this.password
    };

    return request.get(options);
};

/**
 * notImplemented
 * @desc Generic method to throw an error for API methods that haven't been implemented yet
 * @private
 */
Foscam.prototype.notImplemented = function() {
    throw new Error('That method has not been implemented yet');
};

/**
 * parseResponse
 * @desc Parses the response from the camera API request
 * @param  {string} xml XML response
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.parseResponse = function(xml) {
    var deferred = Q.defer();
    var options = {
        valueProcessors: [this.parseNumbers],
        explicitArray: false
    };

    if (xml) {
        xml2js.parseString(xml, options, function(err, parsed) {
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
        deferred.resolve(xml);
    }

    return deferred.promise;
};

Foscam.numberToBoolean = function(object, property) {
    // Don't set the property if is doesn't already exist
    if (object && property && object.hasOwnProperty(property)) {
        // Only convert 1 and 0 - ignore other numbers.
        if (object[property] === 1) {
            object[property] = true;
        } else if (object[property] === 0) {
            object[property] = false;
        }
    }
};

Foscam.booleanToNumber = function(bool, defaultValue) {
    if (bool === true || bool === false) {
        bool = bool === true ? 1 : 0;
    } else if (arguments.length > 1) {
        bool = defaultValue;
    }
    return bool;
};

Foscam.parseNumbers = function(str) {
    if (str && !isNaN(str) && str.toUpperCase().indexOf('E') < 0) {
        str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
};

module.exports = Foscam;
