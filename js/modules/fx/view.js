/**
 * Created by kevrodri on 17/03/16.
 */
// Library dependencies
var Backbone = require('backbone'),
	$ = require('jquery');

// Application dependencies
var dispatcher = require('dispatcher');

// Inner dependencies
var _template = require('./fx.hbs');


/**
 * Exported Backbone View for the filter controls.
 * Fires dispatcher events when the controls are
 * clicked or changed.
 **/
var FilterFXView = Backbone.View.extend({
	events: {
		'input .slider-freq': 'onFreqChange',
		'change .slider-freq': 'onFreqChange',
		'input .slider-q': 'onQChange',
		'change .slider-q': 'onQChange',
		'change .slider-toggle': 'onToggle'
	},
	initialize: function() {
		this.listenTo(dispatcher, 'filterfx:setcheckbox', this.setCheckbox);
	},
	render: function() {
		var rawHTML = _template();
		this.$el.html(rawHTML);
		return this;
	},
	onFreqChange: function(e) {
		var newFreq = $(e.currentTarget).val();
		dispatcher.trigger('filterfx:setfreq', newFreq);
	},
	onQChange: function(e) {
		var newQ = $(e.currentTarget).val();
		dispatcher.trigger('filterfx:setq', newQ);
	},
	onToggle: function(e) {
		var isActive = $(e.currentTarget).prop('checked');
		dispatcher.trigger('filterfx:changeactive', isActive);
	},
	setCheckbox: function(isActive) {
		this.$el.find('.slider-toggle').prop('checked', isActive);
	}
});

module.exports = FilterFXView;