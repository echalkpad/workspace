cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.streamplayer/www/streamplayer.js",
        "id": "com.phonegap.plugins.streamplayer.StreamPlayer",
        "clobbers": [
            "cordova.plugins.streamPlayer"
        ]
    },
    {
        "file": "plugins/jaeger.Html5Video/www/Html5Video.js",
        "id": "jaeger.Html5Video.Html5Video",
        "clobbers": [
            "plugins.html5Video"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.streamplayer": "1.0",
    "jaeger.Html5Video": "1.2.1",
    "cordova-plugin-device": "1.0.2-dev"
}
// BOTTOM OF METADATA
});