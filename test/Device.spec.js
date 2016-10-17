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

    describe('SystemTime', function() {
        it('get', function() {
            cam.getSystemTime();
            assertCalledWith(cam.get, 'getSystemTime');
        });

        it('set -- not implemented', function() {
            cam.setSystemTime();
            assertCalled(cam.notImplemented);
        });
    });

    describe('InfraLed', function() {
        describe('config', function() {
            it('get', function() {
                cam.getInfraLedConfig();
                assertCalledWith(cam.get, 'getInfraLedConfig');
            });

            it('set -- not implemented', function() {
                cam.setInfraLedConfig();
                assertCalled(cam.notImplemented);
            });
        });

        describe('state', function() {
            it('open', function() {
                cam.openInfraLed();
                assertCalledWith(cam.get, 'openInfraLed');
            });

            it('close', function() {
                cam.closeInfraLed();
                assertCalledWith(cam.get, 'closeInfraLed');
            });
        });

        describe('schedule', function() {
            it('get', function() {
                cam.getScheduleInfraLedConfig();
                assertCalledWith(cam.get, 'getScheduleInfraLedConfig');
            });

            it('set -- not implemented', function() {
                cam.setScheduleInfraLedConfig();
                assertCalled(cam.notImplemented);
            });
        });
    });

    describe('DevName', function() {
        it('get', function() {
            cam.getDevName();
            assertCalledWith(cam.get, 'getDevName');
        });

        it('set', function() {
            cam.setDevName('Cam1');
            assertCalledWith(cam.get, 'setDevName', {devName: 'Cam1'});
        });
    });

    it('getDevState', function() {
        cam.getDevState();
        assertCalledWith(cam.get, 'getDevState');
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

    it('getProductPtFlag', function() {
        cam.getProductPtFlag();
        assertCalledWith(cam.get, 'getProductPtFlag');
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

    it('toolResetToFactory -- not implemented', function() {
        cam.toolResetToFactory();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
