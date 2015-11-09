require('babel-core/register');
const Foscam = require('../lib');
const assert = require('chai').assert;
const sinon = require('sinon');
const assertCalledWith = sinon.assert.calledWithMatch;
const assertCalled = sinon.assert.calledOnce;
var cam, stub;

describe('Foscam: User', () => {
  beforeEach(() => {
    cam = new Foscam({
      username: 'foo',
      password: 'bar',
      host: '192.168.1.50'
    });
    cam.get = sinon.stub(cam, 'get')
    cam.notImplemented = sinon.stub(cam, 'notImplemented');
  });

  it('addAccount', () => {
    cam.addAccount();
    assertCalled(cam.notImplemented);
  });

  it('delAccount', () => {
    cam.delAccount();
    assertCalled(cam.notImplemented);
  });

  it('changePassword', () => {
    cam.changePassword();
    assertCalled(cam.notImplemented);
  });

  it('changeUserName', () => {
    cam.changeUserName();
    assertCalled(cam.notImplemented);
  });

  it('changeUserNameAndPwdTogether', () => {
    cam.changeUserNameAndPwdTogether();
    assertCalled(cam.notImplemented);
  });

  it('logIn', () => {
    cam.logIn({username: 'foo', password: 'bar'});
    assertCalledWith(cam.get, 'logIn', {usrName: 'foo', pwd: 'bar'});
  });

  it('logOut', () => {
    cam.logOut();
    assertCalledWith(cam.get, 'logOut', {usrName: 'foo'});
  });

  it('getSessionList', () => {
    cam.getSessionList();
    assertCalledWith(cam.get, 'getSessionList');
  });

  it('getUserList', () => {
    cam.getUserList();
    assertCalledWith(cam.get, 'getUserList');
  });

  it('usrBeatHeart', () => {
    cam.usrBeatHeart();
    assertCalled(cam.notImplemented);
  });

  afterEach(() => {
    cam.get.reset();
  });
});
