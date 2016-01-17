cordova.define("com.phonegap.plugins.streamplayer.StreamPlayer", function(require, exports, module) { 

	var exec = require("cordova/exec");

	function StreamPlayer() {
		this.url = null;
	}

	StreamPlayer.prototype.play = function(url) {
		exec(null, null, "StreamPlayer", "playStream", [url]);
	};

	var streamPlayer = new StreamPlayer();
	module.exports = streamPlayer;


});
