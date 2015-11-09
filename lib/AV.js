'use strict';

var Foscam = require('./Foscam');

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
 * @param {object} params
 * @param {int} params.streamType 0-3.
 * @param {int} params.resolution Resolution of stream type N.
 * @param {int} params.bitRate Bit rate of stream type N (20480~2097152).
 * @param {int} params.frameRate Frame rate of stream type N.
 * @param {int} params.GOP P frames between I frame of stream type N.
        The suggest value is: X * frameRate
 * @param {int} [params.isVBR] Not in use currently. Defaults to 0.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setVideoStreamParam = function(params) {
    if (typeof params.isVBR === 'undefined') {
        params.isVBR = 0;
    }

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
 * @param {object} params
 * @param {int} params.streamType 0-3.
 * @param {int} params.resolution Resolution of stream type N.
 * @param {int} params.bitRate Bit rate of stream type N (20480~2097152).
 * @param {int} params.frameRate Frame rate of stream type N.
 * @param {int} params.GOP P frames between I frame of stream type N.
 The suggest value is: X * frameRate
 * @param {int} [params.isVBR] Not in use currently. Defaults to 0.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSubVideoStreamParam = function(params) {
    if (typeof params.isVBR === 'undefined') {
        params.isVBR = 0;
    }

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
 * @param {object} params
 * @param {int} params.isEnableTimeStamp Time stamp will display on screen or not
 * @param {int} params.isEnableDevName Camera name will display on screen or not
 * @param {int} params.dispPosition OSD display position, currently can only be 0
 * @param {int} params.isEnableOSDMask Is OSD mask effective
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDSetting = function(params) {
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
 * @param {object} params
 * @param {int} params.isEnable Is enable motion detect alarm. 0 or 1.
 * @param {string} params.linkage Motion alarm linkage ( bit3 | bit2 | bit1 | bit0 ).
 *      - bit0: Ring
 *      - bit1: Send mail
 *      - bit2: Snap picture
 *      - bit3: Record
 * @param {int} params.snapInterval The interval time to snap picture again
 * @param {int} params.sensitivity Motion detect sensitivity.
 *      - 0: Low
 *      - 1: Normal
 *      - 2: High
 *      - 3: Lower
 *      - 4: Lowest
 * @param {int} params.triggerInterval The time of which motion detect alarm can trigger again
 *      when a motion detection has happened.
 * @param {Object} params.schedules The motion alaram schedule of one week, N = 0(Monday) ~6(Sunday)
 * @param {Object} params.areas The area info of row N
 * @example /cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&linkage=16&
 *      snapInterval=2&sensitivity=1&triggerInterval=5&schedule0=1023&schedule1=
 *      1023&schedule2=1023&schedule3=1023&schedule4=1023&schedule5=1023&
 *      schedule6=1023&area0=1023&area1=1023&area2=1023&area3=1023&area4=
 *      1023&area5=1023&area6=1023&area7=1023&area7=1023&area8=1023&area9=1023
 * @returns {Promise<object>} A promise to the response.
 * @todo Document format for schedules and areas
 */
Foscam.prototype.setMotionDetectConfig = function(params) {
    for (var property in params.schedules) {
        if (params.schedules.hasOwnProperty(property)) {
            params[property] = params.schedules[property];
        }
    }

    for (property in params.areas) {
        if (params.areas.hasOwnProperty(property)) {
            params[property] = params.areas[property];
        }
    }

    return this.get('setMotionDetectConfig', params);
};

/**
 * setLocalAlarmRecordConfig
 * @desc Set local alarm-record config
 * @param {object} params
 * @param {int} params.isEnableLocalAlarmRecord 0: Disable. 1: Enable.
 * @param {int} params.localAlarmRecordSecs Recording time.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setLocalAlarmRecordConfig = function(params) {
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
 * @param {object} params
 * @param {int} params.snapPicQuality 0: Low Quality. 1: Normal Quality. 2: High quality.
 * @param {int} params.saveLocation 0: Save to sd card. 1: Not in use now. 2: Upload to FTP.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSnapConfig = function(params) {
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
    throw {name: 'NotImplementedError', message: 'This function has not been implemented yet.'};
};

/**
 * snapPicture
 * @desc Manual snap picture. Picture resolution is the same as main stream resolutionnapPicture.
 * @returns {Promise<Object>} A promise to the response. We will return a html script directly.
 */
Foscam.prototype.snapPicture = function() {
    return this.getRaw(this.url, {qs: {cmd: 'snapPicture'}});
};

/**
 * snapPicture
 * @desc Manual snap picture. This command will return jpeg image data directly.
 * @returns {Promise<Object>} A promise to the response. jpeg image data directly.
 */
Foscam.prototype.snapPicture2 = function() {
    return this.getRaw(this.url, {qs: {cmd: 'snapPicture2'}});
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
 * @param {object} params
 * @param {int} params.isEnablePreRecord Preview record state
 * @param {int} params.preRecordSecs Preview record time
 * @param {int} params.alarmRecordSecs Alarm record time
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setAlarmRecordConfig = function(params) {
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
    throw {name: 'NotImplementedError', message: 'This function has not been implemented yet.'};
};

/**
 * setIOAlarmConfig
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Set IO alarm config
 */
Foscam.prototype.setScheduleRecordConfig = function() {
    throw {name: 'NotImplementedError', message: 'This function has not been implemented yet.'};
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
    throw {name: 'NotImplementedError', message: 'This function has not been implemented yet.'};
};

/**
 * delMultiDev
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete multiy device
 */
Foscam.prototype.delMultiDev = function() {
    throw {name: 'NotImplementedError', message: 'This function has not been implemented yet.'};
};
