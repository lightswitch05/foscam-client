/**
 * @author Daniel White <daniel@developerdan.com>
 * @version 0.0.1
 * @desc Foscam client for the FI9831P
 * @module Foscam
 * @license MIT
 */

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

/**
 * getImageSetting
 * @desc Get color attribute of video.
 * @returns {Promise<{brightness: int}>} A promise to the response.
 */
Foscam.prototype.getImageSetting = function() {
    return this.get('getImageSetting');
};

/**
 * setBrightness
 * @param {int} level New level of brightness. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setBrightness = function(level) {
    return this.get('setBrightness', {
        brightness: level
    });
};

/**
 * setContrast
 * @param {int} level New level of contrast. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setContrast = function(level) {
    return this.get('setContrast', {
        contrast: level
    });
};

/**
 * setHue
 * @param {int} level New level of hue. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setHue = function(level) {
    return this.get('setHue', {
        hue: level
    });
};

/**
 * setSaturation
 * @param {int} level New level of saturation. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSaturation = function(level) {
    return this.get('setSaturation', {
        saturation: level
    });
};

/**
 * setSharpness
 * @param {int} level New level of sharpness. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSharpness = function(level) {
    return this.get('setSharpness', {
        sharpness: level
    });
};

/**
 * resetImageSetting
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.resetImageSetting = function() {
    return this.get('resetImageSetting');
};

/**
 * getMirrorAndFlipSetting
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getMirrorAndFlipSetting = function() {
    return this.get('getMirrorAndFlipSetting').then(
        function(response) {
            Foscam.numberToBoolean(response, 'isMirror');
            Foscam.numberToBoolean(response, 'isFlip');

            return response;
        }
    );
};

/**
 * mirrorVideo
 * @param {boolean} isMirror If mirror should be set or not.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.mirrorVideo = function(isMirror) {
    return this.get('mirrorVideo', {
        isMirror: Foscam.booleanToNumber(isMirror)
    });
};

/**
 * flipVideo
 * @param {boolean} isFlip If flip should be set or not.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.flipVideo = function(isFlip) {
    return this.get('flipVideo', {
        isFlip: Foscam.booleanToNumber(isFlip)
    });
};

/**
 * getRatio
 * @desc Get value for image distortion correction
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getRatio = function() {
    return this.get('getRatio');
};

/**
 * setRatio
 * @desc Set value for image distortion correction
 * @param {int} ratio 0-511. Three ranks, High:0-150. Middle:151-430. Low:431-511. Default, Middle.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setRatio = function(ratio) {
    return this.get('setRatio', {ratio: ratio});
};

/**
 * getH264FrameReferenceMode
 * @desc Get frame shipping reference mode of H264 encode stream.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getH264FrameReferenceMode = function() {
    return this.get('getH264FrmRefMode');
};

/**
 * setH264FrameReferenceMode
 * @desc Set frame shipping reference mode of H264 encode stream.
 * @param {int} mode 1 or 0.
 *      0 for 'Normal reference mode'.
 *      1 for 'Two frames are separated by four skipping frames'.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setH264FrameReferenceMode = function(mode) {
    return this.get('setH264FrmRefMode', {mode: mode});
};

/**
 * getScheduleRecordStreamChannel
 * @desc Get stream channel for schedule record.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getScheduleRecordStreamChannel = function() {
    return this.get('getScheduleRecordStreamChn');
};

/**
 * setScheduleRecordStreamChannel
 * @desc Set stream channel for schedule record.
 * @param {int} channel 1 or 0. 0 for 'Main Stream'. 1 for 'Sub Stream'.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setScheduleRecordStreamChannel = function(channel) {
    return this.get('setScheduleRecordStreamChn', {cnl: channel});
};

/**
 * setPowerFrequency
 * @desc Set power freq of sensor.
 * @param {int} frequency 1 or 0. 0 for '60HZ'. 1 for '50HZ'.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setPowerFrequency = function(frequency) {
    return this.get('setPwrFreq', {feq: frequency});
};

/**
 * getVideoStreamParam
 * @desc Get video stream param.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getVideoStreamParam = function() {
    return this.get('getVideoStreamParam');
};

/**
 * setVideoStreamParam
 * @desc Set the video stream param of stream N
 * @param {int} streamType 0-3.
 * @param {int} resolution Resolution of stream type N.
 * @param {int} bitRate Bit rate of stream type N (20480~2097152).
 * @param {int} frameRate Frame rate of stream type N.
 * @param {int} GOP P frames between I frame of stream type N.
        The suggest value is: X * frameRate
 * @param {int} [isVBR] Not in use currently. Defaults to 0.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setVideoStreamParam = function(streamType, resolution, bitRate, frameRate, GOP, isVBR) {
    var params = {
        streamType: streamType,
        resolution: resolution,
        bitRate: bitRate,
        frameRate: frameRate,
        GOP: GOP,
        isVBR: isVBR || 0
    };

    return this.get('setVideoStreamParam', params);
};

/**
 * getSubVideoStreamParam
 * @desc Get sub video stream param.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSubVideoStreamParam = function() {
    return this.get('getVideoStreamParam');
};

/**
 * setSubVideoStreamParam
 * @desc Set the sub video stream param of stream N
 * @param {int} streamType 0-3.
 * @param {int} resolution Resolution of stream type N.
 * @param {int} bitRate Bit rate of stream type N (20480~2097152).
 * @param {int} frameRate Frame rate of stream type N.
 * @param {int} GOP P frames between I frame of stream type N.
 The suggest value is: X * frameRate
 * @param {int} isVBR Not in use currently. Defaults to 0.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSubVideoStreamParam = function(streamType, resolution, bitRate, frameRate, GOP, isVBR) {
    var params = {
        streamType: streamType,
        resolution: resolution,
        bitRate: bitRate,
        frameRate: frameRate,
        GOP: GOP,
        isVBR: isVBR || 0
    };

    return this.get('setSubVideoStreamParam', params);
};

/**
 * getMainVideoStreamType
 * @desc Get the stream type of main stream.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getMainVideoStreamType = function() {
    return this.get('getMainVideoStreamType');
};

/**
 * getSubVideoStreamType
 * @desc Get the stream type of sub stream.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSubVideoStreamType = function() {
    return this.get('getSubVideoStreamType');
};

/**
 * setMainVideoStreamType
 * @desc Set the stream type of main stream.
 * @param {int} streamType The stream type 0~3.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setMainVideoStreamType = function(streamType) {
    return this.get('setMainVideoStreamType', {streamType: streamType});
};

/**
 * setSubStreamFormat
 * @desc Set the stream format of sub stream.
 *      Our device can only support 2 streams:Main stream for PC access and Sub
 *      stream for mobile access, but someone need a MJ stream to embed their
 *      camera into a webpage, in this case, we should set sub stream format to Motion
 *      Jpeg, and then you can get MJ stream by command:
 *      /cgi-bin/CGIStream.cgi?cmd=GetMJStream, but when you login as a sub stream
 *      user, the stream data will be same as main stream.
 * @param {int} format 0: H264. 1: MotionJpeg
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSubStreamFormat = function(format) {
    return this.get('setMainVideoStreamType', {format: format});
};

/**
 * getMJStream
 * @desc Get motion jpeg stream.
 *      <ol>
 *      <li>Motion jpeg stream data is returned from http server by a serverpush mode</li>
 *      <li>MJ stream is VGA resolution @ 15fps</li>
 *      <li>For some version of Firefox browse, the Firefox will crash when use
 *      “GetMJStream” CGI to get mjstream long time. This problem is due to the
 *      browse has some defects, it can not parse data correctly and directly. In
 *      order to fix this problem, we should as follows:
 *      <ul>
 *          <li>Create a .html empty document, such as “MJ.html”.</li>
 *          <li>Input the content into you .txt document, as follows:
 *      <pre><code>
 *          &lt;html&gt;&lt;body&gt;
 *              &lt;img src=&quot;http://example.com:99/cgi-bin/CGIStream.cgi?cmd=GetMJStream&amp;usr=admin&amp;pwd=&quot; /&gt;
 *          &lt;/body&gt;&lt;/html&gt;
 *      </code></pre></li>
 *      </ul></li></ol>
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getMJStream = function() {
    return this.get('GetMJStream');
};

/**
 * getOSDSetting
 * @desc Get OSD config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getOSDSetting = function() {
    return this.get('getOSDSetting').then(
        function(response) {
            Foscam.numberToBoolean(response, 'isEnableTimeStamp');
            Foscam.numberToBoolean(response, 'isEnableDevName');
            Foscam.numberToBoolean(response, 'isEnableOSDMask');
            return response;
        }
    );
};

/**
 * setOSDSetting
 * @desc Set OSD config.
 * @param {int} isEnableTimeStamp Time stamp will display on screen or not
 * @param {int} isEnableDevName Camera name will display on screen or not
 * @param {int} dispPosition OSD display position, currently can only be 0
 * @param {int} isEnableOSDMask Is OSD mask effective
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDSetting = function(isEnableTimeStamp, isEnableDevName, dispPosition, isEnableOSDMask) {
    var params = {
        isEnableTimeStamp: isEnableTimeStamp,
        isEnableDevName: isEnableDevName,
        dispPos: dispPosition,
        isEnableOSDMask: isEnableOSDMask
    };

    return this.get('setOSDSetting', params);
};

/**
 * getOSDMaskArea
 * @desc Get OSD mask area info. Our device can only support 4 mask areas.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getOSDMaskArea = function() {
    return this.get('getOsdMaskArea');
};

/**
 * setOSDMaskArea
 * @desc Set OSD mask area info. Our device can only support 4 mask areas.
 * @param {Object} params
 *      x1_N: The top left X position of mask N
 *      y1_N: The top left Y position of mask N
 *      x2_N: The bottom right X position of mask N
 *      y2_N: The bottom right Y position of mask N
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDMaskArea = function(params) {
    return this.get('setOsdMaskArea', params);
};

/**
 * getOSDMask
 * @desc Get OSD mask status.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getOSDMask = function() {
    return this.get('getOSDMask');
};

/**
 * setOSDMask
 * @desc Set OSD mask status.
 * @param isEnabledOSDMask 0: Disable, 1: Enable
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDMask = function(isEnabledOSDMask) {
    return this.get('setOSDMask', {isEnabledOSDMask: isEnabledOSDMask});
};

/**
 * getMotionDetectConfig
 * @desc Get motion detect config.
 *      - Video region is divided into 10*10 sub areasideo region is divided into 10*10 sub areas
 *      - The min unit of schedule is half an hour, scheduleN value range 2N -1(N[0-48])
 *      - areaN value 2N -1(N[0-10])
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getMotionDetectConfig = function() {
    return this.get('getMotionDetectConfig');
};

/**
 * setMotionDetectConfig
 * @desc Set motion detect config
 *      - Video region is divided into 10*10 sub areasideo region is divided into 10*10 sub areas
 *      - The min unit of schedule is half an hour, scheduleN value range 2N -1(N[0-48])
 *      - areaN value 2N -1(N[0-10])
 * @param {int} isEnable Is enable motion detect alarm. 0 or 1.
 * @param {string} linkage Motion alarm linkage ( bit3 | bit2 | bit1 | bit0 ).
 *      - bit0: Ring
 *      - bit1: Send mail
 *      - bit2: Snap picture
 *      - bit3: Record
 * @param {int} snapInterval The interval time to snap picture again
 * @param {int} sensitivity Motion detect sensitivity.
 *      - 0: Low
 *      - 1: Normal
 *      - 2: High
 *      - 3: Lower
 *      - 4: Lowest
 * @param {int} triggerInterval The time of which motion detect alarm can trigger again
 *      when a motion detection has happened.
 * @param {Object} schedules The motion alaram schedule of one week, N = 0(Monday) ~6(Sunday)
 * @param {Object} areas The area info of row N
 * @example /cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&linkage=16&
 *      snapInterval=2&sensitivity=1&triggerInterval=5&schedule0=1023&schedule1=
 *      1023&schedule2=1023&schedule3=1023&schedule4=1023&schedule5=1023&
 *      schedule6=1023&area0=1023&area1=1023&area2=1023&area3=1023&area4=
 *      1023&area5=1023&area6=1023&area7=1023&area7=1023&area8=1023&area9=1023
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setMotionDetectConfig = function(isEnable, linkage, snapInterval, sensitivity, triggerInterval, schedules, areas) {
    var params = {
        isEnable: isEnable,
        linkage: linkage,
        snapInterval: snapInterval,
        sensitivity: sensitivity,
        triggerInterval: triggerInterval
    };

    for (var property in schedules) {
        if (schedules.hasOwnProperty(property)) {
            params[property] = schedules[property];
        }
    }

    for (property in areas) {
        if (areas.hasOwnProperty(property)) {
            params[property] = areas[property];
        }
    }

    return this.get('setMotionDetectConfig', params);
};

/**
 * setLocalAlarmRecordConfig
 * @desc Set local alarm-record config
 * @param {int} isEnableLocalAlarmRecord. 0: Disable. 1: Enable.
 * @param {int} localAlarmRecordSecs Recording time.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setLocalAlarmRecordConfig = function(isEnableLocalAlarmRecord, localAlarmRecordSecs) {
    var params = {
        isEnableLocalAlarmRecord: isEnableLocalAlarmRecord,
        localAlarmRecordSecs: localAlarmRecordSecs
    };

    return this.get('setLocalAlarmRecordConfig', params);
};

/**
 * getLocalAlarmRecordConfig
 * @desc Get local alarm-record config
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getLocalAlarmRecordConfig = function() {
    return this.get('getLocalAlarmRecordConfig');
};

/**
 * getSnapConfig
 * @desc Get snap config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSnapConfig = function() {
    return this.get('getSnapConfig');
};

/**
 * setSnapConfig
 * @desc Set snap config.
 * @param {int} snapPicQuality. 0: Low Quality. 1: Normal Quality. 2: High quality.
 * @param {int} saveLocation. 0: Save to sd card. 1: Not in use now. 2: Upload to FTP.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSnapConfig = function(snapPicQuality, saveLocation) {
    var params = {
        snapPicQuality: snapPicQuality,
        saveLocation: saveLocation
    };

    return this.get('setSnapConfig', params);
};

/**
 * getScheduleSnapConfig
 * @desc Get schedule snap config. The min unit of schedule is half an hour, scheduleN value range 2N -1(N[0-48])
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getScheduleSnapConfig = function() {
    return this.get('getScheduleSnapConfig');
};

/**
 * setScheduleSnapConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set schedule snap config
 */
