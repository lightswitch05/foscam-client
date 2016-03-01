'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var Q = require('q');
var assert = require('chai').assert;
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
        assertCalledWith(cam.get, 'setContrast', {constrast: 30});
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

    it('setDenoiseLevel', function() {
        cam.setDenoiseLevel(20);
        assertCalledWith(cam.get, 'setDenoiseLevel', {level: 20});
    });

    it('resetImageSetting', function() {
        cam.resetImageSetting();
        assertCalledWith(cam.get, 'resetImageSetting');
    });

    it('getMirrorAndFlipSetting', function() {
        var camera = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        sinon.stub(camera, 'getRaw').returns(
            new Q('<CGI_Result>' +
                  '  <result>0</result>' +
                  '  <isMirror>0</isMirror>' +
                  '  <isFlip>0</isFlip>' +
                  '</CGI_Result>')
        );
        return camera.getMirrorAndFlipSetting().then(function(response){
            assertCalledWith(camera.getRaw, 'getMirrorAndFlipSetting');
            assert.equal(response.result, 0);
            assert.isFalse(response.isMirror);
            assert.isFalse(response.isFlip);
        });
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
                var camera = new Foscam({
                    username: 'foo',
                    password: 'bar',
                    host: '192.168.1.50'
                });
                sinon.stub(camera, 'getRaw').returns(
                    new Q('<CGI_Result>' +
                          '  <result>0</result>' +
                          '  <resolution0>0</resolution0>' +
                          '  <resolution1>0</resolution1>' +
                          '  <resolution2>3</resolution2>' +
                          '  <resolution3>0</resolution3>' +
                          '  <bitRate0>2097152</bitRate0>' +
                          '  <bitRate1>2097152</bitRate1>' +
                          '  <bitRate2>1048576</bitRate2>' +
                          '  <bitRate3>2097152</bitRate3>' +
                          '  <frameRate0>30</frameRate0>' +
                          '  <frameRate1>20</frameRate1>' +
                          '  <frameRate2>15</frameRate2>' +
                          '  <frameRate3>30</frameRate3>' +
                          '  <GOP0>30</GOP0>' +
                          '  <GOP1>60</GOP1>' +
                          '  <GOP2>60</GOP2>' +
                          '  <GOP3>30</GOP3>' +
                          '  <isVBR0>1</isVBR0>' +
                          '  <isVBR1>1</isVBR1>' +
                          '  <isVBR2>1</isVBR2>' +
                          '  <isVBR3>1</isVBR3>' +
                          '</CGI_Result>')
                );
                return camera.getVideoStreamParam().then(function(response){
                    assertCalledWith(camera.getRaw, 'getVideoStreamParam');
                    assert.equal(response.result, 0);
                    assert.equal(response.resolution0, 0);
                    assert.equal(response.resolution1, 0);
                    assert.equal(response.resolution2, 3);
                    assert.equal(response.resolution3, 0);
                    assert.equal(response.bitRate0, 2097152);
                    assert.equal(response.bitRate1, 2097152);
                    assert.equal(response.bitRate2, 1048576);
                    assert.equal(response.bitRate3, 2097152);
                    assert.equal(response.frameRate0, 30);
                    assert.equal(response.frameRate1, 20);
                    assert.equal(response.frameRate2, 15);
                    assert.equal(response.frameRate3, 30);
                    assert.equal(response.GOP0, 30);
                    assert.equal(response.GOP1, 60);
                    assert.equal(response.GOP2, 60);
                    assert.equal(response.GOP3, 30);
                    assert.isTrue(response.isVBR0);
                    assert.isTrue(response.isVBR1);
                    assert.isTrue(response.isVBR2);
                    assert.isTrue(response.isVBR3);
                });
            });

            it('set', function() {
                var params = {
                    streamType: 2,
                    resolution: 0,
                    bitRate: 20580,
                    frameRate: 40,
                    GOP: 30,
                    isVBR: false
                };
                cam.setVideoStreamParam(params);
                params.isVBR = 0;
                assertCalledWith(cam.get, 'setVideoStreamParam', params);
            });

            it('set defaults VBR to 0', function() {
                cam.setVideoStreamParam();
                assertCalledWith(cam.get, 'setVideoStreamParam', {isVBR: 0});
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
                    isVBR: false
                };
                cam.setSubVideoStreamParam(params);
                params.isVBR = 0;
                assertCalledWith(cam.get, 'setSubVideoStreamParam', params);
            });

            it('set defaults VBR to 0', function() {
                cam.setSubVideoStreamParam();
                assertCalledWith(cam.get, 'setSubVideoStreamParam', {isVBR: 0});
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
                var camera = new Foscam({
                    username: 'foo',
                    password: 'bar',
                    host: '192.168.1.50'
                });
                sinon.stub(camera, 'getRaw').returns(
                    new Q('<CGI_Result>' +
                          '  <result>0</result>' +
                          '  <isEnableTimeStamp>1</isEnableTimeStamp>' +
                          '  <isEnableTempAndHumid>0</isEnableTempAndHumid>' +
                          '  <isEnableDevName>1</isEnableDevName>' +
                          '  <dispPos>0</dispPos>' +
                          '  <isEnableOSDMask>0</isEnableOSDMask>' +
                          '</CGI_Result>')
                );
                return camera.getOSDSetting().then(function(response){
                    assertCalledWith(camera.getRaw, 'getOSDSetting');
                    assert.equal(response.result, 0);
                    assert.isTrue(response.isEnableTimeStamp);
                    assert.isFalse(response.isEnableTempAndHumid);
                    assert.isTrue(response.isEnableDevName);
                    assert.equal(response.dispPos, 0);
                    assert.isFalse(response.isEnableOSDMask);
                });
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

            it('set without args', function() {
                cam.setOSDSetting();
                assertCalledWith(cam.get, 'setOSDSetting');
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
                var camera = new Foscam({
                    username: 'foo',
                    password: 'bar',
                    host: '192.168.1.50'
                });
                sinon.stub(camera, 'getRaw').returns(
                    new Q('<CGI_Result>' +
                          '  <result>0</result>' +
                          '  <isEnableTimeStamp>1</isEnableTimeStamp>' +
                          '  <isEnableTempAndHumid>0</isEnableTempAndHumid>' +
                          '  <isEnableDevName>1</isEnableDevName>' +
                          '  <dispPos>0</dispPos>' +
                          '  <isEnableOSDMask>0</isEnableOSDMask>' +
                          '</CGI_Result>')
                );
                return camera.getOSDMask().then(function(response){
                    assertCalledWith(camera.getRaw, 'getOSDMask');
                    assert.equal(response.result, 0);
                    assert.isTrue(response.isEnableTimeStamp);
                    assert.isFalse(response.isEnableTempAndHumid);
                    assert.isTrue(response.isEnableDevName);
                    assert.equal(response.dispPos, 0);
                    assert.isFalse(response.isEnableOSDMask);
                });
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

        it('set without args', function() {
            cam.setMotionDetectConfig();
            assertCalledWith(cam.get, 'setMotionDetectConfig');
        });
    });
         
    describe('MotionDetectConfig1', function() {
        it('get', function() {
            cam.getMotionDetectConfig1();
            assertCalledWith(cam.get, 'getMotionDetectConfig1');
        });
                  
        it('set', function() {
            // TODO: flesh this out a bit
            var params = {};
            cam.setMotionDetectConfig1(params);
            assertCalledWith(cam.get, 'setMotionDetectConfig1', params);
        });
                  
        it('set without args', function() {
            cam.setMotionDetectConfig1();
            assertCalledWith(cam.get, 'setMotionDetectConfig1');
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

        it('set without args', function() {
            cam.setLocalAlarmRecordConfig();
            assertCalledWith(cam.get, 'setLocalAlarmRecordConfig');
        });

        it('get', function() {
            var camera = new Foscam({
                username: 'foo',
                password: 'bar',
                host: '192.168.1.50'
            });
            sinon.stub(camera, 'getRaw').returns(
                new Q('<CGI_Result>' +
                      '  <result>0</result>' +
                      '  <isEnableLocalAlarmRecord>0</isEnableLocalAlarmRecord>' +
                      '  <localAlarmRecordSecs>30</localAlarmRecordSecs>' +
                      '</CGI_Result>')
            );
            return camera.getLocalAlarmRecordConfig().then(function(response){
                assertCalledWith(camera.getRaw, 'getLocalAlarmRecordConfig');
                assert.equal(response.result, 0);
                assert.isFalse(response.isEnableLocalAlarmRecord);
                assert.equal(response.localAlarmRecordSecs, 30);
            });
        });
    });

    describe('Snap', function() {
        it('snapPicture', function() {
            cam.snapPicture();
            assertCalledWith(cam.getRaw, 'snapPicture');
        });

        it('snapPicture2', function() {
            cam.snapPicture2();
            assertCalledWith(cam.getRaw, 'snapPicture2', {}, {encoding: null});
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
                var camera = new Foscam({
                    username: 'foo',
                    password: 'bar',
                    host: '192.168.1.50'
                });
                sinon.stub(camera, 'getRaw').returns(
                    new Q('<CGI_Result>' +
                          '  <result>0</result>' +
                          '  <isEnable>0</isEnable>' +
                          '  <snapInterval>2</snapInterval>' +
                          '  <schedule0>0</schedule0>' +
                          '  <schedule1>0</schedule1>' +
                          '  <schedule2>0</schedule2>' +
                          '  <schedule3>0</schedule3>' +
                          '  <schedule4>0</schedule4>' +
                          '  <schedule5>0</schedule5>' +
                          '  <schedule6>0</schedule6>' +
                          '</CGI_Result>')
                );
                return camera.getScheduleSnapConfig().then(function(response){
                    assertCalledWith(camera.getRaw, 'getScheduleSnapConfig');
                    assert.equal(response.result, 0);
                    assert.isFalse(response.isEnable);
                    assert.equal(response.snapInterval, 2);
                    assert.equal(response.schedule0, 0);
                    assert.equal(response.schedule1, 0);
                    assert.equal(response.schedule2, 0);
                    assert.equal(response.schedule3, 0);
                    assert.equal(response.schedule4, 0);
                    assert.equal(response.schedule5, 0);
                    assert.equal(response.schedule6, 0);
                });
            });

            it('set', function() {
                cam.setScheduleSnapConfig({
                    isEnable: true,
                    snapInterval: 1,
                    schedule1: 1,
                    schedule2: 1,
                    schedule3: 1,
                    schedule4: 1,
                    schedule5: 1,
                    schedule6: 1

                });
                assertCalledWith(cam.get, 'setScheduleSnapConfig', {
                    isEnable: 1,
                    snapInterval: 1,
                    schedule1: 1,
                    schedule2: 1,
                    schedule3: 1,
                    schedule4: 1,
                    schedule5: 1,
                    schedule6: 1
                });
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

        it('set without args', function() {
            cam.setAlarmRecordConfig();
            assertCalledWith(cam.get, 'setAlarmRecordConfig');
        });
    });

    it('getRecordPath', function() {
        cam.getRecordPath();
        assertCalledWith(cam.get, 'getRecordPath');
    });

    describe('ScheduleRecordConfig', function() {
        it('get', function() {
            var camera = new Foscam({
                username: 'foo',
                password: 'bar',
                host: '192.168.1.50'
            });
            sinon.stub(camera, 'getRaw').returns(
                new Q('<CGI_Result>' +
                      '  <result>0</result>' +
                      '  <isEnable>0</isEnable>' +
                      '  <recordLevel>4</recordLevel>' +
                      '  <spaceFullMode>0</spaceFullMode>' +
                      '  <isEnableAudio>1</isEnableAudio>' +
                      '  <schedule0>0</schedule0>' +
                      '  <schedule1>0</schedule1>' +
                      '  <schedule2>0</schedule2>' +
                      '  <schedule3>0</schedule3>' +
                      '  <schedule4>0</schedule4>' +
                      '  <schedule5>0</schedule5>' +
                      '  <schedule6>0</schedule6>' +
                      '</CGI_Result>')
            );
            return camera.getScheduleRecordConfig().then(function(response){
                assertCalledWith(camera.getRaw, 'getScheduleRecordConfig');
                assert.equal(response.result, 0);
                assert.isFalse(response.isEnable);
                assert.equal(response.recordLevel, 4);
                assert.equal(response.spaceFullMode, 0);
                assert.isTrue(response.isEnableAudio);
                assert.equal(response.schedule0, 0);
                assert.equal(response.schedule1, 0);
                assert.equal(response.schedule2, 0);
                assert.equal(response.schedule3, 0);
                assert.equal(response.schedule4, 0);
                assert.equal(response.schedule5, 0);
                assert.equal(response.schedule6, 0);
            });
        });

        it('set', function() {
            var config = {
                isEnable: true,
                recordLevel: 1,
                spaceFullMode: 1,
                isEnableAudio: true,
                schedule1: 0,
                schedule2: 0,
                schedule3: 0,
                schedule4: 0,
                schedule5: 0,
                schedule6: 0
            };

            cam.setScheduleRecordConfig(config);
            config.isEnable = 1;
            config.isEnableAudio = 1;
            assertCalledWith(cam.get, 'setScheduleRecordConfig', config);
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
            var camera = new Foscam({
                username: 'foo',
                password: 'bar',
                host: '192.168.1.50'
            });
            sinon.stub(camera, 'getRaw').returns(
                new Q('<CGI_Result>' +
                      '  <result>0</result>' +
                      '  <isEnablePCAudioAlarm>0</isEnablePCAudioAlarm>' +
                      '</CGI_Result>')
            );
            return camera.getPCAudioAlarmCfg().then(function(response){
                assert.equal(response.result, 0);
                assertCalledWith(camera.getRaw, 'getPCAudioAlarmCfg');
                assert.isFalse(response.isEnablePCAudioAlarm);
            });
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

        it('delete', function() {
            cam.delMultiDev(2);
            assertCalledWith(cam.get, 'delMultiDev', {chnnl: 2});
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
