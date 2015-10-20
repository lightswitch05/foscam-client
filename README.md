Node Foscam Client
==================

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/lightswitch05/foscam-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Node client sdk for current HD foscam cameras that stream H.264 like the FI9821W, FI9831P, etc..

This is an early release and is not a fully functional SDK. Please open tickets and submit pull request as bugs are found.

Example Usage
-------------

Install using npm: `npm install foscam-client`

```JavaScript
var Foscam = require('foscam-client');

var camera = new Foscam('my-username', 'bad-password1', '192.168.0.50');

// Get saved presets on the camera
var getPointList = camera.getPTZPresetPointList();

// Once the presets are received - print the list to the console and move to the 3rd saved preset
var gotoPresetPoint = getPointList.then(function(pointList) {
    console.log('PTZ Point List:' + JSON.stringify(pointList));
    
    // Note that ptzGotoPresetPoint's promise is fulfilled as soon as the command is received by the
    // camera. There is no way to block until the camera has finished moving to the location.
    return camera.ptzGotoPresetPoint(pointList.point3)
});

// Once the ptzGotoPresetPoint command is finished - snap a picture
var snapPicture = gotoPresetPoint.then(function(){
    return camera.snapPicture2()
});

// Once the picture is snapped - do something with it
snapPicture.then(function(binaryJpg){
    // do something with the binary jpg
});

```

Generate Docs
-------------

`npm run docs`
