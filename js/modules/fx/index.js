/**
 * Created by kevrodri on 17/03/16.
 */
var dispatcher = require('dispatcher'),
	AUDIO = require('audiocontext');

var FilterFXView = require('./view');

var filterNode,
	isActive = false;

function createFilterNode() {
	filterNode = AUDIO.createBiquadFilter();

	filterNode.type = 'lowpass';
	filterNode.frequency.value = 440;

	if (isActive) dispatcher.trigger('filterfx:nodeupdated', filterNode);
}

function setFrequency(value) {
	var minValue = 40;
	var maxValue = AUDIO.sampleRate / 2;
	var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
	var multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
	filterNode.frequency.value = maxValue * multiplier;
}

function setQ(value) {
	filterNode.Q.value = value * 30;
}

function toggleOrSetActive(newActiveState) {
	isActive = (newActiveState !== undefined) ? newActiveState : !isActive;
	dispatcher.trigger('filterfx:nodeupdated', isActive ? filterNode : null);
	dispatcher.trigger('filterfx:setcheckbox', isActive);
}

function init(options) {
	console.log('FilterFX init');
	dispatcher.on('filterfx:setfreq', setFrequency);
	dispatcher.on('filterfx:setq', setQ);
	dispatcher.on('filterfx:changeactive', toggleOrSetActive);
	createFilterNode();
	new FilterFXView(options).render();
}

var FilterFX = {
	init: init
}

module.exports = FilterFX;