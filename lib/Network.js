'use strict';

var Foscam = require('./Foscam');

/**
 * getIPInfo
 * @desc Get IP Info.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getIPInfo = function() {
    return this.get('getIPInfo');
};

/**
 * setIpInfo
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set IP Info
 */
Foscam.prototype.setIpInfo = function() {
    this.notImplemented();
};

/**
 * refreshWifiList
 * @desc Start scan the aps around.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.refreshWifiList = function() {
    return this.get('refreshWifiList');
};

/**
 * getWifiList
 * @desc Get the aps around after refreshWifiList.
 * @param {int} [startNo] The page number of wifilist to return.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getWifiList = function(startNo) {
    return this.get('getWifiList', {startNo: startNo || 0});
};

/**
 * setWifiSetting
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set wifi config
 */
Foscam.prototype.setWifiSetting = function() {
    this.notImplemented();
};

/**
 * getWifiConfig
 * @desc Get wifi config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getWifiConfig = function() {
    return this.get('getWifiConfig');
};

/**
 * getPortInfo
 * @desc Get ports of camera.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPortInfo = function() {
    return this.get('getPortInfo');
};

/**
 * setPortInfo
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set ports of camera
 */
Foscam.prototype.setPortInfo = function() {
    this.notImplemented();
};

/**
 * getUPnPConfig
 * @desc Get UpnP config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getUPnPConfig = function() {
    return this.get('getUPnPConfig');
};

/**
 * setUPnPConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set UpnP config
 */
Foscam.prototype.setUPnPConfig = function() {
    this.notImplemented();
};

/**
 * getDDNSConfig
 * @desc Get DDNS config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getDDNSConfig = function() {
    return this.get('getDDNSConfig');
};

/**
 * setDDNSConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set DDNS config
 */
Foscam.prototype.setDDNSConfig = function() {
    this.notImplemented();
};

/**
 * setFtpConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set FTP config
 */
Foscam.prototype.setFtpConfig = function() {
    this.notImplemented();
};

/**
 * getFtpConfig
 * @desc Get FTP config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getFtpConfig = function() {
    return this.get('getFtpConfig');
};

/**
 * testFtpServer
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Test FTP server
 */
Foscam.prototype.testFtpServer = function() {
    this.notImplemented();
};

/**
 * getSMTPConfig
 * @desc Get mail config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSMTPConfig = function() {
    return this.get('getSMTPConfig');
};

/**
 * setSMTPConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set mail config
 */
Foscam.prototype.setSMTPConfig = function() {
    this.notImplemented();
};

/**
 * smtpTest
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Test mail setting
 */
Foscam.prototype.smtpTest = function() {
    this.notImplemented();
};

/**
 * setP2PEnable
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set p2p status
 */
Foscam.prototype.setP2PEnable = function() {
    this.notImplemented();
};

/**
 * getP2PEnable
 * @desc Get p2p status.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getP2PEnable = function() {
    return this.get('getP2PEnable');
};

/**
 * setP2PPort
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set p2p port
 */
Foscam.prototype.setP2PPort = function() {
    this.notImplemented();
};

/**
 * getP2PPort
 * @desc Get p2p port.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getP2PPort = function() {
    return this.get('getP2PPort');
};

/**
 * getP2PInfo
 * @desc Get p2p UID.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getP2PInfo = function() {
    return this.get('getP2PInfo');
};

/**
 * getPPPoEConfig
 * @desc Get PPPoE config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPPPoEConfig = function() {
    return this.get('getPPPoEConfig');
};

/**
 * setPPPoEConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set PPPoE config
 */
Foscam.prototype.setPPPoEConfig = function() {
    this.notImplemented();
};
