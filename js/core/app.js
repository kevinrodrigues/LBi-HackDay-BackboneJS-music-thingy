//Lbi Hackday - Attempting a backbone sound maker :)

var dispatcher = require('dispatcher'),
	SampleBank = require('../modules/samplebank'),
	Transport = require('../modules/transport'),
	PatternGrid = require('../modules/patterngrid'),
	KeyControls = require('../modules/controls');

var patterns = {
	basic: {
		'soundOne': '0000000000000000',
		'soundTwo': '0000000000000000',
		'soundThree': '0000100000001000',
		'soundFour': '1000000010000000'
	},
	empty: {
		'soundOne': '0000000000000000',
		'soundTwo': '0000000000000000',
		'soundThree': '0000000000000000',
		'soundFour': '0000000000000000'
	}
};

function proxyEvents(eventsHash) {

	for (var triggerEvent in eventsHash) {

		var _proxy = (function(proxyEvent) {
			return function() {
				var args = Array.prototype.slice.apply(arguments);
				args.unshift(proxyEvent);
				dispatcher.trigger.apply(dispatcher, args);
			}
		})(eventsHash[triggerEvent]);

		dispatcher.on(triggerEvent, _proxy);
	}
}


/**
 * Application startup code
 **/
function launchApp() {
	proxyEvents({
		'patterngrid:notehit': 'samplebank:playsample',
		'transport:requestplay': 'patterngrid:play'
	});

	dispatcher.on('keycontrols:keypressed', function(key) {
		switch (key) {
			case 'PAUSE_RESUME':
				dispatcher.trigger('patterngrid:toggleplay');
			default:
				break;
		}
	});

	Transport.init({
		el: document.getElementById('top')
	});
	PatternGrid.init({
		el: document.getElementById('middle')
	});
	KeyControls.init();

	dispatcher.trigger('patterngrid:setpattern', patterns.basic);

	console.log('Ready');
}

var App = {
	init: function() {
		document.addEventListener('visibilitychange', function(e) {
			if (document.hidden) dispatcher.trigger('patterngrid:stop');
		}, false);

		dispatcher.on('samplebank:ready', launchApp);

		var sampleSrcs = {
			'kick': 'assets/samples/kick.wav',
			'snare': 'assets/samples/snare.wav',
			'openHat': 'assets/samples/openHat.wav',
			'closedHat': 'assets/samples/closedHat.wav'
		};
		SampleBank.init(sampleSrcs);
	}
};

module.exports = App;