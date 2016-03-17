/**
 * Created by kevrodri on 17/03/16.
 */
var AUDIO = new(window.AudioContext || window.webkitAudioContext)();

if (!AUDIO) {
	throw 'Web Audio API not supported';
}

module.exports = AUDIO;