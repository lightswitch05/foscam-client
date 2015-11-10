'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: System', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get');
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    it('rebootSystem', function() {
        cam.rebootSystem();
        assertCalledWith(cam.get, 'rebootSystem');
    });

    it('restoreToFactorySetting', function() {
        cam.restoreToFactorySetting();
        assertCalledWith(cam.get, 'restoreToFactorySetting');
    });

    it('exportConfig', function() {
        cam.exportConfig();
        assertCalledWith(cam.get, 'exportConfig');
    });

    it('importConfig', function() {
        cam.importConfig();
        assertCalled(cam.notImplemented);
    });

    it('fwUpgrade', function() {
        cam.fwUpgrade();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
