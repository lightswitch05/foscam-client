'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: Network', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get');
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    describe('IPInfo', function() {
        it('get', function() {
            cam.getIPInfo();
            assertCalledWith(cam.get, 'getIPInfo');
        });

        it('set', function() {
            cam.setIpInfo();
            assertCalled(cam.notImplemented);
        });
    });

    describe('Wifi', function() {
        it('refresh', function() {
            cam.refreshWifiList();
            assertCalledWith(cam.get, 'refreshWifiList');
        });

        describe('list', function() {
            it('defaults to the first page', function() {
                cam.getWifiList();
                assertCalledWith(cam.get, 'getWifiList', {startNo: 0});
            });

            it('gets a different page number', function() {
                cam.getWifiList(2);
                assertCalledWith(cam.get, 'getWifiList', {startNo: 2});
            })
        });

        it('setSettings', function() {
            cam.setWifiSetting();
            assertCalled(cam.notImplemented);
        });

        it('getWifiConfig', function() {
            cam.getWifiConfig();
            assertCalledWith(cam.get, 'getWifiConfig');
        });
    });

    describe('PortInfo', function() {
        it('get', function() {
            cam.getPortInfo();
            assertCalledWith(cam.get, 'getPortInfo');
        });

        it('set', function() {
            cam.setPortInfo();
            assertCalled(cam.notImplemented);
        });
    });

    describe('UPnP', function() {
        it('get', function() {
            cam.getUPnPConfig();
            assertCalledWith(cam.get, 'getUPnPConfig');
        });

        it('set', function() {
            cam.setUPnPConfig();
            assertCalled(cam.notImplemented);
        });
    });

    describe('DDNS', function() {
        it('get', function() {
            cam.getDDNSConfig();
            assertCalledWith(cam.get, 'getDDNSConfig');
        });

        it('set', function() {
            cam.setDDNSConfig();
            assertCalled(cam.notImplemented);
        });
    });

    describe('FTP', function() {
        it('get', function() {
            cam.getFtpConfig();
            assertCalledWith(cam.get, 'getFtpConfig');
        });

        it('set', function() {
            cam.setFtpConfig();
            assertCalled(cam.notImplemented);
        });

        it('test', function() {
            cam.testFtpServer();
            assertCalled(cam.notImplemented);
        });
    });

    describe('SMTP', function() {
        it('get', function() {
            cam.getSMTPConfig();
            assertCalledWith(cam.get, 'getSMTPConfig');
        });

        it('set', function() {
            cam.setSMTPConfig();
            assertCalled(cam.notImplemented);
        });

        it('test', function() {
            cam.smtpTest();
            assertCalled(cam.notImplemented);
        })
    });

    describe('P2P', function() {

        it('getInfo', function() {
            cam.getP2PInfo();
            assertCalledWith(cam.get, 'getP2PInfo');
        });

        describe('enabled', function() {
            it('set', function() {
                cam.setP2PEnable();
                assertCalled(cam.notImplemented);
            });

            it('get', function() {
                cam.getP2PEnable();
                assertCalledWith(cam.get, 'getP2PEnable');
            });
        });

        describe('port', function() {
            it('set', function() {
                cam.setP2PPort();
                assertCalled(cam.notImplemented);
            });

            it('get', function() {
                cam.getP2PPort();
                assertCalledWith(cam.get, 'getP2PPort');
            });
        });
    });

    describe('PPPoEConfig', function() {
        it('set', function() {
            cam.setPPPoEConfig();
            assertCalled(cam.notImplemented);
        });

        it('get', function() {
            cam.getPPPoEConfig();
            assertCalledWith(cam.get, 'getPPPoEConfig');
        });
    });

    afterEach(function() {
        cam.get.reset();
    });
});
