/**
 * Created by kevrodri on 17/03/16.
 */
var Backbone = require('backbone'),
	$ = require('jquery');

var dispatcher = require('dispatcher');

var _template = require('./transport.hbs');

var TransportView = Backbone.View.extend({
	events: {
		'click .transport-play': 'play'
	},
	render: function() {
		var rawHTML = _template();
		this.$el.html(rawHTML);
		return this;
	},
	play: function() {
		dispatcher.trigger('transport:requestplay');
	}
});

module.exports = TransportView;