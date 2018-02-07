'use strict';

var Foscam = require('./Foscam');

/**
 * @typedef Foscam.getImageSettingResponse
 * @property {int} brightness 0-100.
 * @property {int} contrast 0-100.
 * @property {int} hue 0-100.
 * @property {int} saturation 0-100.
 * @property {int} sharpness 0-100.
 * @property {int} denoiseLevel Not in use.
 */

/**
 * getImageSetting
 * @desc Get color attribute of video.
 * @returns {Promise<Foscam.getImageSettingResponse>} a promise to {@link Foscam.getImageSettingResponse}.
 */
Foscam.prototype.getImageSetting = function() {
    return this.get('getImageSetting');
};

/**
 * setBrightness
 * @desc Set brightness of video.
 * @param {int} brightness New level of brightness. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setBrightness = function(brightness) {
    return this.get('setBrightness', {
        brightness: brightness
    });
};

/**
 * setContrast
 * @desc Set contrast of video.
 * @param {int} contrast New level of contrast. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setContrast = function(contrast) {
    return this.get('setContrast', {
        constrast: contrast // Not a typo, the API expects `constrast`.
    });
};

/**
 * setHue
 * @desc Set hue of video.
 * @param {int} hue New level of hue. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setHue = function(hue) {
    return this.get('setHue', {
        hue: hue
    });
};

/**
 * setSaturation
 * @desc Set saturation of video
 * @param {int} saturation New level of saturation. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSaturation = function(saturation) {
    return this.get('setSaturation', {
        saturation: saturation
    });
};

/**
 * setSharpness
 * @desc Set sharpness of video.
 * @param {int} sharpness New level of sharpness. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSharpness = function(sharpness) {
    return this.get('setSharpness', {
        sharpness: sharpness
    });
};

/**
 * setDenoiseLevel
 * @desc Set DenoiseLevel of video. Not in use.
 * @param {int} level New level of denoise. Between 1-100.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setDenoiseLevel = function(level) {
    return this.get('setDenoiseLevel', {
        level: level
    });
};

/**
 * resetImageSetting
 * @desc Reset color parameters to default value.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.resetImageSetting = function() {
    return this.get('resetImageSetting');
};

/**
 * @typedef Foscam.getMirrorAndFlipSettingResponse
 * @property {boolean} isMirror If the image or mirrored or not.
 * @property {boolean} isFlip If the image is flipped or not.
 */

/**
 * getMirrorAndFlipSetting
 * @desc Get mirror and flip attribute of video.
 * @returns {Promise<Foscam.getMirrorAndFlipSettingResponse>} A promise to the response.
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
 * @desc Set mirror video setting.
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
 * @desc Set flip video setting.
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
 * @desc Get value for image distortion correction.
 * @returns {Promise<{ratio: int}>} A promise to the response.
 *  Three ranks for image distortion correction:
 *    - High: 150
 *    - Middle 210
 *    - Low: 430
 */
Foscam.prototype.getRatio = function() {
    return this.get('getRatio');
};

/**
 * setRatio
 * @desc Set value for image distortion correction
 * @param {int} ratio 0-511. Three ranks:
 *   - High: 0-150
 *   - Middle (default): 151-430.
 *   - Low:431-511.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setRatio = function(ratio) {
    return this.get('setRatio', {ratio: ratio});
};

/**
 * getH264FrameReferenceMode
 * @desc Get frame shipping reference mode of H264 encode stream.
 * @returns {Promise<{mode: int}>} A promise to the response.
 *   - 0: Normal reference mode
 *   - 1: Two frames are separated by four skipping frames
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
 * @returns {Promise<{chn: int}>} A promise to the response.
 *   - 0: main stream
 *   - 1: sub stream
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
    return this.get('setScheduleRecordStreamChn', {chn: channel});
};

/**
 * setPowerFrequency
 * @desc Set power freq of sensor.
 * @param {int} frequency 1 or 0. 0 for '60HZ'. 1 for '50HZ'. 2 for 'outdoor mode'
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setPowerFrequency = function(frequency) {
    return this.get('setPwrFreq', {freq: frequency});
};

/**
 * @typedef Foscam.videoStreamParamResponse
 * @desc N means streamType [0~3]
 * @property {int} resolutionN Resolution of stream type N.
 * @property {int} bitRateN Bit rate of stream type N (20480~2097152)
 * @property {int} frameRateN Frame rate of stream type N
 * @property {int} GOPN P frames between I frame of stream type N
 * @property {boolean} isVBRN Change bit rate of stream true-yes false-nosetSubVideoStreamParam
 */