Foscam.prototype.setScheduleSnapConfig = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * snapPicture
 * @desc Manual snap picture. Picture resolution is the same as main stream resolutionnapPicture.
 * @returns {Promise<Object>} A promise to the response. We will return a html script directly.
 */
Foscam.prototype.snapPicture = function() {
    return rp.get(this.url, {qs: {cmd: 'snapPicture'}});
};

/**
 * snapPicture
 * @desc Manual snap picture. This command will return jpeg image data directly.
 * @returns {Promise<Object>} A promise to the response. jpeg image data directly.
 */
Foscam.prototype.snapPicture2 = function() {
    return rp.get(this.url, {qs: {cmd: 'snapPicture2'}});
};

/**
 * getRecordList
 * @desc Get record list.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getRecordList = function() {
    return this.get('getRecordList');
};

/**
 * getRecordList2
 * @desc Get record list.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getRecordList2 = function() {
    return this.get('getRecordList2');
};

/**
 * getAlarmRecordConfig
 * @desc Get alarm record config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getRecordList2 = function() {
    return this.get('getAlarmRecordConfig');
};

/**
 * reloadRecordindex
 * @desc Synchronization of record index for Play.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.reloadRecordindex = function() {
    return this.get('reloadRecordindex');
};

/**
 * getAlarmRecordConfig
 * @desc Get alarm record config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getAlarmRecordConfig = function() {
    return this.get('getAlarmRecordConfig');
};

/**
 * setAlarmRecordConfig
 * @desc Set alarm record config
 * @param {int} isEnablePreRecord Preview record state
 * @param {int} preRecordSecs Preview record time
 * @param {int} alarmRecordSecs Alarm record time
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setAlarmRecordConfig = function(isEnablePreRecord, preRecordSecs, alarmRecordSecs) {
    var params = {
        isEnablePreRecord: isEnablePreRecord,
        preRecordSecs: preRecordSecs,
        alarmRecordSecs: alarmRecordSecs
    };

    return this.get('setAlarmRecordConfig', params);
};

/**
 * getRecordPath
 * @desc Get record path for storage.
 * @returns {Promise<object>} A promise to the response.
 *      path: 0-SD card, 2-FTP server
 *      free: The free capacity of storage device
 *      total: The total capacity of storage device
 */
