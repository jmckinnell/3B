var Class = require('../bower_components/jsOOP/js/Class'),
THREE = require('three'),
EffectComposer = require('three-effectcomposer')(THREE);
require('./shaders/DotScreenShader');
require('./shaders/CopyShader');
require('./shaders/RGBShiftShader');


var Visualizer = new Class({

    scene: null,
    camera: null,
    composer: null,
    renderer: null,
    cube: null,
    line: null,
    size: 8,
    step: 1,
    line: null,


    initialize: function(){


        //console.log(THREE.DotScreenShader);

        this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -500, 1000 );
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize( window.innerWidth*2, window.innerHeight*2 );

        this.line = new Array();

        for(z=-this.size;z<this.size;z+=this.step){

            this.line[z+this.size] = new Array();

            var colourMath = ((z+8 + this.size)/(this.size + this.size))

            var color = new THREE.Color().setHSL(colourMath/3,1,0.5);
          

            this.line[z+this.size] = this.createLine(-200, 0, 0+(this.size*z), this.size, this.size*2 ,color);
            this.scene.add(this.line[z+this.size]);

                //console.log(z+this.size, x+this.size);

           
        }
        /*
        this.composer = new EffectComposer( this.renderer );
		this.composer.addPass( new EffectComposer.RenderPass( this.scene, this.camera ) );

		var effect = new EffectComposer.ShaderPass( THREE.DotScreenShader );
		effect.uniforms[ 'scale' ].value = 4;
		this.composer.addPass( effect );

		var effect = new EffectComposer.ShaderPass( THREE.RGBShiftShader );
		effect.uniforms[ 'amount' ].value = 0.0015;
		effect.renderToScreen = true;
		this.composer.addPass( effect );

        */

        this.camera.position.x = 200;
        this.camera.position.y = 150;
        this.camera.position.z = 200;
        this.camera.lookAt( this.scene.position );

    },
    render: function(){

        var timer = Date.now() * 0.0001;
        //this.camera.position.x = Math.cos( timer ) * 200;
		//this.camera.position.z = Math.sin( timer ) * 200;
		//this.camera.lookAt( this.scene.position );

        this.renderer.render(this.scene, this.camera)
    },
    createLine: function(x, y, z, length, size, color){
        var x = x || 0;
        var y = y || 0;
        var z = z || 0;
        var color = color || 0xffffff;
        var material = new THREE.LineBasicMaterial({
            color: color
        });

        var pos = -10*x;
        var geometry = new THREE.Geometry();

        var num = x;

        for(i=0;i<length;i++){
            geometry.vertices.push( new THREE.Vector3( x+(size*i), y, z ) );
        }
        
        var line = new THREE.Line( geometry, material );

        return line;
    },
    createColor: function(colourMath, currentHue){
        var currentHue = currentHue || 0.5;
        return new THREE.Color().setHSL(1-colourMath/5+currentHue,1,0.5);
    }

});

module.exports = Visualizer;
