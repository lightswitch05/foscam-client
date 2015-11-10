'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: AV', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get').returns(new Promise(function() {}));
        cam.getRaw = sinon.stub(cam, 'getRaw').returns(new Promise(function() {}));
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    it('getImageSetting', function() {
        cam.getImageSetting();
        assertCalledWith(cam.get, 'getImageSetting');
    });

    it('setBrightness', function() {
        cam.setBrightness(50);
        assertCalledWith(cam.get, 'setBrightness', {brightness: 50});
    });

    it('setContrast', function() {
        cam.setContrast(30);
        assertCalledWith(cam.get, 'setContrast', {contrast: 30});
    });

    it('setHue', function() {
        cam.setHue(80);
        assertCalledWith(cam.get, 'setHue', {hue: 80});
    });

    it('setSaturation', function() {
        cam.setSaturation(70);
        assertCalledWith(cam.get, 'setSaturation', {saturation: 70});
    });

    it('setSharpness', function() {
        cam.setSharpness(20);
        assertCalledWith(cam.get, 'setSharpness', {sharpness: 20});
    });

    it('resetImageSetting', function() {
        cam.resetImageSetting();
        assertCalledWith(cam.get, 'resetImageSetting');
    });

    it('getMirrorAndFlipSetting', function() {
        cam.getMirrorAndFlipSetting();
        assertCalledWith(cam.get, 'getMirrorAndFlipSetting');
    });

    it('mirrorVideo', function() {
        cam.mirrorVideo(true);
        assertCalledWith(cam.get, 'mirrorVideo', {isMirror: 1});
    });

    it('flipVideo', function() {
        cam.flipVideo(false);
        assertCalledWith(cam.get, 'flipVideo', {isFlip: 0});
    });

    it('getRatio', function() {
        cam.getRatio();
        assertCalledWith(cam.get, 'getRatio');
    });

    it('setRatio', function() {
        cam.setRatio(150);
        assertCalledWith(cam.get, 'setRatio', {ratio: 150});
    });

    it('getH264FrameReferenceMode', function() {
        cam.getH264FrameReferenceMode();
        assertCalledWith(cam.get, 'getH264FrmRefMode');
    });

    it('setH264FrameReferenceMode', function() {
        cam.setH264FrameReferenceMode(1);
        assertCalledWith(cam.get, 'setH264FrmRefMode', {mode: 1});
    });

    it('getScheduleRecordStreamChannel', function() {
        cam.getScheduleRecordStreamChannel();
        assertCalledWith(cam.get, 'getScheduleRecordStreamChn');
    });

    it('setScheduleRecordStreamChannel', function() {
        cam.setScheduleRecordStreamChannel(0);
        assertCalledWith(cam.get, 'setScheduleRecordStreamChn', {chn: 0});
    });

    it('setPowerFrequency', function() {
        cam.setPowerFrequency(0);
        assertCalledWith(cam.get, 'setPwrFreq', {freq: 0});
    });

    it('getVideoStreamParam', function() {
        cam.getVideoStreamParam();
        assertCalledWith(cam.get, 'getVideoStreamParam');
    });

    it('setVideoStreamParam', function() {
        var params = {
            streamType: 2,
            resolution: 0,
            bitRate: 20580,
            frameRate: 40,
            GOP: 30,
            isVBR: 0
        };
        cam.setVideoStreamParam(params);
        assertCalledWith(cam.get, 'setVideoStreamParam', params);
    });

    it('getSubVideoStreamParam', function() {
        cam.getSubVideoStreamParam();
        assertCalledWith(cam.get, 'getSubVideoStreamParam');
    });

    it('setSubVideoStreamParam', function() {
        var params = {
            streamType: 2,
            resolution: 0,
            bitRate: 20580,
            frameRate: 40,
            GOP: 30,
            isVBR: 0
        };
        cam.setSubVideoStreamParam(params);
        assertCalledWith(cam.get, 'setSubVideoStreamParam', params);
    });

    it('getMainVideoStreamType', function() {
        cam.getMainVideoStreamType();
        assertCalledWith(cam.get, 'getMainVideoStreamType');
    });

    it('getSubVideoStreamType', function() {
        cam.getSubVideoStreamType();
        assertCalledWith(cam.get, 'getSubVideoStreamType');
    });

    it('setMainVideoStreamType', function() {
        cam.setMainVideoStreamType(2);
        assertCalledWith(cam.get, 'setMainVideoStreamType', {streamType: 2});
    });

    it('setSubStreamFormat', function() {
        cam.setSubStreamFormat(0);
        assertCalledWith(cam.get, 'setSubStreamFormat', {format: 0});
    });

    it('getMJStream', function() {
        cam.getMJStream();
        assertCalledWith(cam.get, 'GetMJStream');
    });

    it('getOSDSetting', function() {
        cam.getOSDSetting();
        assertCalledWith(cam.get, 'getOSDSetting');
    });

    it('setOSDSetting', function() {
        cam.setOSDSetting({
            isEnableTimeStamp: 1,
            isEnableDevName: 0,
            dispPos: 0,
            isEnableOSDMask: 1
        });
        assertCalledWith(cam.get, 'setOSDSetting', {
            isEnableTimeStamp: 1,
            isEnableDevName: 0,
            dispPos: 0,
            isEnableOSDMask: 1
        });
    });

    it('getOSDMaskArea', function() {
        cam.getOSDMaskArea();
        assertCalledWith(cam.get, 'getOsdMaskArea');
    });

    it('setOSDMaskArea', function() {
        var params = {
            x1_N: 10, //eslint-disable-line camelcase
            y1_N: 10, //eslint-disable-line camelcase
            x2_N: 20, //eslint-disable-line camelcase
            y2_N: 20 //eslint-disable-line camelcase
        };
        cam.setOSDMaskArea(params);
        assertCalledWith(cam.get, 'setOsdMaskArea', params);
    });

    it('getOSDMask', function() {
        cam.getOSDMask();
        assertCalledWith(cam.get, 'getOSDMask');
    });

    it('setOSDMask', function() {
        cam.setOSDMask(0);
        assertCalledWith(cam.get, 'setOSDMask', {isEnabledOSDMask: 0});
    });

    it('getMotionDetectConfig', function() {
        cam.getMotionDetectConfig();
        assertCalledWith(cam.get, 'getMotionDetectConfig');
    });

    it('setMotionDetectConfig', function() {
        // TODO: flesh this out a bit
        var params = {};
        cam.setMotionDetectConfig(params);
        assertCalledWith(cam.get, 'setMotionDetectConfig', params);
    });

    it('setLocalAlarmRecordConfig', function() {
        var params = {
            isEnableLocalAlarmRecord: 1,
            localAlarmRecordSecs: 4
        };
        cam.setLocalAlarmRecordConfig(params);
        assertCalledWith(cam.get, 'setLocalAlarmRecordConfig', params);
    });

    it('getLocalAlarmRecordConfig', function() {
        cam.getLocalAlarmRecordConfig();
        assertCalledWith(cam.get, 'getLocalAlarmRecordConfig');
    });

    it('getSnapConfig', function() {
        cam.getSnapConfig();
        assertCalledWith(cam.get, 'getSnapConfig');
    });

    it('setSnapConfig', function() {
        var params = {
            snapPicQuality: 2,
            saveLocation: 1
        };
        cam.setSnapConfig(params);
        assertCalledWith(cam.get, 'setSnapConfig', params);
    });

    it('getScheduleSnapConfig', function() {
        cam.getScheduleSnapConfig();
        assertCalledWith(cam.get, 'getScheduleSnapConfig');
    });

    it('setScheduleSnapConfig - not implemented', function() {
        cam.setScheduleSnapConfig();
        assertCalled(cam.notImplemented);
    });

    it('snapPicture', function() {
        cam.snapPicture();
        assertCalledWith(cam.getRaw, cam.url, {qs: {cmd: 'snapPicture'}});
    });

    it('snapPicture2', function() {
        cam.snapPicture2();
        assertCalledWith(cam.getRaw, cam.url, {qs: {cmd: 'snapPicture2'}});
    });

    it('getRecordList', function() {
        cam.getRecordList();
        assertCalledWith(cam.get, 'getRecordList');
    });

    it('getRecordList2', function() {
        cam.getRecordList2();
        assertCalledWith(cam.get, 'getRecordList2');
    });

    it('reloadRecordIndex', function() {
        cam.reloadRecordIndex();
        assertCalledWith(cam.get, 'reloadRecordindex');
    });

    it('getAlarmRecordConfig', function() {
        cam.getAlarmRecordConfig();
        assertCalledWith(cam.get, 'getAlarmRecordConfig');
    });

    it('setAlarmRecordConfig', function() {
        var params = {
            isEnablePreRecord: 1,
            preRecordSecs: 5,
            alarmRecordSecs: 2
        };
        cam.setAlarmRecordConfig(params);
        assertCalledWith(cam.get, 'setAlarmRecordConfig', params);
    });

    it('getRecordPath', function() {
        cam.getRecordPath();
        assertCalledWith(cam.get, 'getRecordPath');
    });

    it('getScheduleRecordConfig', function() {
        cam.getScheduleRecordConfig();
        assertCalledWith(cam.get, 'getScheduleRecordConfig');
    });

    it('setScheduleRecordConfig -- not implemented', function() {
        cam.setScheduleRecordConfig();
        assertCalled(cam.notImplemented);
    });

    it('setIOAlarmConfig -- not implemented', function() {
        cam.setIOAlarmConfig();
        assertCalled(cam.notImplemented);
    });

    it('getIOAlarmConfig', function() {
        cam.getIOAlarmConfig();
        assertCalledWith(cam.get, 'getIOAlarmConfig');
    });

    it('clearIOAlarmOutput', function() {
        cam.clearIOAlarmOutput();
        assertCalledWith(cam.get, 'clearIOAlarmOutput');
    });

    it('setPCAudioAlarmCfg', function() {
        cam.setPCAudioAlarmCfg(0);
        assertCalledWith(cam.get, 'setPCAudioAlarmCfg', {isEnablePCAudioAlarm: 0});
    });

    it('getPCAudioAlarmCfg', function() {
        cam.getPCAudioAlarmCfg();
        assertCalledWith(cam.get, 'getPCAudioAlarmCfg');
    });

    it('getMultiDevList', function() {
        cam.getMultiDevList();
        assertCalledWith(cam.get, 'getMultiDevList');
    });

    it('getMultiDevDetailInfo', function() {
        cam.getMultiDevDetailInfo(2);
        assertCalledWith(cam.get, 'getMultiDevDetailInfo', {chnnl: 2});
    });

    it('addMultiDev -- not implemented', function() {
        cam.addMultiDev();
        assertCalled(cam.notImplemented);
    });

    it('delMultiDev -- not implemented', function() {
        cam.delMultiDev();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