/**
 * getVideoStreamParam
 * @desc Get video stream param.
 * @returns {Promise<Foscam.videoStreamParamResponse>} A promise to the response.
 */
Foscam.prototype.getVideoStreamParam = function() {
    return this.get('getVideoStreamParam').then(function(response) {
        Foscam.numberToBoolean(response, 'isVBR0');
        Foscam.numberToBoolean(response, 'isVBR1');
        Foscam.numberToBoolean(response, 'isVBR2');
        Foscam.numberToBoolean(response, 'isVBR3');
        return response;
    });
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
 * @param {boolean} [params.isVBR] Change bit rate of stream type. Defaults to false.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setVideoStreamParam = function(params) {
    params = params || {};
    params.isVBR = Foscam.booleanToNumber(params.isVBR, 0);

    return this.get('setVideoStreamParam', params);
};

/**
 * getSubVideoStreamParam
 * @desc Get sub video stream param.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSubVideoStreamParam = function() {
    return this.get('getSubVideoStreamParam');
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
 *  The suggest value is: X * frameRate
 * @param {boolean} [params.isVBR] Not in use currently. Defaults to false.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSubVideoStreamParam = function(params) {
    params = params || {};
    if (typeof params.isVBR === 'undefined') {
        params.isVBR = 0;
    } else {
        params.isVBR = Foscam.booleanToNumber(params.isVBR);
    }

    return this.get('setSubVideoStreamParam', params);
};

/**
 * getMainVideoStreamType
 * @desc Get the stream type of main stream.
 * @returns {Promise<{streamType: int}>} A promise to the response.
 */
Foscam.prototype.getMainVideoStreamType = function() {
    return this.get('getMainVideoStreamType');
};

/**
 * getSubVideoStreamType
 * @desc Get the stream type of sub stream.
 * @returns {Promise<{streamType: int}>} A promise to the response.
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
    return this.get('setSubStreamFormat', {format: format});
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
    return this.stream('GetMJStream');
};

/**
 * @typedef Foscam.getOSDSetting
 * @property {boolean} isEnableTimeStamp Time stamp will display on screen or not.
 * @property {boolean} isEnableDevName Camera name will display on screen or not
 * @property {int} dispPos OSD display position, currently can only be 0
 * @property {boolean} isEnableOSDMask Is OSD mask effective.
 */

/**
 * getOSDSetting
 * @desc Get OSD config.
 * @returns {Promise<Foscam.getOSDSetting>} A promise to the response.
 */
Foscam.prototype.getOSDSetting = function() {
    return this.get('getOSDSetting').then(
        function(response) {
            Foscam.numberToBoolean(response, 'isEnableTimeStamp');
            Foscam.numberToBoolean(response, 'isEnableDevName');
            Foscam.numberToBoolean(response, 'isEnableOSDMask');
            Foscam.numberToBoolean(response, 'isEnableTempAndHumid');
            return response;
        }
    );
};

/**
 * setOSDSetting
 * @desc Set OSD config.
 * @param {Foscam.getOSDSetting} params
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDSetting = function(params) {
    params = params || {};
    params.isEnableTimeStamp = Foscam.booleanToNumber(params.isEnableTimeStamp);
    params.isEnableDevName = Foscam.booleanToNumber(params.isEnableDevName);
    params.isEnableOSDMask = Foscam.booleanToNumber(params.isEnableOSDMask);
    return this.get('setOSDSetting', params);
};

/**
 * @typedef Foscam.getOSDMaskArea
 * @property {int} x1_N The top left X position of mask N
 * @property {int} y1_N The top left Y position of mask N
 * @property {int} x2_N The bottom right X position of mask N
 * @property {int} y2_N The bottom right Y position of mask N
 */

/**
 * getOSDMaskArea
 * @desc Get OSD mask area info. Our device can only support 4 mask areas.
 * @returns {Promise<Foscam.getOSDMaskArea>} A promise to the response.
 */
Foscam.prototype.getOSDMaskArea = function() {
    return this.get('getOsdMaskArea');
};

/**
 * setOSDMaskArea
 * @desc Set OSD mask area info. Our device can only support 4 mask areas.
 * @param {Foscam.getOSDMaskArea} params
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDMaskArea = function(params) {
    return this.get('setOsdMaskArea', params);
};

/**
 * Foscam.getOSDMaskResponse
 * @property {boolean} isEnableTimeStamp Time stamp will display on screen or not.
 * @property {boolean} isEnableDevName Camera name will display on screen or not.
 * @property {int} dispPos OSD display position, currently can only be 0.
 * @property {boolean} isEnableOSDMask Is OSD mask effective.
 */

/**
 * getOSDMask
 * @desc Get OSD mask status.
 * @returns {Promise<Foscam.getOSDMaskResponse>} A promise to the response.
 */
Foscam.prototype.getOSDMask = function() {
    return this.get('getOSDMask').then(function(response) {
        Foscam.numberToBoolean(response, 'isEnableTimeStamp');
        Foscam.numberToBoolean(response, 'isEnableTempAndHumid');
        Foscam.numberToBoolean(response, 'isEnableDevName');
        Foscam.numberToBoolean(response, 'isEnableOSDMask');
        return response;
    });
};

/**
 * setOSDMask
 * @desc Set OSD mask status.
 * @param {boolean} isEnabledOSDMask
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setOSDMask = function(isEnabledOSDMask) {
    return this.get('setOSDMask', {isEnabledOSDMask: Foscam.booleanToNumber(isEnabledOSDMask)});
};

/**
 * @typedef Foscam.motionDetectConfig
 * @desc
 *   - Video region is divided into 10*10 sub areas.
 *   - The min unit of schedule is half an hour,
 *     scheduleN value range 2^n - 1(N[0-48])
 *   - areaN value 2^n - 1(N[0-10])
 * @property {boolean} isEnable Is enable motion detect alarm
 * @property linkage Motion alarm linkage (bit3 | bit2 | bit1 | bit0 )
 *   - bit0: Ring
 *   - bit1: Sent mail
 *   - bit2: Snap picture
 *   - bit3: Record
 * @property {int} snapInterval The interval time to snap picture again
 * @property {int} Motion sensitivity detect.
 *   - 0: Low
 *   - 1: Normal
 *   - 2: High
 *   - 3: Lower
 *   - 4: Lowest
 * @property {int} triggerInterval The time of which motion detect alarm can
 *   trigger again when a motion detection has happened.
 * @property {int} scheduleN The motion alaram schedule of one week,
 *   - N = 0 (Monday) - 6 (Sunday)
 * @property {int} areaN The area info of row N
 */

/**
 * getMotionDetectConfig
 * @desc Get motion detect config.
 *  - Motion alarm linkage (bit3 | bit2 | bit1 | bit0 )
 *    - bit0: Ring
 *    - bit1: Sent mail
 *    - bit2: Snap picture
 *    - bit3: Record
 * @returns {Promise<Foscam.motionDetectConfig>} A promise to the response.
 */
Foscam.prototype.getMotionDetectConfig = function() {
    return this.get('getMotionDetectConfig');
};

/**
 * getMotionDetectConfig1
 * @desc Get motion detect config. New CGI command obtained from Foscam Technical Support
 *  - Motion alarm linkage (bit3 | bit2 | bit1 | bit0 )
 *    - bit0: Ring
 *    - bit1: Sent mail
 *    - bit2: Snap picture
 *    - bit3: Record
 * @returns {Promise<Foscam.motionDetectConfig1>} A promise to the response.
 */
Foscam.prototype.getMotionDetectConfig1 = function() {
    return this.get('getMotionDetectConfig1');
};

/**
 * setMotionDetectConfig
 * @desc Set motion detect config
 *      - Video region is divided into 10*10 sub areasideo region is divided into 10*10 sub areas
 *      - The min unit of schedule is half an hour, scheduleN value range 2N -1(N[0-48])
 *      - areaN value 2N -1(N[0-10])
 * @param {Foscam.motionDetectConfig}
 * @example /cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&linkage=16&
 *      snapInterval=2&sensitivity=1&triggerInterval=5&schedule0=1023&schedule1=
 *      1023&schedule2=1023&schedule3=1023&schedule4=1023&schedule5=1023&
 *      schedule6=1023&area0=1023&area1=1023&area2=1023&area3=1023&area4=
 *      1023&area5=1023&area6=1023&area7=1023&area7=1023&area8=1023&area9=1023
 * @returns {Promise<object>} A promise to the response.
 * @todo Document format for schedules and areas
 */
Foscam.prototype.setMotionDetectConfig = function(params) {
    params = params || {};
    params.isEnable = Foscam.booleanToNumber(params.isEnable);

    return this.get('setMotionDetectConfig', params);
};

/**
 * setMotionDetectConfig1
 * @desc Set motion detect config
 *      - Video region is divided into 10*10 sub areasideo region is divided into 10*10 sub areas
 *      - The min unit of schedule is half an hour, scheduleN value range 2N -1(N[0-48])
 *      - areaN value 2N -1(N[0-10])
 * @param {Foscam.motionDetectConfig1}
 * @example /cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&linkage=0&
 *      snapInterval=0&triggerInterval=0&isMovAlarmEnable=1&isPirAlarmEnable=1&
 *      schedule0=0&schedule1=0&schedule2=0&schedule3=0&schedule4=0&schedule5=0&
 *      schedule6=0&x1=0&y1=0&width1=10000&height1=10000&threshold1=52254&
 *      sensitivity1=30396&valid1=0&x2=0&y2=0&width2=10000&height2=10000&threshold2=0&
 *      sensitivity2=0&valid2=0&x3=0&y3=0&width3=12&height3=0&threshold3=2&
 *      sensitivity3>0&valid3=65535
 * @returns {Promise<object>} A promise to the response.
 * @todo Document format for schedules and areas
 */
Foscam.prototype.setMotionDetectConfig1 = function(params) {
    params = params || {};
    params.isEnable = Foscam.booleanToNumber(params.isEnable);
    return this.get('setMotionDetectConfig1', params);
};

/**
 * @typedef Foscam.localAlarmRecordConfig
 * @property {boolean} isEnableLocalAlarmRecord false: Disable. true: Enable.
 * @property {int} localAlarmRecordSecs Recording time.
 */

/**
 * setLocalAlarmRecordConfig
 * @desc Set local alarm-record config
 * @param {Foscam.localAlarmRecordConfig}
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setLocalAlarmRecordConfig = function(params) {
    params = params || {};
    params.isEnableLocalAlarmRecord = Foscam.booleanToNumber(params.isEnableLocalAlarmRecord);
    return this.get('setLocalAlarmRecordConfig', params);
};

/**
 * getLocalAlarmRecordConfig
 * @desc Get local alarm-record config
 * @returns {Promise<Foscam.localAlarmRecordConfig>} A promise to the response.
 */
Foscam.prototype.getLocalAlarmRecordConfig = function() {
    return this.get('getLocalAlarmRecordConfig').then(function(response){
        Foscam.numberToBoolean(response, 'isEnableLocalAlarmRecord');
        return response;
    });
};

/**
 * @typedef Foscam.snapConfig
 * @property {int} snapPicQuality 0: Low Quality. 1: Normal Quality. 2: High quality.
 * @property {int} saveLocation 0: Save to sd card. 1: Not in use now. 2: Upload to FTP.
 */

/**
 * getSnapConfig
 * @desc Get snap config.
 * @returns {Promise<Foscam.snapConfig>} A promise to the response.
 */
Foscam.prototype.getSnapConfig = function() {
    return this.get('getSnapConfig');
};

/**
 * setSnapConfig
 * @desc Set snap config.
 * @param {Foscam.snapConfig} config Config for snap
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setSnapConfig = function(params) {
    return this.get('setSnapConfig', params);
};

/**
 * @typedef Foscam.scheduleSnapConfig
 * @property {boolean} isEnable Is enable motion detect alarm.
 * @property {int} snapInterval The interval time to snap picture again.
 * @property {int} scheduleN The motion alaram schedule of one week.
 *   - N = 0(Monday) ~6(Sunday)
 *   - The min unit of schedule is half an hour,
 *   scheduleN value range 2^n -1(N[0-48])
 */

/**
 * getScheduleSnapConfig
 * @desc Get schedule snap config. The min unit of schedule is half an hour, scheduleN value range 2N -1(N[0-48])
 * @returns {Promise<Foscam.scheduleSnapConfig>} A promise to the response.
 */
Foscam.prototype.getScheduleSnapConfig = function() {
    return this.get('getScheduleSnapConfig').then(function(response) {
        Foscam.numberToBoolean(response, 'isEnable');
        return response;
    });
};

/**
 * setScheduleSnapConfig
 * @desc Set schedule snap config
 * @param {Foscam.scheduleSnapConfig} config.
 * @returns {Promise<Object>} A promise to the response.
 */
Foscam.prototype.setScheduleSnapConfig = function(config) {
    config.isEnable = Foscam.booleanToNumber(config.isEnable);
    return this.get('setScheduleSnapConfig', config);
};

/**
 * snapPicture
 * @desc Manual snap picture. Picture resolution is the same as main stream resolutionnapPicture.
 * @returns {Promise<Object>} A promise to the response. We will return a html script directly.
 */
Foscam.prototype.snapPicture = function() {
    return this.getRaw('snapPicture');
};

/**
 * snapPicture
 * @desc Manual snap picture. This command will return jpeg image data directly.
 * @returns {Promise<Object>} A promise to the response. jpeg image data directly.
 */
Foscam.prototype.snapPicture2 = function() {
    return this.getRaw('snapPicture2', {}, {encoding: null});
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
 * reloadRecordindex
 * @desc Synchronization of record index for Play.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.reloadRecordIndex = function() {
    return this.get('reloadRecordindex');
};

/**
 * @typedef Foscam.alarmRecordConfig
 * @property {boolean} isEnablePreRecord Preview record state
 * @property {int} preRecordSecs Preview record time
 * @property {int} alarmRecordSecs Alarm record time
 */

/**
 * getAlarmRecordConfig
 * @desc Get alarm record config.
 * @returns {Promise<Foscam.alarmRecordConfig>} A promise to the response.
 */
Foscam.prototype.getAlarmRecordConfig = function() {
    return this.get('getAlarmRecordConfig');
};

/**
 * setAlarmRecordConfig
 * @desc Set alarm record config
 * @param {Foscam.alarmRecordConfig} config
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setAlarmRecordConfig = function(params) {
    params = params || {};
    params.isEnablePreRecord = Foscam.booleanToNumber(params.isEnablePreRecord);
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
 * @typedef Foscam.scheduleRecordConfig
 * @desc The min unit of schedule is half an hour, scheduleN value range 2^n -1(N[0-48])
 * @property {boolean} isEnable Schedule-Record enable status, 0-disable,1-enable.
 * @property {int} recordLevel Level for drop frame.
 *   - 0: 30/30
 *   - 1: 24/30
 *   - 2: 15/30
 *   - 3: 8/30,
 *   - 4: 4/30
 *   - 5: 1/30
 * @property {int} spaceFullMode The process method when SD card is full,0-cover the
 *   oldest video and continue record,1-stop record
 * @property {boolean} isEnableAudio Is recording include audio?
 * @property {int} scheduleN The motion alarm schedule of one week,N = 0(Monday) ~6(Sunday)
 */

/**
 * getScheduleRecordConfig
 * @desc Get config for schedule recording.
 * @returns {Promise<Foscam.scheduleRecordConfig>} A promise to the response.
 */
Foscam.prototype.getScheduleRecordConfig = function() {
    return this.get('getScheduleRecordConfig').then(function(config) {
        Foscam.numberToBoolean(config, 'isEnable');
        Foscam.numberToBoolean(config, 'isEnableAudio');
        return config;
    });
};

/**
 * setScheduleRecordConfig
 * @desc Set schedule recordconfig.
 * @param {Foscam.scheduleRecordConfig} scheduleRecordConfig.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setScheduleRecordConfig = function(scheduleRecordConfig) {
    scheduleRecordConfig.isEnable = Foscam.booleanToNumber(scheduleRecordConfig.isEnable);
    scheduleRecordConfig.isEnableAudio = Foscam.booleanToNumber(scheduleRecordConfig.isEnableAudio);
    return this.get('setScheduleRecordConfig', scheduleRecordConfig);
};

/**
 * @typeof Foscam.ioAlarmConfig
 * @property {boolean} isEnable Enable state.
 * @property {int} linkage IO alarm linkage
 *   - bit0: Ring
 *   - bit1: Send mail
 *   - bit2: Snap picture
 *   - bit3: Record
 * @property {int} alarmLevel Alarm level.
 * @property {int} snapInterval Interval for snap picture.
 * @property {int} triggerInterval Interval for trigger alarm again.
 * @property {int} scheduleN N(0-6), alarm schedule
 */

/**
 * setIOAlarmConfig
 * @desc Set IO alarm config
 * @param {Foscam.ioAlarmConfig} ioAlarmConfig
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setIOAlarmConfig = function() {
    this.notImplemented();
};

/**
 * getIOAlarmConfig
 * @desc Get IO alarm config.
 * @returns {Promise<Foscam.ioAlarmConfig>} A promise to the response.
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
 * @param {boolean} isEnablePCAudioAlarm Enable state
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.setPCAudioAlarmCfg = function(isEnablePCAudioAlarm) {
    return this.get('setPCAudioAlarmCfg', {isEnablePCAudioAlarm: Foscam.booleanToNumber(isEnablePCAudioAlarm)});
};

/**
 * getPCAudioAlarmCfg
 * @desc Get audio alarm config for PC（web live video）.
 * @returns {Promise<{isEnablePCAudioAlarm: boolean}>} A promise to the response.
 */
Foscam.prototype.getPCAudioAlarmCfg = function() {
    return this.get('getPCAudioAlarmCfg').then(function(response) {
        Foscam.numberToBoolean(response, 'isEnablePCAudioAlarm');
        return response;
    });
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
    return this.get('getMultiDevDetailInfo', {chnnl: channel});
};

/**
 * addMultiDev
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add multiy device
 */
Foscam.prototype.addMultiDev = function() {
    this.notImplemented();
};

/**
 * delMultiDev
 * @desc Delete multiy device
 * @param {int} channel Channel number
 */
Foscam.prototype.delMultiDev = function(channel) {
    return this.get('delMultiDev', {chnnl: channel});
};

/**
 * setDeFrameLevel
 * @desc Set status to enhance night vision definition
 * @param {int} level Enhance status, 0 or 1
 * @return {Promise<object>} A promise to the response
 */
Foscam.prototype.setDeFrameLevel = function(level) {
    return this.get('setDeFrameLevel', {level: level});
};

/**
 * getDeFrameLevel
 * @desc Get status of enhance the night vision definition
 * @returns {Promise<{level: int}>} A promise to the response
 */
Foscam.prototype.getDeFrameLevel = function() {
    return this.get('getDeFrameLevel');
};
