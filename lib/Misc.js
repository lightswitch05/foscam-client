'use strict';

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
    this.notImplemented();
};

/**
 * getLog
 * @desc Get system log
 * @param {Object} [params] Params for pagination.
 * @param {int} [params.offset] Where you want to start get log.
 * @param {int} [params.count] How many logs you want to get, must 20 or less.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getLog = function(params) {
    params = params || {};
    params.count = params.count || 20;
    params.offset = params.offset || 0;

    return this.get('getLog', params);
};
