'use strict';

var Foscam = require('./Foscam');

/**
 * rebootSystem
 * @desc Reboot camera.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.rebootSystem = function() {
    return this.get('rebootSystem');
};

/**
 * restoreToFactorySetting
 * @desc Restore to factory setting.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.restoreToFactorySetting = function() {
    return this.get('restoreToFactorySetting');
};

/**
 * exportConfig
 * @desc Export config file. After call this command,
 *      you can get the config file by visit the following addr:/configs/export/configs.bin
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.exportConfig = function() {
    return this.get('exportConfig');
};

/**
 * importConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Import config file
 */
Foscam.prototype.importConfig = function() {
    this.notImplemented();
};

/**
 * fwUpgrade
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Upgrade firmware
 */
Foscam.prototype.fwUpgrade = function() {
    this.notImplemented();
};
