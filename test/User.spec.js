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

    it('addAccount -- not implemented', function() {
        cam.addAccount();
        assertCalled(cam.notImplemented);
    });

    it('delAccount -- not implemented', function() {
        cam.delAccount();
        assertCalled(cam.notImplemented);
    });

    it('changePassword -- not implemented', function() {
        cam.changePassword();
        assertCalled(cam.notImplemented);
    });

    it('changeUserName -- not implemented', function() {
        cam.changeUserName();
        assertCalled(cam.notImplemented);
    });

    it('changeUserNameAndPwdTogether -- not implemented', function() {
        cam.changeUserNameAndPwdTogether();
        assertCalled(cam.notImplemented);
    });

    describe('logIn', function() {
        it('defaults to the config username and password', function() {
            cam.logIn();
            assertCalledWith(cam.get, 'logIn', {usrName: 'foo', pwd: 'bar'});
        });

        it('accepts a different username and password', function() {
            cam.logIn({username: 'noone', password: '1234'});
            assertCalledWith(cam.get, 'logIn', {usrName: 'noone', pwd: '1234'});
        });
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

    it('usrBeatHeart -- not implemented', function() {
        cam.usrBeatHeart();
        assertCalled(cam.notImplemented);
    });

    afterEach(function() {
        cam.get.reset();
    });
});
