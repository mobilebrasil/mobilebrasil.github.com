module.exports = function(grunt) {
	"use strict";

	pkg: grunt.file.readJSON('package.json'),

	// Project configuration.
	grunt.initConfig ({

		// Watch
		watch: {
			css: {
				files: [ 'assets/less/*.less' ],
				tasks: [ 'less' ]
			},
			js: {
				files: 'assets/js/*.js',
				tasks: ['uglify', 'jshint'] 
			}
		},

		//Lint, compile and concat 
		less: {
	    		development: {
		        		options: {
		            		compile: true,
		            		compress: true
		        		},
		        		files: {
		        			'dist/css/style.min.css': 'assets/less/main.less'
		       		}
		    	}
	    	},

    		uglify: {
	    		options: {
	      			mangle: false,
	      			compress: true
	    		},
	    		dist: {
	      			files: {
	      				'dist/scripts/functions.min.js': 'assets/js/functions.js'
	      			}
	    		}
    		},

    		jshint: {
    			options: {
    				globals: {
    					jQuery: true
    				}
    			},
    			files: {
    				src: ['Gruntfile.js', 'assets/js/*.js']
    			}
    		}
	});

	// carregando plugins
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');

	// registrando tarefas
	grunt.registerTask('default', ['watch'] );
}