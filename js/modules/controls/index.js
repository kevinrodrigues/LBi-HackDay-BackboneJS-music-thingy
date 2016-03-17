/**
 * Created by kevrodri on 17/03/16.
 */
var $ = require('jquery'),
	_ = require('underscore');

var dispatcher = require('dispatcher');

var KEYS = {
	'PAUSE_RESUME': 32,
	'CLEAR': 27,
	'TOGGLE_FILTER': 70
};

function testKeyEvent(e) {
	var key = _.invert(KEYS)[e.which];
	if (key) {
		dispatcher.trigger('keycontrols:keypressed', key);
	}
}

function init() {
	$(window).on('keyup', testKeyEvent);
}

var KeyControls = {
	init: init
};

module.exports = KeyControls;