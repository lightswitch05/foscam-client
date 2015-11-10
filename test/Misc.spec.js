'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: Misc', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get');
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    it('getFirewallConfig', function() {
        cam.getFirewallConfig();
        assertCalledWith(cam.get, 'getFirewallConfig');
    });

    it('setFirewallConfig -- not implemented', function() {
        cam.setFirewallConfig();
        assertCalled(cam.notImplemented);
    });

    it('getLog', function() {
        cam.getLog(2, 10);
        assertCalledWith(cam.get, 'getLog', {offset: 2, count: 10});
    });

    afterEach(function() {
        cam.get.reset();
    });
});
