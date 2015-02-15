module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig ({

		pkg: grunt.file.readJSON('package.json'),

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
	      				'dist/scripts/functions.min.js': 'assets/js/functions.js',
	      				'dist/scripts/event_reader.min.js': 'assets/js/event_reader.js'
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
    		},

    		jslint: {
    			server: {
    				src: ['Gruntfile.js', 'assets/js/*.js']
    			},
    			options: {
    				edition: 'latest',
    				log: 'tmp/logs/js-lint.log',
    				errorsOnly: true
    			}
    		},

    		//copy the files
    		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'assets/components/bootstrap/fonts/',
					src: '**',
					dest: 'dist/fonts/',
					flatten: true,
					filter: 'isFile',
				},
				{
					src: 'assets/components/jquery/dist/jquery.min.js',
					dest: 'dist/scripts/jquery.min.js',
				},
				{
					src: 'assets/components/jquery/dist/jquery.min.map',
					dest: 'dist/scripts/jquery.min.map',
				},
				{
					src: 'assets/components/bootstrap/dist/js/bootstrap.min.js',
					dest: 'dist/scripts/bootstrap.min.js',
				}],
				
			},
		},

	});

	// carregando plugins
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// registrando tarefas
	grunt.registerTask('default', ['watch'] );
};