Foscam.prototype.getRecordPath = function() {
    return this.get('getRecordPath');
};

/**
 * getScheduleRecordConfig
 * @desc Get config for schedule recording.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getScheduleRecordConfig = function() {
    return this.get('getScheduleRecordConfig');
};

/**
 * setScheduleRecordConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set schedule recordconfig
 */
Foscam.prototype.setScheduleRecordConfig = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * setIOAlarmConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set IO alarm config
 */
Foscam.prototype.setScheduleRecordConfig = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * getIOAlarmConfig
 * @desc Get IO alarm config.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getIOAlarmConfig = function() {
    return this.get('getIOAlarmConfig');
};

/**
 * clearIOAlarmOutput
 * @desc Clean IO alarm output.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.clearIOAlarmOutput = function() {
    return this.get('clearIOAlarmOutput');
};

/**
 * setPCAudioAlarmCfg
 * @desc Set audio alarm config for PC（web live video.
 * @param {int} isEnablePCAudioAlarm Enable state
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setPCAudioAlarmCfg = function(isEnablePCAudioAlarm) {
    return this.get('setPCAudioAlarmCfg', {isEnablePCAudioAlarm: isEnablePCAudioAlarm});
};

/**
 * getPCAudioAlarmCfg
 * @desc Get audio alarm config for PC（web live video）.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getPCAudioAlarmCfg = function() {
    return this.get('getPCAudioAlarmCfg');
};

/**
 * getMultiDevList
 * @desc Get multi device list.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getMultiDevList = function() {
    return this.get('getMultiDevList');
};

/**
 * getMultiDevDetailInfo
 * @desc Get multi device information.
 * @param {int} channel Channel no
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getMultiDevDetailInfo = function(channel) {
    return this.get('getMultiDevDetailInfo', {cnnl: channel});
};

/**
 * addMultiDev
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add multiy device
 */
