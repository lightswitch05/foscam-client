'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: PTZ', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get');
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    it('ptzMoveUp', function() {
        cam.ptzMoveUp();
        assertCalledWith(cam.get, 'ptzMoveUp');
    });

    it('ptzMoveDown', function() {
        cam.ptzMoveDown();
        assertCalledWith(cam.get, 'ptzMoveDown');
    });

    it('ptzMoveLeft', function() {
        cam.ptzMoveLeft();
        assertCalledWith(cam.get, 'ptzMoveLeft');
    });

    it('ptzMoveRight', function() {
        cam.ptzMoveRight();
        assertCalledWith(cam.get, 'ptzMoveRight');
    });

    it('ptzMoveTopLeft', function() {
        cam.ptzMoveTopLeft();
        assertCalledWith(cam.get, 'ptzMoveTopLeft');
    });

    it('ptzMoveTopRight', function() {
        cam.ptzMoveTopRight();
        assertCalledWith(cam.get, 'ptzMoveTopRight');
    });

    it('ptzMoveBottomLeft', function() {
        cam.ptzMoveBottomLeft();
        assertCalledWith(cam.get, 'ptzMoveBottomLeft');
    });

    it('ptzMoveBottomRight', function() {
        cam.ptzMoveBottomRight();
        assertCalledWith(cam.get, 'ptzMoveBottomRight');
    });

    it('ptzStopRun', function() {
        cam.ptzStopRun();
        assertCalledWith(cam.get, 'ptzStopRun');
    });

    it('ptzReset', function() {
        cam.ptzReset();
        assertCalledWith(cam.get, 'ptzReset');
    });

    it('getPTZSpeed', function() {
        cam.getPTZSpeed();
        assertCalledWith(cam.get, 'getPTZSpeed');
    });

    it('setPTZSpeed', function() {
        cam.setPTZSpeed(3);
        assertCalledWith(cam.get, 'setPTZSpeed', {speed: 3});
    });

    it('getPTZPresetPointList', function() {
        cam.getPTZPresetPointList();
        assertCalledWith(cam.get, 'getPTZPresetPointList');
    });

    it('ptzAddPresetPoint -- not implemented', function() {
        cam.ptzAddPresetPoint();
        assertCalled(cam.notImplemented);
    });

    it('ptzDeletePresetPoint -- not implemented', function() {
        cam.ptzDeletePresetPoint();
        assertCalled(cam.notImplemented);
    });

    it('ptzGotoPresetPoint', function() {
        cam.ptzGotoPresetPoint('preset');
        assertCalledWith(cam.get, 'ptzGotoPresetPoint', {name: 'preset'});
    });

    it('ptzGetCruiseMapList', function() {
        cam.ptzGetCruiseMapList();
        assertCalledWith(cam.get, 'ptzGetCruiseMapList');
    });

    it('ptzGetCruiseMapInfo -- not implemented', function() {
        cam.ptzGetCruiseMapInfo();
        assertCalled(cam.notImplemented);
    });

    it('ptzSetCruiseMap -- not implemented', function() {
        cam.ptzSetCruiseMap();
        assertCalled(cam.notImplemented);
    });

    it('ptzDelCruiseMap -- not implemented', function() {
        cam.ptzDelCruiseMap();
        assertCalled(cam.notImplemented);
    });

    it('ptzStartCruise -- not implemented', function() {
        cam.ptzStartCruise();
        assertCalled(cam.notImplemented);
    });

    it('ptzStopCruise', function() {
        cam.ptzStopCruise();
        assertCalledWith(cam.get, 'ptzStopCruise');
    });

    it('setCruiseTime -- not implemented', function() {
        cam.setCruiseTime();
        assertCalled(cam.notImplemented);
    });

    it('getCruiseTime', function() {
        cam.getCruiseTime();
        assertCalledWith(cam.get, 'getCruiseTime');
    });

    it('setCruiseTimeCustomed -- not implemented', function() {
        cam.setCruiseTimeCustomed();
        assertCalled(cam.notImplemented);
    });

    it('getCruiseTimeCustomed', function() {
        cam.getCruiseTimeCustomed();
        assertCalledWith(cam.get, 'getCruiseTimeCustomed');
    });

    it('setCruiseLoopCnt -- not implemented', function() {
        cam.setCruiseLoopCnt();
        assertCalled(cam.notImplemented);
    });

    it('getCruiseLoopCnt', function() {
        cam.getCruiseLoopCnt();
        assertCalledWith(cam.get, 'getCruiseLoopCnt');
    });

    it('setCruiseCtrlMode -- not implemented', function() {
        cam.setCruiseCtrlMode();
        assertCalled(cam.notImplemented);
    });

    it('getCruiseCtrlMode', function() {
        cam.getCruiseCtrlMode();
        assertCalledWith(cam.get, 'getCruiseCtrlMode');
    });

    it('setCruisePrePointLingerTime -- not implemented', function() {
        cam.setCruisePrePointLingerTime();
        assertCalled(cam.notImplemented);
    });

    it('getCruisePrePointLingerTime -- not implemented', function() {
        cam.getCruisePrePointLingerTime();
        assertCalled(cam.notImplemented);
    });

    it('zoomIn', function() {
        cam.zoomIn();
        assertCalledWith(cam.get, 'zoomIn');
    });

    it('zoomOut', function() {
        cam.zoomOut();
        assertCalledWith(cam.get, 'zoomOut');
    });

    it('zoomStop', function() {
        cam.zoomStop();
        assertCalledWith(cam.get, 'zoomStop');
    });

    it('getZoomSpeed', function() {
        cam.getZoomSpeed();
        assertCalledWith(cam.get, 'getZoomSpeed');
    });

    it('setZoomSpeed -- not implemented', function() {
        cam.setZoomSpeed();
        assertCalled(cam.notImplemented);
    });

    it('setPTZSelfTestMode -- not implemented', function() {
        cam.setPTZSelfTestMode();
        assertCalled(cam.notImplemented);
    });

    it('getPTZSelfTestMode', function() {
        cam.getPTZSelfTestMode();
        assertCalledWith(cam.get, 'getPTZSelfTestMode');
    });

    it('setPTZPrePointForSelfTest -- not implemented', function() {
        cam.setPTZPrePointForSelfTest();
        assertCalled(cam.notImplemented);
    });

    it('getPTZPrePointForSelfTest', function() {
        cam.getPTZPrePointForSelfTest();
        assertCalledWith(cam.get, 'getPTZPrePointForSelfTest');
    });

    it('get485Info', function() {
        cam.get485Info();
        assertCalledWith(cam.get, 'get485Info');
    });

    it('set485Info -- not implemented', function() {
        cam.set485Info();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
