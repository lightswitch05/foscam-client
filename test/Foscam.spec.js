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

    it('convers a boolean to a number', function() {
        assert.equal(Foscam.booleanToNumber(true), 1);
        assert.equal(Foscam.booleanToNumber(false), 0);
    });
});
