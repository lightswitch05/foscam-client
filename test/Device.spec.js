'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: Device', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get');
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    it('setSystemTime -- not implemented', function() {
        cam.setSystemTime();
        assertCalled(cam.notImplemented);
    });

    it('getSystemTime', function() {
        cam.getSystemTime();
        assertCalledWith(cam.get, 'getSystemTime');
    });

    it('openInfraLed', function() {
        cam.openInfraLed();
        assertCalledWith(cam.get, 'openInfraLed');
    });

    it('closeInfraLed', function() {
        cam.closeInfraLed();
        assertCalledWith(cam.get, 'closeInfraLed');
    });

    it('getInfraLedConfig', function() {
        cam.getInfraLedConfig();
        assertCalledWith(cam.get, 'getInfraLedConfig');
    });

    it('setInfraLedConfig -- not implemented', function() {
        cam.setInfraLedConfig();
        assertCalled(cam.notImplemented);
    });

    it('getScheduleInfraLedConfig', function() {
        cam.getScheduleInfraLedConfig();
        assertCalledWith(cam.get, 'getScheduleInfraLedConfig');
    });

    it('setScheduleInfraLedConfig -- not implemented', function() {
        cam.setScheduleInfraLedConfig();
        assertCalled(cam.notImplemented);
    });

    it('getDevState', function() {
        cam.getDevState();
        assertCalledWith(cam.get, 'getDevState');
    });

    it('getDevName', function() {
        cam.getDevName();
        assertCalledWith(cam.get, 'getDevName');
    });

    it('setDevName', function() {
        cam.setDevName('name');
        assertCalledWith(cam.get, 'setDevName', {devName: 'name'});
    });

    it('getDevInfo', function() {
        cam.getDevInfo();
        assertCalledWith(cam.get, 'getDevInfo');
    });

    it('getProductModel', function() {
        cam.getProductModel();
        assertCalledWith(cam.get, 'getProductModel');
    });

    it('getProductModelName', function() {
        cam.getProductModelName();
        assertCalledWith(cam.get, 'getProductModelName');
    });

    it('getProductLanguage', function() {
        cam.getProductLanguage();
        assertCalledWith(cam.get, 'getProductLanguage');
    });

    it('getProductSensorType', function() {
        cam.getProductSensorType();
        assertCalledWith(cam.get, 'getProductSensorType');
    });

    it('getProductWifiType', function() {
        cam.getProductWifiType();
        assertCalledWith(cam.get, 'getProductWifiType');
    });

    it('getProductSdFlag', function() {
        cam.getProductSdFlag();
        assertCalledWith(cam.get, 'getProductSdFlag');
    });

    it('getProductOutdoorFlag', function() {
        cam.getProductOutdoorFlag();
        assertCalledWith(cam.get, 'getProductOutdoorFlag');
    });

    it('getProductZoomFlag', function() {
        cam.getProductZoomFlag();
        assertCalledWith(cam.get, 'getProductZoomFlag');
    });

    it('getProductRs485Flag', function() {
        cam.getProductRs485Flag();
        assertCalledWith(cam.get, 'getProductRs485Flag');
    });

    it('getProductIoAlarmFlag', function() {
        cam.getProductIoAlarmFlag();
        assertCalledWith(cam.get, 'getProductIoAlarmFlag');
    });

    it('getProductOnvifFlag', function() {
        cam.getProductOnvifFlag();
        assertCalledWith(cam.get, 'getProductOnvifFlag');
    });

    it('getProductP2pFlag', function() {
        cam.getProductP2pFlag();
        assertCalledWith(cam.get, 'getProductP2pFlag');
    });

    it('getProductWpsFlag', function() {
        cam.getProductWpsFlag();
        assertCalledWith(cam.get, 'getProductWpsFlag');
    });

    it('getProductAudioFlag', function() {
        cam.getProductAudioFlag();
        assertCalledWith(cam.get, 'getProductAudioFlag');
    });

    it('getProductTalkFlag', function() {
        cam.getProductTalkFlag();
        assertCalledWith(cam.get, 'getProductTalkFlag');
    });

    it('getProductAppVer', function() {
        cam.getProductAppVer();
        assertCalledWith(cam.get, 'getProductAppVer');
    });

    it('getProductAllInfo', function() {
        cam.getProductAllInfo();
        assertCalledWith(cam.get, 'getProductAllInfo');
    });

    it('getGeneratePubKey', function() {
        cam.getGeneratePubKey();
        assertCalledWith(cam.get, 'getGeneratePubKey');
    });

    it('toolResetToFactory  -- not implemented', function() {
        cam.toolResetToFactory();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