Foscam.prototype.addMultiDev = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * delMultiDev
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete multiy device
 */
Foscam.prototype.delMultiDev = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * addAccount
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add user account
 */
Foscam.prototype.addAccount = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * delAccount
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete user account
 */
Foscam.prototype.delAccount = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * changePassword
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Change password
 */
Foscam.prototype.changePassword = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * changeUserName
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Change user name
 */
Foscam.prototype.changeUserName = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * changeUserNameAndPwdTogether
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Change user name and password together
 */
Foscam.prototype.changeUserNameAndPwdTogether = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * logIn
 * @desc User log in to camera.
 * @param {string} [username] Username to login. Defaults to username supplied at api initialization.
 * @param {string} [password] Password of user to login. Defaults to password supplied at api initialization.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.logIn = function(username, password) {
    var params = {
        userName: username || this.username,
        pwd: password || this.password
    };

    return this.get('logIn', params);
};

/**
 * logOut
 * @desc User log out to camera.
 * @param {string} [username] Username to login. Defaults to username supplied at api initialization.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.logOut = function(username) {
    var params = {
        userName: username || this.username
    };

    return this.get('logOut', params);
};

/**
 * getSessionList
 * @desc Get current session list of the camera.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSessionList = function() {
    return this.get('getSessionList');
};

/**
 * getUserList
 * @desc Get user account list of the camera.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getUserList = function() {
    return this.get('getUserList');
};

/**
 * usrBeatHeart
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc user checks connection with camera
 */
