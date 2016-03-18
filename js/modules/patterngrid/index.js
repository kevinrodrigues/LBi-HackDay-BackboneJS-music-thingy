var dispatcher = require('dispatcher'),
	scheduler = require('./scheduler'),
	PatternGridView = require('./view.patterngrid.js');

function init(options) {
    console.log('PatternGrid init');

    new PatternGridView(options).render();

    scheduler.setTempo(130);
    dispatcher.on('patterngrid:play', scheduler.playPattern);
    dispatcher.on('patterngrid:settempo', scheduler.setTempo);
}


/**
 * Exported module interface.
 **/
var PatternGrid = {
    init: init
}

module.exports = PatternGrid;