'use strict';
var Foscam = require('../lib');
var assert = require('chai').assert;

describe('Foscam', function() {
    it('exports the Foscam class', function() {
        assert.isFunction(Foscam);
        assert.instanceOf(new Foscam({}), Foscam);
    });

    it('throws when options object is ommitted', function() {
        assert.throws(function() {
            return new Foscam(null);
        });
    });

    it('creates the correct API url', function() {
        var cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50',
            port: 443,
            protocol: 'https'
        });

        assert.equal(cam.url, 'https://192.168.1.50:443/cgi-bin/CGIProxy.fcgi');
    });

    it('converts numbers to boolean', function() {
        var obj = {num: 1};

        Foscam.numberToBoolean(obj, 'num');
        assert.equal(obj.num, true);

        obj.num = 0;
        Foscam.numberToBoolean(obj, 'num');
        assert.equal(obj.num, false);
    });

    it('converts a boolean to a number', function() {
        assert.equal(Foscam.booleanToNumber(true), 1);
        assert.equal(Foscam.booleanToNumber(false), 0);
    });

    describe('parseResponse', function() {
        it('unwraps CGI Result', function() {
            var xml = '<CGI_Result>' +
                '<result>0</result>' +
                '<isEnableTimeStamp>1</isEnableTimeStamp>' +
                '<isEnableTempAndHumid>0</isEnableTempAndHumid>' +
                '<isEnableDevName>1</isEnableDevName>' +
                '<dispPos>0</dispPos>' +
                '<isEnableOSDMask>0</isEnableOSDMask>' +
                '</CGI_Result>';

            return Foscam.parseResponse(xml).then(function(parsed) {
                assert.deepEqual(parsed, {
                    result: 0,
                    isEnableTimeStamp: 1,
                    isEnableTempAndHumid: 0,
                    isEnableDevName: 1,
                    dispPos: 0,
                    isEnableOSDMask: 0
                });
            });
        });

        it('still decodes non-cgi-result XML', function() {
            var xml = '<rootNode><innerNode>Here</innerNode></rootNode>';

            return Foscam.parseResponse(xml).then(function(parsed) {
                assert.deepEqual(parsed, {
                    rootNode: {
                        innerNode: 'Here'
                    }
                });
            });
        });

        it('passes through invalid xml', function() {
            var xml = 'not xml';
            return Foscam.parseResponse(xml).then(function(parsed) {
                assert.equal(parsed, xml);
            });
        });

        it('passes through null', function() {
            return Foscam.parseResponse(null).then(function(parsed) {
                assert.equal(parsed, null);
            });
        });
    });

    it('throws when a function is not implemented', function() {
        var cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });

        assert.throws(cam.notImplemented);
    });
});
