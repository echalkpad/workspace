cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.bcsphere.bluetooth/www/org.underscorejs.underscore/underscore.js",
        "id": "org.bcsphere.bluetooth.underscorejs.underscore"
    },
    {
        "file": "plugins/org.bcsphere.bluetooth/www/org.bcsphere/bc.js",
        "id": "org.bcsphere.bluetooth.bcjs",
        "merges": [
            "BC"
        ]
    },
    {
        "file": "plugins/org.bcsphere.bluetooth/www/org.bcsphere.bluetooth/bluetoothapi.js",
        "id": "org.bcsphere.bluetooth.bluetoothapi",
        "merges": [
            "navigator.bluetooth"
        ]
    },
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.0",
    "cordova-plugin-device": "1.1.0",
    "cordova-plugin-console": "1.0.2",
    "org.bcsphere.bluetooth": "0.5.1",
    "com.megster.cordova.bluetoothserial": "0.4.3"
}
// BOTTOM OF METADATA
});