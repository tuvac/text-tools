/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * <%= pkg.title || pkg.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * \n' +
            ' * @author <%= pkg.author %> \n' +
            ' * @since <%= grunt.template.today(\"yyyy-mm-dd\") %>\n' +
            ' * @version v<%= pkg.version %>\n' +
            ' */\n',
        // Task configuration.
        jshint: {
            src: ['src/js/**/*.js']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true
                },
                src: ['test/**/*.js']
            }
        },
        clean: {
            development: {
                src: ['build']
            }
        },
        copy: {
        	development: {
        		files: [
        			{src: 'src/index.html', dest: 'build/index.html'}
        		]
        	}
        },
        uglify: {
            development: {
                src: 'build/js/main.js',
                dest: 'build/js/main.min.js'
            }
        },
        less: {
            development: {
                compress: true,
                yuicompress: true,
                optimization: 2,
                files: {
                    'build/css/styles.css': 'src/less/bootstrap.less'
                }
            }
        },
        browserify: {
            development: {
                files: {
                    'build/js/main.js': ['src/js/**/*.js', '!src/js/main.js']
                },
                options: {
                    require: ['string-utils'],
                }
            }
        },
        watch: {
            styles: {
                files: ['src/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['src/js/**/*.js'], // which files to watch
                tasks: ['clean','browserify', 'uglify', 'copy'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-git-release');
    // Default task.
    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'less', 'browserify', 'uglify']);

};