'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var Q = require('q');
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
        cam.get = sinon.stub(cam, 'get').returns(new Q.Promise(function() {}));
        cam.getRaw = sinon.stub(cam, 'getRaw').returns(new Q.Promise(function() {}));
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

    describe('ratio', function(){
        it('get', function() {
            cam.getRatio();
            assertCalledWith(cam.get, 'getRatio');
        });

        it('set', function() {
            cam.setRatio(150);
            assertCalledWith(cam.get, 'setRatio', {ratio: 150});
        });
    });

    describe('H264FrameReferenceMode', function() {
        it('get', function() {
            cam.getH264FrameReferenceMode();
            assertCalledWith(cam.get, 'getH264FrmRefMode');
        });

        it('set', function() {
            cam.setH264FrameReferenceMode(1);
            assertCalledWith(cam.get, 'setH264FrmRefMode', {mode: 1});
        });
    });

    describe('ScheduleRecordStreamChannel', function() {
        it('get', function() {
            cam.getScheduleRecordStreamChannel();
            assertCalledWith(cam.get, 'getScheduleRecordStreamChn');
        });

        it('set', function() {
            cam.setScheduleRecordStreamChannel(0);
            assertCalledWith(cam.get, 'setScheduleRecordStreamChn', {chn: 0});
        });
    });

    it('setPowerFrequency', function() {
        cam.setPowerFrequency(0);
        assertCalledWith(cam.get, 'setPwrFreq', {freq: 0});
    });

    describe('Main Video Stream', function() {
        describe('Param', function() {
            it('get', function() {
                cam.getVideoStreamParam();
                assertCalledWith(cam.get, 'getVideoStreamParam');
            });

            it('set', function() {
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
        });

        describe('type', function() {
            it('get', function() {
                cam.getMainVideoStreamType();
                assertCalledWith(cam.get, 'getMainVideoStreamType');
            });

            it('set', function() {
                cam.setMainVideoStreamType(2);
                assertCalledWith(cam.get, 'setMainVideoStreamType', {streamType: 2});
            });
        });
    });

    describe('Sub Video Stream', function() {
        describe('Param', function() {
            it('get', function() {
                cam.getSubVideoStreamParam();
                assertCalledWith(cam.get, 'getSubVideoStreamParam');
            });

            it('set', function() {
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
        });

        describe('type', function() {
            it('get', function() {
                cam.getSubVideoStreamType();
                assertCalledWith(cam.get, 'getSubVideoStreamType');
            });

            it('set', function() {
                cam.setSubStreamFormat(0);
                assertCalledWith(cam.get, 'setSubStreamFormat', {format: 0});
            });
        });
    });

    it('getMJStream', function() {
        cam.getMJStream();
        assertCalledWith(cam.get, 'GetMJStream');
    });

    describe('OSD', function() {
        describe('setting', function() {
            it('get', function() {
                cam.getOSDSetting();
                assertCalledWith(cam.get, 'getOSDSetting');
            });

            it('set', function() {
                cam.setOSDSetting({
                    isEnableTimeStamp: true,
                    isEnableDevName: false,
                    dispPos: 0,
                    isEnableOSDMask: true
                });
                assertCalledWith(cam.get, 'setOSDSetting', {
                    isEnableTimeStamp: 1,
                    isEnableDevName: 0,
                    dispPos: 0,
                    isEnableOSDMask: 1
                });
            });
        });

        describe('MaskArea', function() {
            it('get', function() {
                cam.getOSDMaskArea();
                assertCalledWith(cam.get, 'getOsdMaskArea');
            });

            it('set', function() {
                var params = {
                    x1_N: 10, //eslint-disable-line camelcase
                    y1_N: 10, //eslint-disable-line camelcase
                    x2_N: 20, //eslint-disable-line camelcase
                    y2_N: 20 //eslint-disable-line camelcase
                };
                cam.setOSDMaskArea(params);
                assertCalledWith(cam.get, 'setOsdMaskArea', params);
            });
        });

        describe('Mask', function() {
            it('get', function() {
                cam.getOSDMask();
                assertCalledWith(cam.get, 'getOSDMask');
            });

            it('set', function() {
                cam.setOSDMask(false);
                assertCalledWith(cam.get, 'setOSDMask', {isEnabledOSDMask: 0});
            });
        });
    });

    describe('MotionDetectConfig', function() {
        it('get', function() {
            cam.getMotionDetectConfig();
            assertCalledWith(cam.get, 'getMotionDetectConfig');
        });

        it('set', function() {
            // TODO: flesh this out a bit
            var params = {};
            cam.setMotionDetectConfig(params);
            assertCalledWith(cam.get, 'setMotionDetectConfig', params);
        });
    });

    describe('LocalAlarmRecordConfig', function() {
        it('set', function() {
            var params = {
                isEnableLocalAlarmRecord: true,
                localAlarmRecordSecs: 4
            };
            cam.setLocalAlarmRecordConfig(params);
            assertCalledWith(cam.get, 'setLocalAlarmRecordConfig', {
                isEnableLocalAlarmRecord: 1,
                localAlarmRecordSecs: 4
            });
        });

        it('get', function() {
            cam.getLocalAlarmRecordConfig();
            assertCalledWith(cam.get, 'getLocalAlarmRecordConfig');
        });
    });

    describe('Snap', function() {
        it('snapPicture', function() {
            cam.snapPicture();
            assertCalledWith(cam.getRaw, cam.url, {qs: {cmd: 'snapPicture'}});
        });

        it('snapPicture2', function() {
            cam.snapPicture2();
            assertCalledWith(cam.getRaw, cam.url, {qs: {cmd: 'snapPicture2'}});
        });

        describe('config', function() {
            it('get', function() {
                cam.getSnapConfig();
                assertCalledWith(cam.get, 'getSnapConfig');
            });

            it('set', function() {
                var params = {
                    snapPicQuality: 2,
                    saveLocation: 1
                };
                cam.setSnapConfig(params);
                assertCalledWith(cam.get, 'setSnapConfig', params);
            });
        });

        describe('schedule', function() {
            it('get', function() {
                cam.getScheduleSnapConfig();
                assertCalledWith(cam.get, 'getScheduleSnapConfig');
            });

            it('set - not implemented', function() {
                cam.setScheduleSnapConfig();
                assertCalled(cam.notImplemented);
            });
        });
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

    describe('AlarmRecordConfig', function() {
        it('get', function() {
            cam.getAlarmRecordConfig();
            assertCalledWith(cam.get, 'getAlarmRecordConfig');
        });

        it('set', function() {
            var params = {
                isEnablePreRecord: true,
                preRecordSecs: 5,
                alarmRecordSecs: 2
            };
            cam.setAlarmRecordConfig(params);
            assertCalledWith(cam.get, 'setAlarmRecordConfig', {
                isEnablePreRecord: 1,
                preRecordSecs: 5,
                alarmRecordSecs: 2
            });
        });
    });

    it('getRecordPath', function() {
        cam.getRecordPath();
        assertCalledWith(cam.get, 'getRecordPath');
    });

    describe('ScheduleRecordConfig', function() {
        it('get', function() {
            cam.getScheduleRecordConfig();
            assertCalledWith(cam.get, 'getScheduleRecordConfig');
        });

        it('set -- not implemented', function() {
            cam.setScheduleRecordConfig();
            assertCalled(cam.notImplemented);
        });
    });

    describe('IOAlarmConfig', function() {
        it('set -- not implemented', function() {
            cam.setIOAlarmConfig();
            assertCalled(cam.notImplemented);
        });

        it('get', function() {
            cam.getIOAlarmConfig();
            assertCalledWith(cam.get, 'getIOAlarmConfig');
        });
    });

    it('clearIOAlarmOutput', function() {
        cam.clearIOAlarmOutput();
        assertCalledWith(cam.get, 'clearIOAlarmOutput');
    });

    describe('PCAudioAlarmCfg', function() {
        it('set', function() {
            cam.setPCAudioAlarmCfg(false);
            assertCalledWith(cam.get, 'setPCAudioAlarmCfg', {isEnablePCAudioAlarm: 0});
        });

        it('get', function() {
            cam.getPCAudioAlarmCfg();
            assertCalledWith(cam.get, 'getPCAudioAlarmCfg');
        });
    });

    describe('MultiDev', function() {
        it('list', function() {
            cam.getMultiDevList();
            assertCalledWith(cam.get, 'getMultiDevList');
        });

        it('getMultiDevDetailInfo', function() {
            cam.getMultiDevDetailInfo(2);
            assertCalledWith(cam.get, 'getMultiDevDetailInfo', {chnnl: 2});
        });

        it('add -- not implemented', function() {
            cam.addMultiDev();
            assertCalled(cam.notImplemented);
        });

        it('delete -- not implemented', function() {
            cam.delMultiDev();
            assertCalled(cam.notImplemented);
        });
    });

    describe('DeFrameLevel', function() {
        it('setDeFrameLevel', function() {
            cam.setDeFrameLevel(1);
            assertCalledWith(cam.get, 'setDeFrameLevel', {level: 1});
        });

        it('getDeFrameLevel', function() {
            cam.getDeFrameLevel();
            assertCalledWith(cam.get, 'getDeFrameLevel');
        });
    });

    afterEach(function() {
        cam.get.reset();
    });
});
