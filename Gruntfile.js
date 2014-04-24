module.exports = function(grunt) {

	var FS_PATH = require('path');

	var TEXTUREPACKER_PATH = "";

	function log(err, stdout, stderr, cb) {
	    console.log(stdout);
	    cb();
	}

	grunt.initConfig({
	    shell: {
		    beefy: {
		      command: ['beefy',
		      	'js/main.js:js/bundle.js',
                  '--live'].join(" ")
		    },
		},

		concurrent: {
			local: {
//				tasks: ['shell:mongo','shell:beefy'],
				tasks: ['shell:beefy'],
				options: { logConcurrentOutput: true }
			},
			dev: {
				tasks: ['shell:beefy'],
				options: { logConcurrentOutput: true }
			}
		}
	});
	grunt.loadNpmTasks('grunt-concurrent');
	//grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['concurrent:local']);
	grunt.registerTask('buildjs', 'browserify');
};
