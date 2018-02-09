2018-02-09 - Release 0.5.0
--------------------------
* Fix handling of MJPEG streaming. Thanks [@pferreir](https://github.com/pferreir)!

2016-10-16 - Release 0.4.0
--------------------------
* Fixed certain MAC addresses from being converted into numbers. Thanks [@jamieburchell](https://github.com/jamieburchell)!
* Fixed config overwrite for multiple instances. Thanks [@lijamez](https://github.com/lijamez)!

2016-03-02 - Release 0.3.0
--------------------------
* Added `getMotionDetectConfig1` and `setMotionDetectConfig1` for model C2 cameras. Thanks [@rooi](https://github.com/rooi)!

2016-02-29 - Release 0.2.3
--------------------------
* Improved testing.
* Updated dependencies.

2016-01-14 - Release 0.2.2
--------------------------
* Added an option to trust invalid (Foscam) certs.
* Fixed some missed number->boolean conversions.
* Improved testing.

2015-12-16 - Release 0.2.1
--------------------------
* Fixed snapPicture
* Fixed snapPicture2

2015-11-24 - Release 0.2.0
--------------------------
* BREAKING CHANGES
* Changed many functions to take booleans over ints - see docs.
* Implemented more methods.
* Improved testing.
* Improved documentation.

2015-11-08 - Release 0.1.0
--------------------------
* BREAKING CHANGES
* All setter methods that previously took multiple arguments now take a single object argument
* Break up foscam.js into separate files based on functionality
