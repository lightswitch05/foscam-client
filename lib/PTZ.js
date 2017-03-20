'use strict';

var Foscam = require('./Foscam');

/**
 * ptzMoveUp
 * @desc Move up.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveUp = function() {
    return this.get('ptzMoveUp');
};

/**
 * ptzMoveDown
 * @desc Move down.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveDown = function() {
    return this.get('ptzMoveDown');
};

/**
 * ptzMoveLeft
 * @desc Move left.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveLeft = function() {
    return this.get('ptzMoveLeft');
};

/**
 * ptzMoveRight
 * @desc Move right.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveRight = function() {
    return this.get('ptzMoveRight');
};

/**
 * ptzMoveTopLeft
 * @desc Move to top left.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveTopLeft = function() {
    return this.get('ptzMoveTopLeft');
};

/**
 * ptzMoveTopRight
 * @desc Move to top right.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveTopRight = function() {
    return this.get('ptzMoveTopRight');
};

/**
 * ptzMoveBottomLeft
 * @desc Move to bottom left.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveBottomLeft = function() {
    return this.get('ptzMoveBottomLeft');
};

/**
 * ptzMoveBottomRight
 * @desc Move to bottom right.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzMoveBottomRight = function() {
    return this.get('ptzMoveBottomRight');
};

/**
 * ptzStopRun
 * @desc Stop run PT.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzStopRun = function() {
    return this.get('ptzStopRun');
};

/**
 * ptzReset
 * @desc Reset PT to default position.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzReset = function() {
    return this.get('ptzReset');
};

/**
 * getPTZSpeed
 * @desc Get the speed of PT.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPTZSpeed = function() {
    return this.get('getPTZSpeed');
};

/**
 * setPTZSpeed
 * @desc Set the speed of PT.
 * @param {int} speed
 *      0: Very slow
 *      1: Slow
 *      2: Normal speed
 *      3: Fast
 *      4: Very fast
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setPTZSpeed = function(speed) {
    return this.get('setPTZSpeed', {speed: speed});
};

/**
 * getPTZPresetPointList
 * @desc Get all preset point.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPTZPresetPointList = function() {
    return this.get('getPTZPresetPointList');
};

/**
 * ptzAddPresetPoint
 * @desc Add preset point
 * @param name 
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzAddPresetPoint = function(name) {
    return this.get('ptzAddPresetPoint',{name:name});
};

/**
 * ptzDeletePresetPoint
 * @desc Delete preset point by name
 * @param name 
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzDeletePresetPoint = function() {
    return this.get('ptzDeletePresetPoint',{name:name});
};

/**
 * ptzGotoPresetPoint
 * @desc Goto preset position.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzGotoPresetPoint = function(name) {
    return this.get('ptzGotoPresetPoint', {name: name});
};

/**
 * ptzGetCruiseMapList
 * @desc Get all cruise map list.
 *      Our device can support at most 8 cruise map.
 *      We have 2 maps default:Horizental/Vertical.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzGetCruiseMapList = function() {
    return this.get('ptzGetCruiseMapList');
};

/**
 * ptzGetCruiseMapInfo
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Get the detail info of a cruise map by name
 */
Foscam.prototype.ptzGetCruiseMapInfo = function() {
    this.notImplemented();
};

/**
 * ptzSetCruiseMap
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add a cruise map
 */
Foscam.prototype.ptzSetCruiseMap = function() {
    this.notImplemented();
};

/**
 * ptzDelCruiseMap
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete a cruise map
 */
Foscam.prototype.ptzDelCruiseMap = function() {
    this.notImplemented();
};

/**
 * ptzStartCruise
 * @desc Start a specificate cruise
 * @param {string} mapName Name of the cruise map
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzStartCruise = function(mapName) {
        return this.get('ptzStartCruise',{mapName:mapName});
};

/**
 * ptzStopCruise
 * @desc Start current cruise.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.ptzStopCruise = function() {
    return this.get('ptzStopCruise');
};

/**
 * setCruiseTime
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set time for continue cruise
 */
Foscam.prototype.setCruiseTime = function() {
    this.notImplemented();
};

/**
 * getCruiseTime
 * @desc Set time for continue cruise.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getCruiseTime = function() {
    return this.get('getCruiseTime');
};

/**
 * setCruiseTimeCustomed
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set time for continue cruise by costomer
 */
Foscam.prototype.setCruiseTimeCustomed = function() {
    this.notImplemented();
};

/**
 * getCruiseTimeCustomed
 * @desc Set time for continue cruise by costomer.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getCruiseTimeCustomed = function() {
    return this.get('getCruiseTimeCustomed');
};

/**
 * setCruiseLoopCnt
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set counts for continue cruise
 */
Foscam.prototype.setCruiseLoopCnt = function() {
    this.notImplemented();
};

/**
 * getCruiseLoopCnt
 * @desc Set counts for continue cruise.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getCruiseLoopCnt = function() {
    return this.get('getCruiseLoopCnt');
};

/**
 * setCruiseCtrlMode
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set control mode for continue cruise, by time or count
 */
Foscam.prototype.setCruiseCtrlMode = function() {
    this.notImplemented();
};

/**
 * getCruiseCtrlMode
 * @desc Get control mode for continue cruise, by time or count.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getCruiseCtrlMode = function() {
    return this.get('getCruiseCtrlMode');
};

/**
 * setCruisePrePointLingerTime
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set linger time for cruise,when pt arrive prepoint
 */
Foscam.prototype.setCruisePrePointLingerTime = function() {
    this.notImplemented();
};

/**
 * getCruisePrePointLingerTime
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Get linger time for cruise,when pt arrive prepoint
 */
Foscam.prototype.getCruisePrePointLingerTime = function() {
    this.notImplemented();
};

/**
 * zoomIn
 * @desc Zoom in.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.zoomIn = function() {
    return this.get('zoomIn');
};

/**
 * zoomOut
 * @desc Zoom out.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.zoomOut = function() {
    return this.get('zoomOut');
};

/**
 * zoomStop
 * @desc Stop zoom run.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.zoomStop = function() {
    return this.get('zoomStop');
};

/**
 * getZoomSpeed
 * @desc Get the speed of Zoom.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getZoomSpeed = function() {
    return this.get('getZoomSpeed');
};

/**
 * setZoomSpeed
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set the speed of PTZ
 */
Foscam.prototype.setZoomSpeed = function() {
    this.notImplemented();
};

/**
 * setPTZSelfTestMode
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set the selftest mode of PTZ
 */
Foscam.prototype.setPTZSelfTestMode = function() {
    this.notImplemented();
};

/**
 * getPTZSelfTestMode
 * @desc Get the selftest mode of PTZ.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPTZSelfTestMode = function() {
    return this.get('getPTZSelfTestMode');
};

/**
 * getPTZPrePointForSelfTest
 * @desc Get the presetpoint for selftest of PTZ.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPTZPrePointForSelfTest = function() {
    return this.get('getPTZPrePointForSelfTest');
};

/**
 * set485Info
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set informations of 485
 */
Foscam.prototype.setPTZPrePointForSelfTest = function() {
    this.notImplemented();
};

/**
 * get485Info
 * @desc Get informations of 485.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.get485Info = function() {
    return this.get('get485Info');
};

/**
 * set485Info
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Get informations of 485
 */
Foscam.prototype.set485Info = function() {
    this.notImplemented();
};
