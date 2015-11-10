'use strict';

var Foscam = require('./Foscam');

/**
 * setSystemTime
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set system time
 */
Foscam.prototype.setSystemTime = function() {
    this.notImplemented();
};

/**
 * getSystemTime
 * @desc Get system time.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSystemTime = function() {
    return this.get('getSystemTime');
};

/**
 * openInfraLed
 * @desc Force open infra led.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.openInfraLed = function() {
    return this.get('openInfraLed');
};

/**
 * closeInfraLed
 * @desc Force close infra led.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.closeInfraLed = function() {
    return this.get('closeInfraLed');
};

/**
 * getInfraLedConfig
 * @desc Get infra led config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getInfraLedConfig = function() {
    return this.get('getInfraLedConfig');
};

/**
 * setInfraLedConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set infra led config
 */
Foscam.prototype.setInfraLedConfig = function() {
    this.notImplemented();
};

/**
 * getScheduleInfraLedConfig
 * @desc Get config for infra led switch schedule.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getScheduleInfraLedConfig = function() {
    return this.get('getScheduleInfraLedConfig');
};

/**
 * setScheduleInfraLedConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set config for infra led switch schedule
 */
Foscam.prototype.setScheduleInfraLedConfig = function() {
    this.notImplemented();
};

/**
 * getDevState
 * @desc Get all device state.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getDevState = function() {
    return this.get('getDevState');
};

/**
 * getDevName
 * @desc Get camera name.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getDevName = function() {
    return this.get('getDevName');
};

/**
 * setDevName
 * @desc Set camera name.
 * @param {string} name Camera name.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setDevName = function(name) {
    return this.get('setDevName', {devName: name});
};

/**
 * getDevInfo
 * @desc Get camera information.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getDevInfo = function() {
    return this.get('getDevInfo');
};

/**
 * getProductModel
 * @desc Get camera model number.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductModel = function() {
    return this.get('getProductModel');
};

/**
 * getProductModelName
 * @desc Get camera model name.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductModelName = function() {
    return this.get('getProductModelName');
};

/**
 * getProductLanguage
 * @desc Get camera main language.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductLanguage = function() {
    return this.get('getProductLanguage');
};

/**
 * getProductSensorType
 * @desc Get camera sensor type number.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductSensorType = function() {
    return this.get('getProductSensorType');
};

/**
 * getProductWifiType
 * @desc Get camera wifi type number.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductWifiType = function() {
    return this.get('getProductWifiType');
};

/**
 * getProductSdFlag
 * @desc Whether camera support sd card.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductSdFlag = function() {
    return this.get('getProductSdFlag');
};

/**
 * getProductOutdoorFlag
 * @desc Whether camera is outdoor machine.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductOutdoorFlag = function() {
    return this.get('getProductOutdoorFlag');
};

/**
 * getProductPtFlag
 * @desc Whether camera is pt machine.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductPtFlag = function() {
    return this.get('getProductPtFlag');
};

/**
 * getProductZoomFlag
 * @desc Whether camera is zoom machine.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductZoomFlag = function() {
    return this.get('getProductZoomFlag');
};

/**
 * getProductRs485Flag
 * @desc Whether camera support rs485.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductRs485Flag = function() {
    return this.get('getProductRs485Flag');
};

/**
 * getProductIoAlarmFlag
 * @desc Whether camera support IO alarm.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductIoAlarmFlag = function() {
    return this.get('getProductIoAlarmFlag');
};

/**
 * getProductOnvifFlag
 * @desc Whether camera support Onvif.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductOnvifFlag = function() {
    return this.get('getProductOnvifFlag');
};

/**
 * getProductP2pFlag
 * @desc Whether camera support P2p.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductP2pFlag = function() {
    return this.get('getProductP2pFlag');
};

/**
 * getProductWpsFlag
 * @desc Whether camera support Wps.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductWpsFlag = function() {
    return this.get('getProductWpsFlag');
};

/**
 * getProductAudioFlag
 * @desc Whether camera support audio-speak.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductAudioFlag = function() {
    return this.get('getProductAudioFlag');
};

/**
 * getProductTalkFlag
 * @desc Whether camera support audio-talk.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductTalkFlag = function() {
    return this.get('getProductTalkFlag');
};

/**
 * getProductAppVer
 * @desc Get camera application version.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductAppVer = function() {
    return this.get('getProductAppVer');
};

/**
 * getProductAllInfo
 * @desc Get camera Information.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getProductAllInfo = function() {
    return this.get('getProductAllInfo');
};

/**
 * getGeneratePubKey
 * @desc Get public key generated by camera for software reset.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getGeneratePubKey = function() {
    return this.get('getGeneratePubKey');
};

/**
 * toolResetToFactory
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set camera reset to factory by software
 */
Foscam.prototype.toolResetToFactory = function() {
    this.notImplemented();
};