Foscam.prototype.usrBeatHeart = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

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
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add preset point
 */
Foscam.prototype.ptzAddPresetPoint = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * ptzDeletePresetPoint
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete preset point by name
 */
Foscam.prototype.ptzDeletePresetPoint = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * ptzSetCruiseMap
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add a cruise map
 */
Foscam.prototype.ptzSetCruiseMap = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * ptzDelCruiseMap
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete a cruise map
 */
Foscam.prototype.ptzDelCruiseMap = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * ptzStartCruise
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Start a specificate cruisep
 */
Foscam.prototype.ptzStartCruise = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * getCruisePrePointLingerTime
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Get linger time for cruise,when pt arrive prepoint
 */
Foscam.prototype.getCruisePrePointLingerTime = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * setPTZSelfTestMode
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set the selftest mode of PTZ
 */
Foscam.prototype.setPTZSelfTestMode = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
 * setPTZPrePointForSelfTest
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set presetpoint for selftest of PTZ
 */
Foscam.prototype.setPTZPrePointForSelfTest = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
 * @param {int} startNo The page number of wifilist to return.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getWifiList = function(startNo) {
    return this.get('getWifiList', {startNo:  startNo || 0});
};

/**
 * setWifiSetting
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set wifi config
 */
Foscam.prototype.setWifiSetting = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * setFtpConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set FTP config
 */
Foscam.prototype.setFtpConfig = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * smtpTest
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Test mail setting
 */
Foscam.prototype.smtpTest = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * setP2PEnable
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set p2p status
 */
Foscam.prototype.setP2PEnable = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * setSystemTime
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set system time
 */
Foscam.prototype.setSystemTime = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

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
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

/**
 * fwUpgrade
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Upgrade firmware
 */
Foscam.prototype.fwUpgrade = function() {
    throw {name : "NotImplementedError", message : "This function hasn't been implemented yet."};
};

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