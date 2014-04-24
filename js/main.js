
var $ = require('jquery'),
    Class = require('../bower_components/jsOOP/js/baseClass'),
    Visualizer = require('./Visualizer'),
    Audio = require('./Audio');


var visualizer = new Visualizer();
var audio = new Audio();


$('document').ready(function(){


    document.body.appendChild( visualizer.renderer.domElement );

    audio.loadZeAudioFile('/audio/Ramp.mp3');


    console.log(visualizer.line[0]);


    function render() {
        requestAnimationFrame(render);

        visualizer.render();

        if( audio.playingMusic == true ){

            if(audio.soundDataArray.length != 0 && visualizer.line.length != 0){
                var k = 0;

                

                for(var i = 0; i < visualizer.line.length; i+=visualizer.step) {
                        
                    var line = visualizer.line[i];
                    var linePoints = line.geometry.vertices;

                

                    for(var j = 0; j < linePoints.length;j++){

                        var scale = audio.soundDataArray[k] / 100;

                       

                        line.geometry.vertices[j].y = (scale < 1 ? 1 : scale*5);

                        line.material.color = visualizer.createColor((scale < 1 ? 1 : scale) );

                        k += (k < audio.soundDataArray.length ? 1 : 0);

                    }

                    line.material.color = visualizer.createColor((scale < 1 ? 1 : scale) );
                           
                      
                   
                   
                }
            }


        }

    }
    render();

});
