var Foscam = require('./Foscam');

/**
 * getFirewallConfig
 * @desc Get firewall config
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getFirewallConfig = function() {
    return this.get('getFirewallConfig');
};

/**
 * setFirewallConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set firewall config
 */
Foscam.prototype.setFirewallConfig = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * getLog
 * @desc Get system log
 * @param {int} offset Where you want to start get log
 * @param {int} count How many logs you want to get, must less then 20
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getLog = function(offset, count) {
    var params = {
        offset: offset || 0,
        count: count || 20
    };

    return this.get('getLog', params);
};
