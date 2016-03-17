/**
 * Created by kevrodri on 17/03/16.
 */
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