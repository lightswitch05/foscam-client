var rp = require('request-promise');
var Q = require('q');
var xml2js = require('xml2js');

/**
 * Foscam Client SDK
 * @class
 * @param {string} username Username of a valid Foscam user.
 * @param {string} password Password of the Foscam user.
 * @param {string} host Host or IP address of the Foscam
 * @param {string} [port] Optional port to use. Defaults to 88.
 * @param {string} [protocol] Optional protocol to use. Defaults to http.
 * @constructor
 */
function Foscam(username, password, host, port, protocol) {
    this.username = username;
    this.password = password;
    this.address = host;
    this.port = port || 88;
    this.protocol = protocol || 'http';
    this.url = this.protocol + '://' + this.address + ':' + this.port + '/cgi-bin/CGIProxy.fcgi';
    rp = rp.defaults({
        qs: {
            'usr': this.username,
            'pwd': this.password
        }
    });
}

Foscam.prototype.get = function(command, params) {
    params = params ? params : {};
    params.cmd = command;

    return rp.get(this.url, {qs: params})
        .then( function(response) {
            return Foscam.parseResponse(response);
        });
};

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
