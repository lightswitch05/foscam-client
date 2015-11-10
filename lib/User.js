'use strict';

var Foscam = require('./Foscam');

/**
 * addAccount
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Add user account
 */
Foscam.prototype.addAccount = function() {
    this.notImplemented();
};

/**
 * delAccount
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Delete user account
 */
Foscam.prototype.delAccount = function() {
    this.notImplemented();
};

/**
 * changePassword
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Change password
 */
Foscam.prototype.changePassword = function() {
    this.notImplemented();
};

/**
 * changeUserName
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Change user name
 */
Foscam.prototype.changeUserName = function() {
    this.notImplemented();
};

/**
 * changeUserNameAndPwdTogether
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc Change user name and password together
 */
Foscam.prototype.changeUserNameAndPwdTogether = function() {
    this.notImplemented();
};

/**
 * logIn
 * @desc User log in to camera.
 * @param {object} [params]
 * @param {string} [params.username] Username to login. Defaults to username supplied at api initialization.
 * @param {string} [params.password] Password of user to login. Defaults to password supplied at api initialization.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.logIn = function(params) {
    params = params || {};
    params.usrName = params.username || this.username;
    params.pwd = params.password || this.password;

    return this.get('logIn', params);
};

/**
 * logOut
 * @desc User log out to camera.
 * @param {string} [username] Username to login. Defaults to username supplied at api initialization.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.logOut = function(username) {
    var params = {
        usrName: username || this.username
    };

    return this.get('logOut', params);
};

/**
 * getSessionList
 * @desc Get current session list of the camera.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getSessionList = function() {
    return this.get('getSessionList');
};

/**
 * getUserList
 * @desc Get user account list of the camera.
 * @returns {Promise<object>} A promise to the response.
 */
Foscam.prototype.getUserList = function() {
    return this.get('getUserList');
};

/**
 * usrBeatHeart
 * @todo Write the documentation.
 * @todo Implement this function.
 * @desc user checks connection with camera
 */
Foscam.prototype.usrBeatHeart = function() {
    this.notImplemented();
};
