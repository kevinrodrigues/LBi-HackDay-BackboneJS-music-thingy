var dispatcher = require('dispatcher');

var TransportView = require('./view');

function init(options) {
	console.log('Transport init');
	new TransportView(options).render();
}

var Transport = {
	init: init
};

module.exports = Transport;