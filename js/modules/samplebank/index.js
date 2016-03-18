// Application dependencies
var dispatcher = require('dispatcher'),
    AUDIO = require('audiocontext');

var bank = {},
    fxNode = null;

var loadCount = 0,
    totalCount = 0;

function loadSamples(srcObj) {
    for (var k in srcObj) {
        totalCount++;
    }
    for (var k in srcObj) {
        _loadSample(k, srcObj[k]);
    }
}

function _loadSample(key, url) {
    var req = new XMLHttpRequest();
    req.responseType = "arraybuffer";
    req.onload = function() {
        AUDIO.decodeAudioData(req.response, function(buffer) {
            bank[key] = buffer;
            if (++loadCount === totalCount) {
                dispatcher.trigger('samplebank:ready');
            }
        });
    }
    req.open('GET', url, true);
    req.send();
}


function playSample(id, when) {
    var s = AUDIO.createBufferSource();
    s.buffer = bank[id];
    if (fxNode) {
        s.connect(fxNode);
        fxNode.connect(AUDIO.destination);
    } else {
        s.connect(AUDIO.destination);
    }
    s.start(when || 0);
}

function setFxNode(node) {
    fxNode = node;
}

function init(srcObj) {
    console.log('SampleBank init');
    dispatcher.on('samplebank:playsample', playSample);
    dispatcher.on('samplebank:setfxnode', setFxNode);
    loadSamples(srcObj);
}

var SampleBank = {
    init: init
};

module.exports = SampleBank;