var Class = require('../bower_components/jsOOP/js/Class');
    //XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;



var Audio = new Class({
    context: null,
    scriptProcessor: null,
    source: null,
    analyser: null,
    buffer: null,
    bufferSize: null,
    soundDataArray: null,
    playingMusic: null,

    initialize: function(){

        this.setZeContext();
    },
    setZeContext: function(){
        try {
            if(typeof webkitAudioContext === 'function'){ // Webkit!
                this.context = new webkitAudioContext();
            } else { // or other browsers...
                this.context = new AudioContext();
            }
        }
        catch(e){
            // Woah hold on there, you don't have WebAudioAPI? Shame on you
            console.log('No Web Audio API man, time to rethink some things ')
        }

    },
    loadZeAudioFile: function(url){

        var request = new XMLHttpRequest();

        request.open("GET", url);

        request.responseType = "arraybuffer";


        request.addEventListener("error", function(e){
            console.log(e);
        }, false);

        request.addEventListener("progress", function(e){
        //    console.log(e);
        }, false);

        request.addEventListener("load", function(e){
            this.decodeZeData(request.response);

            this.playingMusic = true;

        }.bind(this), false);

        request.send()

    },
    decodeZeData: function(response){

        this.context.decodeAudioData(
            response,
            function(buffer){
                if(!buffer){
                    console.log('FAILURE! Ze data could not be decoded, go cry now.')
                    return;
                }

                this.scriptProcessor = this.context.createScriptProcessor(2048);
                this.scriptProcessor.buffer = buffer;
                this.scriptProcessor.connect(this.context.destination);

                this.analyser = this.context.createAnalyser();
                this.analyser.smoothingTimeConstant = 0.6;
                this.analyser.fftSize = 512;

                this.source = this.context.createBufferSource();
                this.source.buffer = buffer;

                this.source.connect(this.analyser);
                this.analyser.connect(this.scriptProcessor);
                this.source.connect(this.context.destination);


                this.scriptProcessor.onaudioprocess = function(e){
                    this.soundDataArray = new Uint8Array(this.analyser.frequencyBinCount);
                    this.analyser.getByteFrequencyData(this.soundDataArray);

                }.bind(this);



                this.source.start(0)

            }.bind(this),
            function(error){
                console.log(error);
            }
        )

    }

});

module.exports = Audio;
