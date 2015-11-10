'use strict';
var Foscam = require('../lib');
var sinon = require('sinon');
var assertCalledWith = sinon.assert.calledWithMatch;
var assertCalled = sinon.assert.calledOnce;
var cam;

describe('Foscam: User', function() {
    beforeEach(function() {
        cam = new Foscam({
            username: 'foo',
            password: 'bar',
            host: '192.168.1.50'
        });
        cam.get = sinon.stub(cam, 'get');
        cam.notImplemented = sinon.stub(cam, 'notImplemented');
    });

    it('addAccount', function() {
        cam.addAccount();
        assertCalled(cam.notImplemented);
    });

    it('delAccount', function() {
        cam.delAccount();
        assertCalled(cam.notImplemented);
    });

    it('changePassword', function() {
        cam.changePassword();
        assertCalled(cam.notImplemented);
    });

    it('changeUserName', function() {
        cam.changeUserName();
        assertCalled(cam.notImplemented);
    });

    it('changeUserNameAndPwdTogether', function() {
        cam.changeUserNameAndPwdTogether();
        assertCalled(cam.notImplemented);
    });

    it('logIn', function() {
        cam.logIn({username: 'foo', password: 'bar'});
        assertCalledWith(cam.get, 'logIn', {usrName: 'foo', pwd: 'bar'});
    });

    it('logOut', function() {
        cam.logOut();
        assertCalledWith(cam.get, 'logOut', {usrName: 'foo'});
    });

    it('getSessionList', function() {
        cam.getSessionList();
        assertCalledWith(cam.get, 'getSessionList');
    });

    it('getUserList', function() {
        cam.getUserList();
        assertCalledWith(cam.get, 'getUserList');
    });

    it('usrBeatHeart', function() {
        cam.usrBeatHeart();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
