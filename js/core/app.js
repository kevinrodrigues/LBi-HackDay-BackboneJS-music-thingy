//Lbi Hackday - Attempting a backbone sound maker :)

var dispatcher = require('dispatcher'),
	SampleBank = require('../modules/samplebank'),
	Transport = require('../modules/transport'),
	PatternGrid = require('../modules/patterngrid');

var patterns = {
	basic: {
		'soundOne': '00000000000000000000',
		'soundTwo': '00000000000000000000',
		'soundThree':'00000000000000000000',
		'soundFour': '00000000000000000000',
		'soundFive': '00000000000000000000'
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

function launchApp() {
	proxyEvents({
		'patterngrid:notehit': 'samplebank:playsample',
		'transport:requestplay': 'patterngrid:play'
	});
	Transport.init({
		el: document.getElementById('top')
	});
	PatternGrid.init({
		el: document.getElementById('middle')
	});

	dispatcher.trigger('patterngrid:setpattern', patterns.basic);

	console.log('Ready');
}

var App = {
	init: function() {
		dispatcher.on('samplebank:ready', launchApp);

		var sampleSrcs = {
			'soundOne': 'assets/samples/kick.mp3',
			'soundTwo': 'assets/samples/percussion.mp3',
			'soundThree': 'assets/samples/kick.mp3',
			'soundFour': 'assets/samples/percussion.mp3',
			'soundFive': 'assets/samples/percussion2.mp3'
		};
		SampleBank.init(sampleSrcs);
	}
};

module.exports = App;