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

    describe('getLog', function() {
        it('defaults offset and count', function () {
            cam.getLog();
            assertCalledWith(cam.get, 'getLog', {
                offset: 0,
                count: 20
            });
        });

        it('gets the second page', function () {
            cam.getLog({offset: 20});
            assertCalledWith(cam.get, 'getLog', {
                offset: 20,
                count: 20
            });
        });

        it('only gets 5 logs', function () {
            cam.getLog({count: 5});
            assertCalledWith(cam.get, 'getLog', {
                offset: 0,
                count: 5
            });
        })
    });

    afterEach(function() {
        cam.get.reset();
    });
});
