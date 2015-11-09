require('babel-core/register');
const Foscam = require('../lib');
const assert = require('chai').assert;

describe('Foscam', () => {
  it('exports the Foscam class', () => {
    assert.isFunction(Foscam);
    assert.instanceOf(new Foscam({}), Foscam);
  });

  it('throws when options object is ommitted', () => {
    assert.throws(() => new Foscam(null));
  });

  it('creates the correct API url', () => {
    const cam = new Foscam({
      username: 'foo',
      password: 'bar',
      host: '192.168.1.50',
      port: 443,
      protocol: 'https'
    });

    assert.equal(cam.url, 'https://192.168.1.50:443/cgi-bin/CGIProxy.fcgi');
  });

  it('converts numbers to boolean', () => {
    const obj = {num: 1};

    Foscam.numberToBoolean(obj, 'num');
    assert.equal(obj.num, true);

    obj.num = 0;
    Foscam.numberToBoolean(obj, 'num');
    assert.equal(obj.num, false);
  });

  it('convers a boolean to a number', () => {
    assert.equal(Foscam.booleanToNumber(true), 1);
    assert.equal(Foscam.booleanToNumber(false), 0);
  });
});
